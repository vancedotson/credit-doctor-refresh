import { useState, useEffect, useCallback } from 'react';
import { Input } from './input';
import { Button } from './button';

interface SvgCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

export const SvgCaptcha = ({ onVerify, className = '' }: SvgCaptchaProps) => {
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [captchaSvg, setCaptchaSvg] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [expectedAnswer, setExpectedAnswer] = useState<string>('');

  const loadCaptcha = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setUserInput('');
    setIsVerified(false);
    onVerify(false);

    try {
      const response = await fetch('/api/captcha/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setCaptchaSvg(result.svgData);
        // For serverless environment, we'll extract the answer from the console/logs
        // This is a limitation of the serverless architecture
        setExpectedAnswer(''); // We'll need to handle this differently for serverless
      } else {
        setError('Failed to load captcha. Please try again.');
      }
    } catch (err) {
      console.error('Error loading captcha:', err);
      setError('Failed to load captcha. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, onVerify]);

  // Load captcha on component mount
  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    setError('');
    
    // Auto-verify when user has entered 4 characters (the captcha length)
    if (value.length === 4) {
      handleVerify(value);
    }
  };

  const handleVerify = async (inputValue: string = userInput) => {
    if (!inputValue.trim()) {
      setError('Please enter the captcha text');
      return;
    }

    try {
      const response = await fetch('/api/captcha/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sessionId, 
          userInput: inputValue
        }),
      });
      
      const result = await response.json();
      
      if (result.success && result.verified) {
        setIsVerified(true);
        setError('');
        onVerify(true);
      } else {
        setError('Incorrect captcha. Please try again.');
        setIsVerified(false);
        onVerify(false);
        // Auto-reload new captcha after wrong answer
        setTimeout(() => {
          loadCaptcha();
        }, 1000);
      }
    } catch (err) {
      console.error('Error verifying captcha:', err);
      setError('Verification failed. Please try again.');
      setIsVerified(false);
      onVerify(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Security Verification:</span>
          <Button
            type="button"
            onClick={loadCaptcha}
            disabled={isLoading}
            className="text-xs px-2 py-1 h-auto"
            variant="outline"
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* SVG Captcha */}
          <div className="flex-shrink-0">
            {isLoading ? (
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border border-gray-400 border-t-transparent"></div>
              </div>
            ) : captchaSvg ? (
              <div 
                className="w-32 h-16 border rounded bg-white flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: captchaSvg }}
              />
            ) : (
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                Failed to load
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="flex-1">
            <Input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter the text above"
              className="text-center font-mono uppercase"
              maxLength={4}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      
      {isVerified && (
        <p className="text-green-600 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Verified! You're human.
        </p>
      )}
    </div>
  );
};

export default SvgCaptcha;
