# 🚀 Setup Guide - Viral Reels Assistant

## Prerequisites

- Node.js v14 or higher
- npm (comes with Node.js)
- OpenAI API key (required for AI script generation)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/bhongong/viral-reels-assistant.git
cd viral-reels-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
PORT=3000
NODE_ENV=development

# Required: OpenAI API Key for script generation
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Video generation API keys
VEO3_API_KEY=your-veo3-api-key
GROK_API_KEY=your-grok-api-key

# Optional: Local model endpoints
WAN2_1_ENDPOINT=http://localhost:8001
WAN2_2_ENDPOINT=http://localhost:8002
```

### 4. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

## Getting API Keys

### OpenAI API Key (Required)
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into `.env` file

### VEO3 API Key (Optional)
- Contact VEO3 team for access
- Add to `.env` as `VEO3_API_KEY`

### Grok API Key (Optional)
- Visit https://x.ai/
- Request API access
- Add to `.env` as `GROK_API_KEY`

### Local Models (WAN 2.1/2.2)
For running local models:
1. Set up WAN model server on your machine
2. Configure endpoints in `.env`
3. Ensure models are running and accessible

## Verification

After setup, verify the installation:

```bash
# Check health endpoint
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","timestamp":"..."}

# Check available platforms
curl http://localhost:3000/api/platforms

# Should return list of platforms
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
1. Change `PORT` in `.env` to another port (e.g., 3001)
2. Restart the server

### OpenAI API Errors
- Verify your API key is correct
- Check you have credits available
- Ensure the API key has proper permissions

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
The server is configured with CORS enabled for all origins in development.
For production, configure specific allowed origins.

## Production Deployment

### Environment Variables
Set `NODE_ENV=production` in your production environment

### Security Considerations
1. Never commit `.env` file to version control
2. Use secure secrets management (e.g., AWS Secrets Manager, Azure Key Vault)
3. Implement rate limiting for API endpoints
4. Add authentication and authorization as needed
5. Use HTTPS in production

### Recommended Hosting Platforms
- **Heroku**: Easy deployment with add-ons
- **AWS**: EC2, Elastic Beanstalk, or ECS
- **Google Cloud**: App Engine or Cloud Run
- **DigitalOcean**: App Platform or Droplets
- **Vercel/Netlify**: For static frontend with API routes

## Next Steps

1. Read the [README.md](README.md) for detailed documentation
2. Check [DEMO.md](DEMO.md) for usage examples
3. Test the API endpoints
4. Explore the web interface at `http://localhost:3000`

## Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with detailed information
- Include error messages and steps to reproduce
