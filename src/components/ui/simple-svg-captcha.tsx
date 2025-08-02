import { useState, useEffect, useCallback } from 'react';
import { Input } from './input';
import { Button } from './button';

interface SimpleSvgCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

// Simple client-side SVG captcha generator
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'; // Avoid confusing chars like 0, O, 1, I
  const captchaLength = 4;
  let captchaText = '';
  
  for (let i = 0; i < captchaLength; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Generate SVG with some visual noise
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  const bgColor = '#F8F9FA';
  
  const svg = `
    <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" fill="${bgColor}" stroke="#E9ECEF" stroke-width="1"/>
      ${[...Array(3)].map((_, i) => 
        `<line x1="${Math.random() * 120}" y1="${Math.random() * 40}" x2="${Math.random() * 120}" y2="${Math.random() * 40}" stroke="${colors[Math.floor(Math.random() * colors.length)]}" stroke-width="1" opacity="0.3"/>`
      ).join('')}
      ${captchaText.split('').map((char, i) => {
        const x = 15 + i * 22;
        const y = 25 + (Math.random() - 0.5) * 6;
        const rotation = (Math.random() - 0.5) * 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${color}" transform="rotate(${rotation} ${x} ${y})">${char}</text>`;
      }).join('')}
      ${[...Array(20)].map(() => 
        `<circle cx="${Math.random() * 120}" cy="${Math.random() * 40}" r="1" fill="${colors[Math.floor(Math.random() * colors.length)]}" opacity="0.4"/>`
      ).join('')}
    </svg>
  `;
  
  return {
    text: captchaText,
    svg: svg
  };
};

export const SimpleSvgCaptcha = ({ onVerify, className = '' }: SimpleSvgCaptchaProps) => {
  const [captcha, setCaptcha] = useState({ text: '', svg: '' });
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const loadCaptcha = useCallback(() => {
    setIsLoading(true);
    setError('');
    setUserInput('');
    setIsVerified(false);
    onVerify(false);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const newCaptcha = generateCaptcha();
      setCaptcha(newCaptcha);
      console.log('Generated captcha:', newCaptcha.text); // For debugging
      setIsLoading(false);
    }, 200);
  }, [onVerify]);

  // Load captcha on component mount
  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    setError('');
    
    // Auto-verify when user has entered the required length
    if (value.length === captcha.text.length) {
      handleVerify(value);
    }
  };

  const handleVerify = (inputValue: string = userInput) => {
    if (!inputValue.trim()) {
      setError('Please enter the captcha text');
      return;
    }

    const isValid = captcha.text === inputValue.toUpperCase().trim();
    
    if (isValid) {
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
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border border-gray-400 border-t-transparent"></div>
              </div>
            ) : captcha.svg ? (
              <div 
                className="w-32 h-12 border rounded bg-white flex items-center justify-center p-1"
                dangerouslySetInnerHTML={{ __html: captcha.svg }}
              />
            ) : (
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
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
              disabled={isLoading || isVerified}
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

export default SimpleSvgCaptcha;
