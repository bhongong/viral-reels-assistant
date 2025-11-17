const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./api/routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Viral Reels Assistant',
    version: '1.0.0',
    description: 'AI-powered platform for creating viral video scripts and content',
    endpoints: {
      health: '/api/health',
      platforms: '/api/platforms',
      models: '/api/models',
      analyze: 'POST /api/analyze',
      generateScript: 'POST /api/script/generate',
      generateVideo: 'POST /api/video/generate',
      create: 'POST /api/create',
      checkStatus: 'GET /api/video/status/:jobId'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✨ Viral Reels Assistant running on port ${PORT}`);
  console.log(`Environment: ${config.environment}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});

module.exports = app;
