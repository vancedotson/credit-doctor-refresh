import { useEffect, useRef, useState } from 'react';
import { createChallenge, redeemChallenge } from '@/api/cap';

interface CapCaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cap-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'data-cap-api-endpoint'?: string;
        'data-cap-hidden-field-name'?: string;
      }, HTMLElement>;
    }
  }
}

export const CapCaptcha = ({ onVerify, onError, className = '' }: CapCaptchaProps) => {
  const widgetRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiEndpoint] = useState('/api/cap'); // We'll need to set up actual API endpoints

  useEffect(() => {
    // Load Cap.js script dynamically
    const loadCapScript = () => {
      if (document.querySelector('script[src*="@cap.js/widget"]')) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@cap.js/widget@0.1.25';
      script.onload = () => {
        console.log('Cap.js widget loaded successfully');
        setIsLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Cap.js widget');
        onError?.('Failed to load CAPTCHA widget');
      };
      document.head.appendChild(script);
    };

    loadCapScript();
  }, [onError]);

  useEffect(() => {
    if (!isLoaded || !widgetRef.current) return;

    const widget = widgetRef.current;

    const handleSolve = (e: any) => {
      console.log('Cap.js solve event:', e.detail);
      const token = e.detail.token;
      if (token) {
        console.log('CAPTCHA solved successfully, token:', token);
        onVerify(token);
      } else {
        console.error('No token received from Cap.js');
        onError?.('Invalid CAPTCHA token');
      }
    };

    // Listen for the solve event
    widget.addEventListener('solve', handleSolve);

    return () => {
      widget.removeEventListener('solve', handleSolve);
    };
  }, [isLoaded, onVerify, onError]);

  // For now, let's create a simple mock implementation since we need server endpoints
  const [isVerified, setIsVerified] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const handleMockVerification = async () => {
    if (isVerified || isWorking) return;
    
    setIsWorking(true);
    console.log('Starting mock CAPTCHA verification...');
    
    try {
      // Simulate the Cap.js proof-of-work process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock token
      const token = `cap_mock_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      console.log('Mock CAPTCHA completed, token:', token);
      
      setIsVerified(true);
      setIsWorking(false);
      onVerify(token);
    } catch (error) {
      console.error('Mock CAPTCHA error:', error);
      setIsWorking(false);
      onError?.('CAPTCHA verification failed');
    }
  };

  return (
    <div className={`captcha-container ${className}`}>
      {/* For now, show a mock interface until we set up proper server endpoints */}
      <div 
        className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={handleMockVerification}
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={isVerified}
            readOnly
            disabled={isWorking}
            className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed pointer-events-none"
          />
          {isWorking && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700 font-medium text-sm">
            {isVerified ? "Verified! ✓" : "I'm a human"}
          </span>
          {isWorking && (
            <span className="text-xs text-gray-500">Computing proof-of-work...</span>
          )}
        </div>
      </div>
      
      {/* Hidden Cap.js widget for future use when server endpoints are ready */}
      <div style={{ display: 'none' }}>
        <cap-widget
          ref={widgetRef}
          data-cap-api-endpoint={apiEndpoint}
          data-cap-hidden-field-name="cap-token"
        />
      </div>
    </div>
  );
};

export default CapCaptcha;
