# 🎬 Viral Reels Assistant - Demo Guide

## Quick Demo

### 1. Start the Server
```bash
npm start
```

### 2. Access the Web Interface
Open your browser and navigate to: `http://localhost:3000`

### 3. Try the API Endpoints

#### Check Health
```bash
curl http://localhost:3000/api/health
```

#### Get Supported Platforms
```bash
curl http://localhost:3000/api/platforms
```

#### Get Available Models
```bash
curl http://localhost:3000/api/models
```

#### Analyze a Video Idea
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Quick morning routine for productivity",
    "platform": "tiktok"
  }'
```

#### Generate Complete Script
```bash
curl -X POST http://localhost:3000/api/script/generate \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Quick morning routine for productivity",
    "platform": "tiktok"
  }'
```

## Web Interface Features

### Platform Selection
Choose from:
- 🎵 TikTok (60s max, 9:16 aspect ratio)
- 📸 Instagram Reels (30s recommended, 9:16)
- ▶️ YouTube Shorts (45s recommended, 9:16)
- 👍 Facebook Reels (30s recommended, 9:16)
- 💼 LinkedIn (90s recommended, 16:9)

### Video Generation Models
Select from:
- **VEO3** - Cloud-based high-quality generation
- **Grok** - X.AI powered generation
- **WAN 2.1** - Local model
- **WAN 2.2** - Local model (latest)

### Workflow

1. **Enter Your Idea**: Describe your video concept
2. **Select Platform**: Choose target social media platform
3. **Choose Model**: Select video generation model (optional)
4. **Generate**: Click "Generate Script & Video" or "Analyze Idea Only"

## Example Ideas to Try

### TikTok
- "How to make viral coffee art in 30 seconds"
- "3 life hacks that will change your morning"
- "Behind the scenes of my creative process"

### Instagram
- "Before and after transformation tutorial"
- "5-minute workout routine you can do anywhere"
- "Quick recipe for healthy snacks"

### YouTube Shorts
- "Explaining quantum physics in 45 seconds"
- "Day in the life of a software developer"
- "Top 3 tips for better productivity"

### LinkedIn
- "Career lessons I learned the hard way"
- "How I built my startup from scratch"
- "Industry trends you need to know in 2025"

## Output Format

The AI generates:
1. **Analysis** - Viral potential, target audience, suggestions
2. **Script Title** - Catchy, platform-optimized title
3. **Story** - Engaging narrative with hook, build-up, and CTA
4. **Scenes** - Detailed prompts for each scene including:
   - Visual description
   - Audio/music suggestions
   - Text overlays
   - Transitions
   - Duration

## Notes

- Requires OpenAI API key for script generation
- Video generation requires additional API keys (VEO3, Grok) or local model setup
- The platform provides detailed prompts ready for video generation
- All outputs are optimized for the selected platform's best practices
