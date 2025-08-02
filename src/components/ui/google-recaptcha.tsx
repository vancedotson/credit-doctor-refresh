import { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface GoogleRecaptchaProps {
  onVerify: (token: string | null) => void;
  className?: string;
}

export interface GoogleRecaptchaRef {
  reset: () => void;
}

const GoogleRecaptcha = forwardRef<GoogleRecaptchaRef, GoogleRecaptchaProps>(
  ({ onVerify, className = '' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      }
    }));

    const handleChange = (token: string | null) => {
      onVerify(token);
    };

    const handleExpired = () => {
      onVerify(null);
    };

    const handleError = () => {
      onVerify(null);
    };

    // Production reCAPTCHA site key from environment variables
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error('VITE_RECAPTCHA_SITE_KEY environment variable is not set');
      return (
        <div className={`flex justify-center ${className}`}>
          <div className="text-red-500 text-sm">
            reCAPTCHA configuration error. Please contact support.
          </div>
        </div>
      );
    }

    return (
      <div className={`flex justify-center ${className}`}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleChange}
          onExpired={handleExpired}
          onError={handleError}
          theme="light"
          size="normal"
        />
      </div>
    );
  }
);

GoogleRecaptcha.displayName = 'GoogleRecaptcha';

export default GoogleRecaptcha;
