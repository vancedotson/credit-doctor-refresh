const svgCaptcha = require('svg-captcha');

// Store captcha tokens temporarily (in production, use Redis or database)
// Note: In serverless functions, this will reset between invocations
// For production, use a persistent storage like Redis
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
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'Session ID required' });
    }

    // Generate SVG captcha
    const captcha = svgCaptcha.create({
      size: 4, // Number of characters
      ignoreChars: '0o1i', // Filter out confusing characters
      noise: 2, // Number of noise lines
      color: true, // Use colored text
      background: '#f0f0f0' // Background color
    });
    
    // Store the token with 5-minute expiration
    captchaStore.set(sessionId, {
      token: captcha.text.toLowerCase(),
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });
    
    console.log(`Generated SVG captcha for session ${sessionId}: ${captcha.text}`);
    
    res.json({
      success: true,
      svgData: captcha.data,
      sessionId: sessionId
    });
  } catch (error) {
    console.error('Error generating captcha:', error);
    res.status(500).json({ success: false, error: 'Failed to generate captcha' });
  }
}
