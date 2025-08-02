// Cap.js Standalone API integration
// Based on Cap.js Standalone documentation: https://capjs.js.org/guide/standalone/

export interface CapVerifyResponse {
  success: boolean;
  error?: string;
}

export interface CapVerifyRequest {
  token: string;
}

/**
 * Verify Cap.js CAPTCHA token with Cap Standalone server
 * @param token - The CAPTCHA token from the Cap widget
 * @returns Promise<CapVerifyResponse>
 */
export async function verifyCaptcha(token: string): Promise<CapVerifyResponse> {
  try {
    // Get configuration from environment variables
    const siteKey = import.meta.env.VITE_CAP_SITE_KEY || '27d391833c';
    const serverUrl = import.meta.env.VITE_CAP_SERVER_URL || 'http://localhost:3000';
    const secretKey = import.meta.env.VITE_CAP_SECRET_KEY || 'oiwsPwnSixUBIUY1HAgaxl919LMwjouO8MOeQE';

    // Construct the verification endpoint according to Cap.js Standalone docs
    const verifyUrl = `${serverUrl}/${siteKey}/siteverify`;

    console.log('Verifying Cap.js token:', { verifyUrl, tokenLength: token.length });

    // Make POST request to Cap Standalone server
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token
      })
    });

    if (!response.ok) {
      console.error('Cap.js verification request failed:', response.status, response.statusText);
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }

    const result = await response.json();
    console.log('Cap.js verification result:', result);

    return {
      success: result.success === true,
      error: result.success ? undefined : 'CAPTCHA verification failed'
    };

  } catch (error: any) {
    console.error('Cap.js verification error:', error);
    return {
      success: false,
      error: error.message || 'Network error during CAPTCHA verification'
    };
  }
}

/**
 * Client-side Cap.js verification API endpoint
 * This is called by the contact form to verify CAPTCHA tokens
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body: CapVerifyRequest = await request.json();
    
    if (!body.token) {
      return new Response(
        JSON.stringify({ success: false, error: 'CAPTCHA token is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await verifyCaptcha(body.token);

    return new Response(
      JSON.stringify(result),
      { 
        status: result.success ? 200 : 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Cap.js API endpoint error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export default {
  verifyCaptcha,
  POST
};
