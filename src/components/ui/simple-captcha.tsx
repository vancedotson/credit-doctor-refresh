import { useState, useEffect } from 'react';

interface SimpleCaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export const SimpleCaptcha = ({ onVerify, onError, className = '' }: SimpleCaptchaProps) => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Generate a simple math question
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer = 0;
    let questionText = '';
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
      case '-':
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        questionText = `${larger} - ${smaller}`;
        break;
      case '*':
        // Use smaller numbers for multiplication
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        questionText = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
    }
    
    setQuestion(questionText);
    setCorrectAnswer(answer);
    setUserAnswer('');
    setError('');
    
    console.log('Generated captcha question:', questionText, '= ?', 'Answer:', answer);
  };

  // Initialize with a question
  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = () => {
    const userNum = parseInt(userAnswer.trim());
    
    if (isNaN(userNum)) {
      setError('Please enter a valid number');
      onError?.('Please enter a valid number');
      return;
    }
    
    if (userNum === correctAnswer) {
      setIsVerified(true);
      setError('');
      const token = `simple_captcha_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      console.log('Captcha verified successfully! Token:', token);
      onVerify(token);
    } else {
      setError('Incorrect answer. Please try again.');
      onError?.('Incorrect answer. Please try again.');
      // Generate a new question after incorrect answer
      setTimeout(() => {
        generateQuestion();
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerified) {
      handleSubmit();
    }
  };

  const handleRefresh = () => {
    generateQuestion();
    setIsVerified(false);
  };

  if (isVerified) {
    return (
      <div className={`captcha-container ${className}`}>
        <div className="flex items-center space-x-3 p-4 border border-green-300 rounded-lg bg-green-50">
          <div className="relative">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="w-5 h-5 text-green-600 bg-white border-2 border-green-300 rounded focus:ring-green-500 pointer-events-none"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-green-700 font-medium text-sm">
              Verified! ✓ You're human
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`captcha-container ${className}`}>
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            Please solve this simple math problem:
          </span>
          <button
            onClick={handleRefresh}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
            type="button"
          >
            New question
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-lg font-mono bg-white px-3 py-2 border rounded">
            {question} = ?
          </span>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Answer"
            className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isVerified}
          />
          <button
            onClick={handleSubmit}
            disabled={isVerified || !userAnswer.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            type="button"
          >
            Verify
          </button>
        </div>
        
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          This helps us confirm you're a real person.
        </p>
      </div>
    </div>
  );
};

export default SimpleCaptcha;
