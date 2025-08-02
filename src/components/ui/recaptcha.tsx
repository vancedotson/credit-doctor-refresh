import { useRef, useEffect, useState } from 'react';

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Add global types for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      }) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

export const ReCaptcha = ({ onVerify, onError, className = '' }: ReCaptchaProps) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<number | null>(null);
  
  // Test site key - replace with your actual site key in production
  const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Google's test key

  useEffect(() => {
    // Load reCAPTCHA script
    const loadReCaptcha = () => {
      if (document.querySelector('script[src*="recaptcha"]')) {
        if (window.grecaptcha) {
          setIsLoaded(true);
        }
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onReCaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      
      // Set up global callback
      (window as any).onReCaptchaLoad = () => {
        console.log('reCAPTCHA loaded successfully');
        setIsLoaded(true);
      };

      script.onerror = () => {
        console.error('Failed to load reCAPTCHA');
        onError?.('Failed to load CAPTCHA service');
      };

      document.head.appendChild(script);
    };

    loadReCaptcha();
  }, [onError]);

  useEffect(() => {
    if (!isLoaded || !recaptchaRef.current || widgetId !== null) return;

    try {
      window.grecaptcha.ready(() => {
        if (!recaptchaRef.current) return;
        
        const id = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            console.log('reCAPTCHA verified successfully');
            onVerify(token);
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
            onError?.('CAPTCHA expired, please try again');
          },
          'error-callback': () => {
            console.log('reCAPTCHA error');
            onError?.('CAPTCHA error, please try again');
          }
        });
        
        setWidgetId(id);
      });
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
      onError?.('Failed to initialize CAPTCHA');
    }
  }, [isLoaded, onVerify, onError, siteKey, widgetId]);

  const resetCaptcha = () => {
    if (widgetId !== null) {
      window.grecaptcha.reset(widgetId);
    }
  };

  return (
    <div className={`recaptcha-container ${className}`}>
      <div className="flex flex-col space-y-2">
        <div ref={recaptchaRef} />
        {!isLoaded && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border border-gray-400 border-t-transparent"></div>
            <span>Loading CAPTCHA...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReCaptcha;
