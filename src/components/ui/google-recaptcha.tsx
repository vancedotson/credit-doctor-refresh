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

    // Production reCAPTCHA site key - using hardcoded production key
    const siteKey = '6LfJvJcrAAAAAF_o2BBHfpXXw7sW0An87CYBRIJr';
    
    // Debug logging
    console.log('reCAPTCHA siteKey (hardcoded production):', siteKey);
    console.log('Environment variable VITE_RECAPTCHA_SITE_KEY:', import.meta.env.VITE_RECAPTCHA_SITE_KEY);

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
