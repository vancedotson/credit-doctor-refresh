import { useState, useEffect, useCallback } from 'react';
import { Input } from './input';
import { Button } from './button';

interface SimpleCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

export const SimpleCaptcha = ({ onVerify, className = '' }: SimpleCaptchaProps) => {
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = useCallback(() => {
    // Generate simple math problems
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 20) + 10; // Ensure positive result
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }
    
    setCaptchaQuestion(`${num1} ${operation} ${num2} = ?`);
    setCaptchaAnswer(answer);
    setUserInput('');
    setError('');
    setIsVerified(false);
    onVerify(false);
  }, [onVerify]);

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    setError('');
    
    // Auto-verify when user enters a number
    if (value && !isNaN(Number(value))) {
      handleVerify(value);
    }
  };

  const handleVerify = (inputValue: string = userInput) => {
    const userAnswer = parseInt(inputValue);
    
    if (isNaN(userAnswer)) {
      setError('Please enter a valid number');
      return;
    }

    if (userAnswer === captchaAnswer) {
      setIsVerified(true);
      setError('');
      onVerify(true);
    } else {
      setError('Incorrect answer. Please try again.');
      setIsVerified(false);
      onVerify(false);
      // Auto-generate new captcha after wrong answer
      setTimeout(() => {
        generateCaptcha();
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
            onClick={generateCaptcha}
            className="text-xs px-2 py-1 h-auto"
            variant="outline"
          >
            New Question
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Math Question */}
          <div className="flex-shrink-0 bg-white border rounded px-4 py-2 font-mono text-lg font-bold text-center min-w-[120px]">
            {captchaQuestion}
          </div>

          {/* Input Field */}
          <div className="flex-1">
            <Input
              type="number"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter answer"
              className="text-center font-mono"
              disabled={isVerified}
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
          Correct! You're human.
        </p>
      )}
    </div>
  );
};

export default SimpleCaptcha;
