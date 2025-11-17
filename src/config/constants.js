// Platform constants
const PLATFORMS = {
  TIKTOK: 'tiktok',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin'
};

// Video generation models
const VIDEO_MODELS = {
  VEO3: 'veo3',
  GROK: 'grok',
  WAN2_1: 'wan2.1',
  WAN2_2: 'wan2.2'
};

// Platform-specific video specifications
const PLATFORM_SPECS = {
  [PLATFORMS.TIKTOK]: {
    maxDuration: 180, // 3 minutes
    aspectRatio: '9:16',
    recommendedDuration: 60,
    hooks: ['trending sounds', 'quick cuts', 'text overlays']
  },
  [PLATFORMS.INSTAGRAM]: {
    maxDuration: 90, // 90 seconds for reels
    aspectRatio: '9:16',
    recommendedDuration: 30,
    hooks: ['music integration', 'transitions', 'captions']
  },
  [PLATFORMS.YOUTUBE]: {
    maxDuration: 60, // for shorts
    aspectRatio: '9:16',
    recommendedDuration: 45,
    hooks: ['storytelling', 'thumbnails', 'end screens']
  },
  [PLATFORMS.FACEBOOK]: {
    maxDuration: 60,
    aspectRatio: '9:16',
    recommendedDuration: 30,
    hooks: ['engagement prompts', 'shareability', 'captions']
  },
  [PLATFORMS.LINKEDIN]: {
    maxDuration: 180,
    aspectRatio: '16:9',
    recommendedDuration: 90,
    hooks: ['professional tone', 'insights', 'value-driven']
  }
};

module.exports = {
  PLATFORMS,
  VIDEO_MODELS,
  PLATFORM_SPECS
};
