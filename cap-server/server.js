import Cap from '@cap.js/server';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins (adjust for production)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Create Cap.js server instance
const capServer = new Cap({
  secretKey: 'your-secret-key-here-make-it-long-and-secure-at-least-32-chars',
  // Optional: Configure difficulty and other settings
  difficulty: 20000, // Adjust based on your needs
  maxAttempts: 3,
  expireAfter: 300000 // 5 minutes
});

// Create challenge endpoint
app.post('/challenge', async (req, res) => {
  try {
    const challenge = await capServer.createChallenge();
    res.json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ error: 'Failed to create challenge' });
  }
});

// Verify solution endpoint
app.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    const result = await capServer.verifyToken(token);
    res.json({ success: result });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ success: false, error: 'Failed to verify token' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Cap.js Server'
  });
});

// Stats endpoint
app.get('/stats', (req, res) => {
  res.json({
    server: 'Cap.js',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.listen(port, () => {
  console.log(`🚀 Cap.js server running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`📈 Stats: http://localhost:${port}/stats`);
  console.log(`🔒 CAPTCHA protection enabled`);
});
