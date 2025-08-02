import React, { useEffect, useRef, useState, useCallback } from 'react';

// Extend JSX IntrinsicElements to include cap-widget
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cap-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-cap-api-endpoint'?: string;
        'data-cap-theme'?: string;
        'data-cap-worker-count'?: string;
        'data-cap-hidden-field-name'?: string;
        'data-cap-i18n-verifying-label'?: string;
        'data-cap-i18n-initial-state'?: string;
        'data-cap-i18n-solved-label'?: string;
        'data-cap-i18n-error-label'?: string;
        id?: string;
      };
    }
  }
}

interface CapCaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  siteKey?: string;
  serverUrl?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export const CapCaptcha: React.FC<CapCaptchaProps> = ({
  onVerify,
  onError,
  siteKey = import.meta.env.VITE_CAP_SITE_KEY || '27d391833c',
  serverUrl = import.meta.env.VITE_CAP_SERVER_URL || 'http://localhost:3000',
  theme = 'light',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const widgetRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const eventListenersAttached = useRef(false);
  const widgetId = useRef(`cap-widget-${Math.random().toString(36).substr(2, 9)}`);
  const isInitialized = useRef(false);
  const verificationTokenRef = useRef<string | null>(null);

  // Construct the API endpoint according to Cap.js Standalone docs
  const apiEndpoint = `${serverUrl}/${siteKey}/`;

  // Load Cap.js widget library
  useEffect(() => {
    const loadCapWidget = async () => {
      try {
        setIsLoading(true);
        setError('');

        // Check if Cap.js is already loaded globally
        if ((window as any).customElements && (window as any).customElements.get('cap-widget')) {
          console.log('Cap.js widget already available');
          setIsLoaded(true);
          setIsLoading(false);
          return;
        }

        // Check if script is already present
        const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@cap.js/widget"]');
        if (existingScript) {
          console.log('Cap.js script already exists, waiting for load...');
          
          const checkLoaded = () => {
            if ((window as any).customElements && (window as any).customElements.get('cap-widget')) {
              setIsLoaded(true);
              setIsLoading(false);
            } else {
              setTimeout(checkLoaded, 100);
            }
          };
          checkLoaded();
          return;
        }

        // Load official Cap.js widget library from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@cap.js/widget';
        script.async = true;
        
        script.onload = () => {
          console.log('Cap.js widget library loaded successfully');
          // Wait a bit for the custom element to be defined
          setTimeout(() => {
            setIsLoaded(true);
            setIsLoading(false);
          }, 100);
        };
        
        script.onerror = (err) => {
          console.error('Failed to load Cap.js widget library:', err);
          setError('Failed to load CAPTCHA library');
          onError?.('Failed to load CAPTCHA library');
          setIsLoading(false);
        };

        document.head.appendChild(script);
        scriptRef.current = script;

      } catch (err: any) {
        console.error('Error loading Cap.js:', err);
        setError(err.message || 'Failed to initialize CAPTCHA');
        onError?.(err.message || 'Failed to initialize CAPTCHA');
        setIsLoading(false);
      }
    };

    loadCapWidget();
  }, [onError]);

  // Initialize widget and set up event listeners
  useEffect(() => {
    if (!isLoaded || !containerRef.current || isInitialized.current || verificationTokenRef.current) return;

    const initializeWidget = () => {
      try {
        // Create the widget element
        const widget = document.createElement('cap-widget');
        widget.id = widgetId.current;
        widget.setAttribute('data-cap-api-endpoint', apiEndpoint);
        widget.setAttribute('data-cap-theme', theme);
        widget.setAttribute('data-cap-i18n-initial-state', "I'm a human");
        widget.setAttribute('data-cap-i18n-verifying-label', 'Verifying...');
        widget.setAttribute('data-cap-i18n-solved-label', 'Verified ✓');
        widget.setAttribute('data-cap-i18n-error-label', 'Error - Try again');

        // Clear container and add widget
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(widget);
          widgetRef.current = widget;
        }

        // Set up event listeners
        const handleSolve = (event: CustomEvent) => {
          console.log('Cap.js CAPTCHA solved:', event.detail);
          if (event.detail && event.detail.token) {
            console.log('Setting verification state - token:', event.detail.token);
            verificationTokenRef.current = event.detail.token;
            
            // Force state updates
            setIsVerified(true);
            setVerificationToken(event.detail.token);
            setError('');
            
            console.log('State updated - isVerified: true, token:', event.detail.token);
            onVerify(event.detail.token);
            
            // Prevent automatic reset by stopping event propagation
            event.stopPropagation();
            event.preventDefault();
          } else {
            const errorMsg = 'CAPTCHA verification failed - no token received';
            setError(errorMsg);
            onError?.(errorMsg);
          }
        };

        const handleError = (event: CustomEvent) => {
          console.error('Cap.js CAPTCHA error:', event.detail);
          const errorMsg = event.detail?.message || 'CAPTCHA error occurred';
          setError(errorMsg);
          setIsVerified(false);
          setVerificationToken(null);
          verificationTokenRef.current = null;
          onError?.(errorMsg);
        };

        const handleReset = (event: CustomEvent) => {
          console.log('Cap.js CAPTCHA reset event - checking verification status');
          // Always prevent reset if we have a verification token
          if (verificationTokenRef.current) {
            console.log('Blocking reset - already verified with token:', verificationTokenRef.current);
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          
          console.log('Allowing reset - not verified');
          // Only allow reset if we're not verified
          setError('');
          setIsVerified(false);
          setVerificationToken(null);
        };

        // Add event listeners
        widget.addEventListener('solve', handleSolve as EventListener);
        widget.addEventListener('error', handleError as EventListener);
        widget.addEventListener('reset', handleReset as EventListener);
        
        eventListenersAttached.current = true;
        isInitialized.current = true;

        console.log('Cap.js widget initialized with ID:', widgetId.current);

      } catch (err) {
        console.error('Error initializing Cap.js widget:', err);
        setError('Failed to initialize CAPTCHA widget');
        onError?.('Failed to initialize CAPTCHA widget');
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(initializeWidget, 50);

    return () => {
      if (widgetRef.current && eventListenersAttached.current) {
        try {
          widgetRef.current.removeEventListener('solve', () => {});
          widgetRef.current.removeEventListener('error', () => {});
          widgetRef.current.removeEventListener('reset', () => {});
        } catch (e) {
          console.warn('Error removing event listeners:', e);
        }
        eventListenersAttached.current = false;
      }
    };
  }, [isLoaded, apiEndpoint, theme, onVerify, onError]);

  const handleRetry = useCallback(() => {
    setError('');
    setIsVerified(false);
    setVerificationToken(null);
    isInitialized.current = false;
    
    // Reinitialize the widget
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  }, []);

  if (error) {
    return (
      <div className={`p-4 border border-red-300 rounded-md bg-red-50 ${className}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">CAPTCHA Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={handleRetry}
                className="bg-red-100 hover:bg-red-200 text-red-800 text-xs font-medium px-3 py-1 rounded-md transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center min-h-[120px] ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Loading CAPTCHA...</span>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`p-4 border border-gray-300 rounded-md bg-gray-50 ${className}`}>
        <p className="text-sm text-gray-600">Failed to load CAPTCHA</p>
        <button
          onClick={handleRetry}
          className="mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`cap-captcha-container ${className}`}>
      {/* Widget container - hide when verified */}
      <div 
        ref={containerRef} 
        className={`cap-widget-wrapper ${isVerified ? 'hidden' : ''}`}
      >
        {/* Widget will be inserted here */}
      </div>
      
      {/* Show persistent verification status */}
      {isVerified && verificationToken ? (
        <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center text-green-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Verified Successfully</span>
          </div>
        </div>
      ) : null}
      
      {/* Powered by Cap.js */}
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">
          Protected by <span className="font-semibold">Cap.js</span>
        </p>
      </div>
    </div>
  );
};

export default CapCaptcha;
