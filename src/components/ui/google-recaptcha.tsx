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

    // You need to get this key from https://www.google.com/recaptcha/admin
    // For development, you can use the test key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

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
