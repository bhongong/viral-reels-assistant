# 🏗️ Architecture Overview - Viral Reels Assistant

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (UI)                         │
│                     public/index.html                        │
│         Interactive web interface for content creators       │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP/REST API
┌────────────────▼────────────────────────────────────────────┐
│                    Express.js Server                         │
│                      src/server.js                           │
│                  Port: 3000 (configurable)                   │
└────────────────┬────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐   ┌───▼────┐   ┌──▼─────┐
│ API   │   │Config  │   │Models  │
│Routes │   │        │   │        │
└───┬───┘   └────────┘   └────────┘
    │
    ├─────────────────┬─────────────────┐
    │                 │                 │
┌───▼──────────┐ ┌───▼──────────┐ ┌───▼──────────┐
│AIScript      │ │Video         │ │OpenAI        │
│Generator     │ │Generator     │ │API           │
└──────────────┘ └──────┬───────┘ └──────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
   │  VEO3   │    │  Grok   │    │WAN 2.1/2│
   │  API    │    │  API    │    │ Local   │
   └─────────┘    └─────────┘    └─────────┘
```

## Components

### 1. Frontend Layer
**File:** `public/index.html`

- Single-page application with vanilla JavaScript
- Responsive design with gradient UI
- Platform selector (TikTok, Instagram, YouTube, Facebook, LinkedIn)
- Model selector (VEO3, Grok, WAN 2.1/2.2)
- Real-time form validation
- Loading states and error handling
- Results display with formatted output

### 2. API Layer
**File:** `src/api/routes.js`

Provides RESTful endpoints:
- `GET /api/health` - Health check
- `GET /api/platforms` - List platforms
- `GET /api/models` - List models
- `POST /api/analyze` - Analyze ideas
- `POST /api/script/generate` - Generate scripts
- `POST /api/video/generate` - Generate videos
- `POST /api/create` - End-to-end generation
- `GET /api/video/status/:jobId` - Check status

### 3. Service Layer

#### AIScriptGenerator (`src/services/AIScriptGenerator.js`)
Handles AI-powered script generation using OpenAI GPT-4:

**Methods:**
- `analyzeIdea(idea, platform)` - Analyzes viral potential
- `craftStory(idea, platform, analysis)` - Creates narrative
- `generateScenePrompts(story, platform, numberOfScenes)` - Generates scene details
- `generateCompleteScript(idea, platform)` - Full workflow

**Process Flow:**
1. Analyze idea → viral score, audience, suggestions
2. Craft story → hook, narrative, CTA
3. Generate scenes → visual/audio prompts, overlays, transitions

#### VideoGenerator (`src/services/VideoGenerator.js`)
Manages video generation across multiple models:

**Methods:**
- `generateVideo(scene, model, options)` - Main generation method
- `generateWithVEO3(scene, options)` - VEO3 integration
- `generateWithGrok(scene, options)` - Grok integration
- `generateWithWAN(scene, version, options)` - Local models
- `generateAllScenes(videoScript, model, options)` - Batch generation
- `checkStatus(jobId, model)` - Status polling

### 4. Model Layer
**File:** `src/models/VideoScript.js`

#### VideoScript Class
```javascript
{
  id: string,
  title: string,
  platform: string,
  idea: string,
  story: string,
  scenes: Scene[],
  metadata: object,
  createdAt: string
}
```

#### Scene Class
```javascript
{
  id: string,
  sceneNumber: number,
  description: string,
  duration: number,
  visualPrompt: string,
  audioPrompt: string,
  textOverlay: string,
  transition: string
}
```

### 5. Configuration Layer
**Files:** `src/config/index.js`, `src/config/constants.js`

#### Constants
- Platform specifications (duration, aspect ratio, hooks)
- Video model definitions
- Platform-specific optimization rules

#### Configuration
- Environment variables
- API keys management
- Model endpoints
- Server settings

## Data Flow

### Complete Workflow (Idea → Video)

```
1. User Input
   ├─ Video Idea (text)
   ├─ Platform Selection (tiktok/instagram/youtube/facebook/linkedin)
   └─ Model Selection (veo3/grok/wan2.1/wan2.2)

2. Idea Analysis (GPT-4)
   ├─ Viral Potential Score (1-10)
   ├─ Target Audience Identification
   ├─ Improvement Suggestions
   └─ Trending Topics Alignment

