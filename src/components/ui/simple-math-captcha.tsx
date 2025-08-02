import { useState, useEffect } from 'react';
import { Input } from './input';

interface SimpleMathCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

export const SimpleMathCaptcha = ({ onVerify, className = '' }: SimpleMathCaptchaProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Generate new math problem
  const generateProblem = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer('');
    setIsVerified(false);
    setError('');
    onVerify(false);
  };

  // Generate initial problem
  useEffect(() => {
    generateProblem();
  }, []);

  // Check answer whenever user input changes
  useEffect(() => {
    if (userAnswer === '') {
      setIsVerified(false);
      setError('');
      onVerify(false);
      return;
    }

    const correctAnswer = num1 + num2;
    const userNum = parseInt(userAnswer);

    if (isNaN(userNum)) {
      setIsVerified(false);
      setError('Please enter a valid number');
      onVerify(false);
    } else if (userNum === correctAnswer) {
      setIsVerified(true);
      setError('');
      onVerify(true);
    } else {
      setIsVerified(false);
      setError('Incorrect answer, please try again');
      onVerify(false);
    }
  }, [userAnswer, num1, num2, onVerify]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold">Security Check:</span>
          <div className="flex items-center space-x-2 text-xl font-bold">
            <span>{num1}</span>
            <span>+</span>
            <span>{num2}</span>
            <span>=</span>
            <Input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-16 text-center"
              placeholder="?"
              maxLength={3}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={generateProblem}
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          New Problem
        </button>
      </div>
      
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

export default SimpleMathCaptcha;
