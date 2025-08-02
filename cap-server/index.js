const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const Cap = require('@cap.js/server');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Allow all localhost ports for development
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any localhost port in development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    // Allow specific origins in production
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// In-memory storage for development
// In production, you'd want to use Redis or a database
const challengesStore = new Map();
const tokensStore = new Map();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  
  // Clean expired challenges
  for (const [token, data] of challengesStore.entries()) {
    if (data.expires <= now) {
      challengesStore.delete(token);
    }
  }
  
  // Clean expired tokens
  for (const [token, expires] of tokensStore.entries()) {
    if (expires <= now) {
      tokensStore.delete(token);
    }
  }
}, 5 * 60 * 1000);

// Initialize Cap.js with storage
const cap = new Cap({
  storage: {
    challenges: {
      store: async (token, challengeData) => {
        challengesStore.set(token, {
          data: challengeData,
          expires: challengeData.expires
        });
      },
      read: async (token) => {
        const stored = challengesStore.get(token);
        if (!stored || stored.expires < Date.now()) {
          challengesStore.delete(token);
          return null;
        }
        return {
          challenge: stored.data,
          expires: stored.expires
        };
      },
      delete: async (token) => {
        challengesStore.delete(token);
      },
      listExpired: async () => {
        const expired = [];
        for (const [token, data] of challengesStore.entries()) {
          if (data.expires <= Date.now()) {
            expired.push(token);
          }
        }
        return expired;
      },
    },
    tokens: {
      store: async (tokenKey, expires) => {
        tokensStore.set(tokenKey, expires);
      },
      get: async (tokenKey) => {
        const expires = tokensStore.get(tokenKey);
        if (!expires || expires < Date.now()) {
          tokensStore.delete(tokenKey);
          return null;
        }
        return expires;
      },
      delete: async (tokenKey) => {
        tokensStore.delete(tokenKey);
      },
      listExpired: async () => {
        const expired = [];
        for (const [token, expires] of tokensStore.entries()) {
          if (expires <= Date.now()) {
            expired.push(token);
          }
        }
        return expired;
      },
    },
  },
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    challenges: challengesStore.size,
    tokens: tokensStore.size
  });
});

// Cap.js widget endpoints (following official documentation pattern)
app.post('/cap/challenge', async (req, res) => {
  try {
    console.log('Creating challenge...');
    const challenge = await cap.createChallenge();
    
    // Return the challenge directly as Cap.js widget expects
    res.json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({
      error: 'Failed to create challenge'
    });
  }
});

app.post('/cap/redeem', async (req, res) => {
  try {
    const { token, solutions } = req.body;
    
    if (!token || !solutions) {
      return res.status(400).json({
        error: 'Missing token or solutions'
      });
    }
    
    console.log('Redeeming challenge for token:', token);
    const result = await cap.redeemChallenge({ token, solutions });
    console.log('Redeem result:', result);
    
    // Return the result directly as Cap.js widget expects
    res.json(result);
  } catch (error) {
    console.error('Error redeeming challenge:', error);
    res.status(400).json({
      error: 'Failed to redeem challenge'
    });
  }
});

// Legacy endpoints for backward compatibility
app.post('/challenge', async (req, res) => {
  try {
    console.log('Creating challenge...');
    const challenge = await cap.createChallenge();
    
    res.json({
      success: true,
      data: challenge
    });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create challenge'
    });
  }
});

app.post('/redeem', async (req, res) => {
  try {
    const { token, solutions } = req.body;
    
    if (!token || !solutions) {
      return res.status(400).json({
        success: false,
        error: 'Missing token or solutions'
      });
    }
    
    console.log('Redeeming challenge for token:', token);
    const result = await cap.redeemChallenge({ token, solutions });
    console.log('Redeem result:', result);
    
    // The Cap.js library returns the verification token directly
    // We need to wrap it in the expected format for our client
    const verificationToken = typeof result === 'string' ? result : result.token || result;
    
    res.json({
      success: true,
      data: {
        token: verificationToken
      }
    });
  } catch (error) {
    console.error('Error redeeming challenge:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to redeem challenge'
    });
  }
});

// Verify token endpoint (reCAPTCHA compatible)
app.post('/siteverify', async (req, res) => {
  try {
    const { response: token, secret } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        'error-codes': ['missing-input-response']
      });
    }
    
    console.log('Verifying token:', token);
    const result = await cap.validateToken(token, { keepToken: false });
    
    res.json({
      success: true,
      challenge_ts: new Date().toISOString(),
      hostname: req.get('host')
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.json({
      success: false,
      'error-codes': ['invalid-input-response']
    });
  }
});

// Alternative verify endpoint
app.post('/verify', async (req, res) => {
  try {
    const { token, keepToken = false } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Missing token'
      });
    }
    
    console.log('Verifying token:', token);
    const result = await cap.validateToken(token, { keepToken });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).json({
      success: false,
      error: 'Invalid token'
    });
  }
});

// Serve widget assets (optional - for self-hosting the widget)
app.get('/widget.js', (req, res) => {
  res.redirect('https://cdn.jsdelivr.net/npm/@cap.js/widget@0.1.25/dist/widget.js');
});

// Stats endpoint (for monitoring)
app.get('/stats', (req, res) => {
  res.json({
    challenges: {
      active: challengesStore.size,
      total: challengesStore.size
    },
    tokens: {
      active: tokensStore.size,
      total: tokensStore.size
    },
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Cap.js CAPTCHA Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      challenge: 'POST /challenge',
      redeem: 'POST /redeem',
      verify: 'POST /verify',
      siteverify: 'POST /siteverify',
      health: 'GET /health',
      stats: 'GET /stats'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Cap.js server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Stats: http://localhost:${PORT}/stats`);
  console.log(`🔒 CAPTCHA protection enabled`);
});
