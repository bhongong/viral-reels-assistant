const express = require('express');
const AIScriptGenerator = require('../services/AIScriptGenerator');
const VideoGenerator = require('../services/VideoGenerator');
const { PLATFORMS, VIDEO_MODELS } = require('../config/constants');

const router = express.Router();
const scriptGenerator = new AIScriptGenerator();
const videoGenerator = new VideoGenerator();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Get supported platforms
 */
router.get('/platforms', (req, res) => {
  res.json({
    platforms: Object.values(PLATFORMS)
  });
});

/**
 * Get supported video models
 */
router.get('/models', (req, res) => {
  res.json({
    models: Object.values(VIDEO_MODELS)
  });
});

/**
 * Analyze a video idea
 */
router.post('/analyze', async (req, res) => {
  try {
    const { idea, platform } = req.body;

    if (!idea || !platform) {
      return res.status(400).json({
        error: 'Missing required fields: idea and platform'
      });
    }

    if (!Object.values(PLATFORMS).includes(platform)) {
      return res.status(400).json({
        error: `Invalid platform. Supported platforms: ${Object.values(PLATFORMS).join(', ')}`
      });
    }

    const analysis = await scriptGenerator.analyzeIdea(idea, platform);
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze idea',
      message: error.message
    });
  }
});

/**
 * Generate complete video script
 */
router.post('/script/generate', async (req, res) => {
  try {
    const { idea, platform } = req.body;

    if (!idea || !platform) {
      return res.status(400).json({
        error: 'Missing required fields: idea and platform'
      });
    }

    if (!Object.values(PLATFORMS).includes(platform)) {
      return res.status(400).json({
        error: `Invalid platform. Supported platforms: ${Object.values(PLATFORMS).join(', ')}`
      });
    }

    const script = await scriptGenerator.generateCompleteScript(idea, platform);
    
    res.json({
      success: true,
      script: script.toJSON()
    });
  } catch (error) {
    console.error('Script generation error:', error);
    res.status(500).json({
      error: 'Failed to generate script',
      message: error.message
    });
  }
});

/**
 * Generate video from script
 */
router.post('/video/generate', async (req, res) => {
  try {
    const { script, model = VIDEO_MODELS.VEO3, options = {} } = req.body;

    if (!script || !script.scenes) {
      return res.status(400).json({
        error: 'Invalid script format'
      });
    }

    if (!Object.values(VIDEO_MODELS).includes(model)) {
      return res.status(400).json({
        error: `Invalid model. Supported models: ${Object.values(VIDEO_MODELS).join(', ')}`
      });
    }

    // Reconstruct script object
    const { VideoScript } = require('../models/VideoScript');
    const videoScript = new VideoScript(script);

    const result = await videoGenerator.generateAllScenes(videoScript, model, options);
    
    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({
      error: 'Failed to generate video',
      message: error.message
    });
  }
});

/**
 * Complete flow: idea to video
 */
router.post('/create', async (req, res) => {
  try {
    const { idea, platform, model = VIDEO_MODELS.VEO3, options = {} } = req.body;

    if (!idea || !platform) {
      return res.status(400).json({
        error: 'Missing required fields: idea and platform'
      });
    }

    // Generate script
    const script = await scriptGenerator.generateCompleteScript(idea, platform);
    
    // Generate videos for all scenes
    const videoResult = await videoGenerator.generateAllScenes(script, model, options);
    
    res.json({
      success: true,
      script: script.toJSON(),
      videos: videoResult
    });
  } catch (error) {
    console.error('Creation error:', error);
    res.status(500).json({
      error: 'Failed to create viral reel',
      message: error.message
    });
  }
});

/**
 * Check video generation status
 */
router.get('/video/status/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const { model = VIDEO_MODELS.VEO3 } = req.query;

    const status = await videoGenerator.checkStatus(jobId, model);
    
    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      error: 'Failed to check status',
      message: error.message
    });
  }
});

module.exports = router;
