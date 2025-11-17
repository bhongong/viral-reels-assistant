require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  environment: process.env.NODE_ENV || 'development',
  
  // API Keys for video generation services
  veo3ApiKey: process.env.VEO3_API_KEY,
  grokApiKey: process.env.GROK_API_KEY,
  
  // Model endpoints (can be configured for local models)
  modelEndpoints: {
    wan2_1: process.env.WAN2_1_ENDPOINT || 'http://localhost:8001',
    wan2_2: process.env.WAN2_2_ENDPOINT || 'http://localhost:8002'
  }
};

module.exports = config;
