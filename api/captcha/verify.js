// Import the same captcha store reference as generate.js
const svgCaptcha = require('svg-captcha');

// Same captcha store reference - note this will only work within the same process/container
// In production, use Redis or a database for persistent storage
const captchaStore = new Map();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { sessionId, userInput } = req.body;
    
    if (!sessionId || !userInput) {
      return res.status(400).json({ 
        success: false, 
        error: 'Session ID and user input required' 
      });
    }

    // Try to get stored captcha (won't work in true serverless, but might work in containers)
    const storedCaptcha = captchaStore.get(sessionId);
    
    if (!storedCaptcha) {
      return res.status(400).json({ 
        success: false, 
        error: 'Session expired or invalid' 
      });
    }

    // Check if captcha has expired
    if (storedCaptcha.expires < Date.now()) {
      captchaStore.delete(sessionId);
      return res.status(400).json({ 
        success: false, 
        error: 'Captcha has expired' 
      });
    }

    const isValid = storedCaptcha.token === userInput.toLowerCase().trim();
    
    // Clear the captcha after verification attempt (successful or not)
    captchaStore.delete(sessionId);
    
    console.log(`Captcha verification for session ${sessionId}: ${isValid} (expected: ${storedCaptcha.token}, got: ${userInput.toLowerCase().trim()})`);
    
    res.json({ 
      success: true, 
      verified: isValid 
    });
  } catch (error) {
    console.error('Error verifying captcha:', error);
    res.status(500).json({ success: false, error: 'Failed to verify captcha' });
  }
}
