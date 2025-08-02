const captcha = require('trek-captcha');

// Store captcha tokens temporarily (in production, use Redis or database)
const captchaStore = new Map<string, { token: string, expires: number }>();

// Clean up expired captchas every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, data] of captchaStore.entries()) {
    if (now > data.expires) {
      captchaStore.delete(sessionId);
    }
  }
}, 5 * 60 * 1000);

export async function generateCaptcha(sessionId: string): Promise<{ imageBase64: string, success: boolean }> {
  try {
    const { token, buffer } = await captcha({ size: 4, style: -1 });
    
    // Store the token with 5-minute expiration
    captchaStore.set(sessionId, {
      token: token.toLowerCase(),
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Convert buffer to base64 for frontend display
    const imageBase64 = `data:image/gif;base64,${buffer.toString('base64')}`;
    
    console.log(`Generated captcha for session ${sessionId}: ${token}`);
    
    return {
      imageBase64,
      success: true
    };
  } catch (error) {
    console.error('Error generating captcha:', error);
    return {
      imageBase64: '',
      success: false
    };
  }
}

export function verifyCaptcha(sessionId: string, userInput: string): boolean {
  const stored = captchaStore.get(sessionId);
  
  if (!stored) {
    console.log(`No captcha found for session ${sessionId}`);
    return false;
  }
  
  if (Date.now() > stored.expires) {
    captchaStore.delete(sessionId);
    console.log(`Captcha expired for session ${sessionId}`);
    return false;
  }
  
  const isValid = stored.token === userInput.toLowerCase().trim();
  console.log(`Captcha verification for session ${sessionId}: ${isValid} (expected: ${stored.token}, got: ${userInput.toLowerCase().trim()})`);
  
  if (isValid) {
    // Remove the captcha after successful verification
    captchaStore.delete(sessionId);
  }
  
  return isValid;
}
