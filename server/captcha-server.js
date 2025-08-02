const express = require('express');
const cors = require('cors');
const captcha = require('trek-captcha');

const app = express();
const port = 3001;

// Store captcha tokens temporarily (in production, use Redis or database)
const captchaStore = new Map();

// Clean up expired captchas every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, data] of captchaStore.entries()) {
    if (now > data.expires) {
      captchaStore.delete(sessionId);
    }
  }
}, 5 * 60 * 1000);

app.use(cors());
app.use(express.json());

// Generate captcha endpoint
app.post('/api/captcha/generate', async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'Session ID required' });
    }

    const { token, buffer } = await captcha({ size: 4, style: -1 });
    
    // Store the token with 5-minute expiration
    captchaStore.set(sessionId, {
      token: token.toLowerCase(),
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Convert buffer to base64 for frontend display
    const imageBase64 = `data:image/gif;base64,${buffer.toString('base64')}`;
    
    console.log(`Generated captcha for session ${sessionId}: ${token}`);
    
    res.json({
      success: true,
      imageBase64
    });
  } catch (error) {
    console.error('Error generating captcha:', error);
    res.status(500).json({ success: false, error: 'Failed to generate captcha' });
  }
});

// Verify captcha endpoint
app.post('/api/captcha/verify', (req, res) => {
  try {
    const { sessionId, userInput } = req.body;
    
    if (!sessionId || !userInput) {
      return res.status(400).json({ success: false, error: 'Session ID and user input required' });
    }

    const stored = captchaStore.get(sessionId);
    
    if (!stored) {
      console.log(`No captcha found for session ${sessionId}`);
      return res.json({ success: false, error: 'Captcha not found or expired' });
    }
    
    if (Date.now() > stored.expires) {
      captchaStore.delete(sessionId);
      console.log(`Captcha expired for session ${sessionId}`);
      return res.json({ success: false, error: 'Captcha expired' });
    }
    
    const isValid = stored.token === userInput.toLowerCase().trim();
    console.log(`Captcha verification for session ${sessionId}: ${isValid} (expected: ${stored.token}, got: ${userInput.toLowerCase().trim()})`);
    
    if (isValid) {
      // Remove the captcha after successful verification
      captchaStore.delete(sessionId);
      res.json({ success: true, verified: true });
    } else {
      res.json({ success: true, verified: false });
    }
  } catch (error) {
    console.error('Error verifying captcha:', error);
    res.status(500).json({ success: false, error: 'Failed to verify captcha' });
  }
});

app.listen(port, () => {
  console.log(`Captcha server running at http://localhost:${port}`);
});