3. Story Crafting (GPT-4)
   ├─ Title Generation
   ├─ Hook Creation (first 3 seconds)
   ├─ Narrative Arc Development
   └─ Call-to-Action Formulation

4. Scene Generation (GPT-4)
   ├─ Scene Breakdown (5+ scenes)
   ├─ Visual Prompts (detailed for AI)
   ├─ Audio/Music Descriptions
   ├─ Text Overlay Suggestions
   └─ Transition Specifications

5. Video Generation (Selected Model)
   ├─ VEO3: Cloud API calls
   ├─ Grok: X.AI API integration
   └─ WAN: Local model inference

6. Output Delivery
   ├─ Script JSON with all details
   ├─ Video URLs/paths
   └─ Generation status
```

## Platform Specifications

### TikTok
- **Duration:** 60s recommended (max 180s)
- **Aspect Ratio:** 9:16 (vertical)
- **Key Elements:** Trending sounds, quick cuts, text overlays
- **Hook Strategy:** First 3 seconds crucial

### Instagram Reels
- **Duration:** 30s recommended (max 90s)
- **Aspect Ratio:** 9:16 (vertical)
- **Key Elements:** Music integration, transitions, captions
- **Hook Strategy:** Visual appeal, aesthetic consistency

### YouTube Shorts
- **Duration:** 45s recommended (max 60s)
- **Aspect Ratio:** 9:16 (vertical)
- **Key Elements:** Storytelling, thumbnails, end screens
- **Hook Strategy:** Value proposition upfront

### Facebook Reels
- **Duration:** 30s recommended (max 60s)
- **Aspect Ratio:** 9:16 (vertical)
- **Key Elements:** Engagement prompts, shareability, captions
- **Hook Strategy:** Emotional connection

### LinkedIn
- **Duration:** 90s recommended (max 180s)
- **Aspect Ratio:** 16:9 (horizontal)
- **Key Elements:** Professional tone, insights, value-driven
- **Hook Strategy:** Industry relevance, expertise

## Video Generation Models

### VEO3 (Cloud-based)
- High-quality output
- Fast processing
- Requires API key
- Best for: Production content

### Grok (X.AI)
- AI-powered generation
- Good quality
- Requires API key
- Best for: Social media optimized content

### WAN 2.1 (Local)
- On-premise processing
- Good quality
- No API costs
- Best for: Privacy-conscious users

### WAN 2.2 (Local - Latest)
- Enhanced quality
- On-premise processing
- No API costs
- Best for: Latest features, privacy

## Security Considerations

1. **API Keys:** Stored in environment variables, never committed
2. **Input Validation:** All user inputs validated before processing
3. **Rate Limiting:** Recommended for production deployments
4. **CORS:** Configured for development, needs restriction in production
5. **Error Handling:** Graceful failures without exposing internals

## Scalability

### Horizontal Scaling
- Stateless API design
- Multiple server instances possible
- Load balancer recommended

### Vertical Scaling
- CPU intensive: AI model inference
- Memory: Concurrent request handling
- Network: API calls to external services

### Caching Strategy
- Script results can be cached
- Platform specs are static
- Video URLs can be cached with TTL

## Performance Optimization

1. **Async Processing:** All AI calls are asynchronous
2. **Batch Operations:** Multiple scenes processed efficiently
3. **Error Recovery:** Graceful degradation on failures
4. **Timeout Management:** Appropriate timeouts for long operations

## Extension Points

### Adding New Platforms
1. Add platform to `PLATFORMS` constant
2. Define specifications in `PLATFORM_SPECS`
3. Update frontend platform selector

### Adding New Models
1. Add model to `VIDEO_MODELS` constant
2. Implement generation method in `VideoGenerator`
3. Add configuration for API keys/endpoints

### Custom Workflows
- Override `generateCompleteScript` for custom flows
- Add middleware for preprocessing
- Implement webhooks for async notifications

## Technology Stack

- **Backend:** Node.js, Express.js
- **AI:** OpenAI GPT-4
- **Video Generation:** VEO3, Grok, WAN models
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Configuration:** dotenv
- **HTTP Client:** Axios

## Future Enhancements

- User authentication and profiles
- Script history and favorites
- Video editing capabilities
- Analytics and performance tracking
- Collaboration features
- A/B testing for scripts
- Template library
- Multi-language support
