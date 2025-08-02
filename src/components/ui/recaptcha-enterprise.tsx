import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';

interface RecaptchaEnterpriseProps {
  onVerify: (token: string | null) => void;
  className?: string;
}

export interface RecaptchaEnterpriseRef {
  execute: () => Promise<void>;
  reset: () => void;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: string | HTMLElement, options: any) => number;
      reset: (widgetId?: number) => void;
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const RecaptchaEnterprise = forwardRef<RecaptchaEnterpriseRef, RecaptchaEnterpriseProps>(
  ({ onVerify, className = '' }, ref) => {
    const siteKey = '6LeKZJcrAAAAAF-XntvV3GwTnOe81lgmHS2pfbgY';

    useImperativeHandle(ref, () => ({
      execute: async () => {
        try {
          if (window.grecaptcha?.enterprise) {
            window.grecaptcha.enterprise.ready(async () => {
              try {
                const token = await window.grecaptcha.enterprise.execute(siteKey, {
                  action: 'submit'
                });
                console.log('reCAPTCHA Enterprise token received:', token);
                onVerify(token);
              } catch (error) {
                console.error('reCAPTCHA Enterprise execution error:', error);
                onVerify(null);
              }
            });
          } else {
            console.error('reCAPTCHA Enterprise not loaded');
            onVerify(null);
          }
        } catch (error) {
          console.error('reCAPTCHA Enterprise error:', error);
          onVerify(null);
        }
      },
      reset: () => {
        // Reset verification state
        onVerify(null);
      }
    }));

    useEffect(() => {
      // Auto-execute on mount to get initial token
      if (window.grecaptcha?.enterprise) {
        window.grecaptcha.enterprise.ready(async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(siteKey, {
              action: 'load'
            });
            console.log('reCAPTCHA Enterprise initial token:', token);
            onVerify(token);
          } catch (error) {
            console.error('reCAPTCHA Enterprise initial load error:', error);
            onVerify(null);
          }
        });
      }
    }, [onVerify, siteKey]);

    return (
      <div className={`${className}`}>
        <div className="text-sm text-gray-600 text-center">
          Protected by reCAPTCHA Enterprise
        </div>
      </div>
    );
  }
);

RecaptchaEnterprise.displayName = 'RecaptchaEnterprise';

export default RecaptchaEnterprise;
