# Cap.js CAPTCHA Server

A production-ready Cap.js CAPTCHA server built with Express.js and designed for Railway deployment.

## Features

- 🛡️ **Cap.js Integration**: Full implementation of Cap.js proof-of-work CAPTCHA
- 🚀 **Railway Ready**: Optimized for Railway deployment with Dockerfile
- 🔒 **Security**: Helmet, CORS, and rate limiting built-in
- 📊 **Monitoring**: Health checks and stats endpoints
- 🔄 **reCAPTCHA Compatible**: Drop-in replacement for reCAPTCHA
- 💾 **Storage**: In-memory storage with automatic cleanup

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Server info and available endpoints |
| `/health` | GET | Health check for monitoring |
| `/stats` | GET | Server statistics |
| `/challenge` | POST | Create new CAPTCHA challenge |
| `/redeem` | POST | Redeem challenge solutions |
| `/verify` | POST | Verify CAPTCHA tokens |
| `/siteverify` | POST | reCAPTCHA-compatible verification |

## Local Development

1. **Install dependencies:**
   ```bash
   cd cap-server
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Test the server:**
   ```bash
   curl http://localhost:3000/health
   ```

## Railway Deployment

### 1. Push to GitHub
Make sure your code is committed and pushed to GitHub.

### 2. Connect Railway
1. Go to [Railway](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect the Dockerfile

### 3. Configure Environment
Set these environment variables in Railway:

```bash
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-domain.com
PORT=3000
```

### 4. Deploy
Railway will automatically build and deploy your container.

### 5. Get Your URL
Railway will provide a public URL like: `https://your-project.railway.app`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins | `http://localhost:5173,http://localhost:3000` |

## Frontend Integration

Update your frontend to use the deployed server:

```javascript
// In your React component
const apiEndpoint = 'https://your-project.railway.app';

// Configure the Cap widget
<cap-widget data-cap-api-endpoint={apiEndpoint}></cap-widget>
```

## Monitoring

- **Health Check**: `GET /health`
- **Stats**: `GET /stats`
- **Logs**: Available in Railway dashboard

## Production Notes

- Uses in-memory storage (suitable for small-medium traffic)
- For high traffic, consider Redis/database storage
- Automatic cleanup of expired challenges/tokens
- Security headers and CORS protection enabled

## Troubleshooting

### Common Issues

1. **CORS Errors**: Add your frontend domain to `ALLOWED_ORIGINS`
2. **Connection Refused**: Check if the server is running and port is correct
3. **Widget Not Loading**: Verify the API endpoint URL is correct

### Debug Mode

To enable debug logging:
```bash
NODE_ENV=development npm start
```

### Test Endpoints

```bash
# Health check
curl https://your-project.railway.app/health

# Create challenge
curl -X POST https://your-project.railway.app/challenge

# Check stats
curl https://your-project.railway.app/stats
```

## Support

- [Cap.js Documentation](https://capjs.js.org/)
- [Railway Documentation](https://docs.railway.app/)
- [Express.js Documentation](https://expressjs.com/)
