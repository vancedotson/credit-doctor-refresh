import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Input } from './input';
import { Label } from './label';

interface SimpleMathCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

export interface SimpleMathCaptchaRef {
  reset: () => void;
  isVerified: () => boolean;
}

const SimpleMathCaptcha = forwardRef<SimpleMathCaptchaRef, SimpleMathCaptchaProps>(
  ({ onVerify, className = '' }, ref) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [showError, setShowError] = useState(false);

    const generateNumbers = () => {
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 10) + 1;
      setNum1(n1);
      setNum2(n2);
      setUserAnswer('');
      setIsVerified(false);
      setShowError(false);
      onVerify(false);
    };

    useEffect(() => {
      generateNumbers();
    }, []);

    useImperativeHandle(ref, () => ({
      reset: () => {
        generateNumbers();
      },
      isVerified: () => isVerified
    }));

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const answer = e.target.value;
      setUserAnswer(answer);
      setShowError(false);

      const correctAnswer = num1 + num2;
      if (answer && parseInt(answer) === correctAnswer) {
        setIsVerified(true);
        onVerify(true);
        console.log('Math captcha verified successfully');
      } else {
        setIsVerified(false);
        onVerify(false);
        if (answer && parseInt(answer) !== correctAnswer) {
          setShowError(true);
        }
      }
    };

    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border">
          <div className="text-center">
            <Label htmlFor="captcha-answer" className="text-sm font-medium text-gray-700 mb-2 block">
              Security Check: Solve this simple math problem
            </Label>
            <div className="flex items-center justify-center space-x-3 mb-3">
              <span className="text-2xl font-bold text-blue-600">{num1}</span>
              <span className="text-2xl font-bold text-gray-500">+</span>
              <span className="text-2xl font-bold text-blue-600">{num2}</span>
              <span className="text-2xl font-bold text-gray-500">=</span>
              <Input
                id="captcha-answer"
                type="number"
                value={userAnswer}
                onChange={handleAnswerChange}
                placeholder="?"
                className="w-16 text-center text-xl font-bold"
                maxLength={2}
              />
            </div>
            {showError && (
              <p className="text-red-500 text-sm">Incorrect answer. Please try again.</p>
            )}
            {isVerified && (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Verified!</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={generateNumbers}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Get a new problem
          </button>
        </div>
      </div>
    );
  }
);

SimpleMathCaptcha.displayName = 'SimpleMathCaptcha';

export default SimpleMathCaptcha;
