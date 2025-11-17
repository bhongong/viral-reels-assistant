# 🎬 Viral Reels Assistant

An AI-powered SaaS platform for content creators to generate viral video scripts and content for multiple social media platforms.

## ✨ Features

- **AI-Powered Script Generation**: Transform ideas into engaging video scripts using GPT-4
- **Multi-Platform Support**: Optimized for TikTok, Instagram Reels, YouTube Shorts, Facebook Reels, and LinkedIn
- **Idea Analysis**: Get detailed feedback on viral potential and target audience
- **Scene-by-Scene Breakdown**: Detailed prompts for each scene with visual and audio descriptions
- **Multiple Video Generation Models**: Support for VEO3, Grok, and local models (WAN 2.1/2.2)
- **Platform-Specific Optimization**: Each platform has tailored recommendations for duration, aspect ratio, and hooks

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- OpenAI API key (required for script generation)
- Optional: API keys for video generation models (VEO3, Grok) or local model setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bhongong/viral-reels-assistant.git
cd viral-reels-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your API keys
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## 📋 API Endpoints

### Health Check
```
GET /api/health
```

### Get Supported Platforms
```
GET /api/platforms
```

### Get Supported Models
```
GET /api/models
```

### Analyze Video Idea
```
POST /api/analyze
Content-Type: application/json

{
  "idea": "Your video idea",
  "platform": "tiktok"
}
```

### Generate Complete Script
```
POST /api/script/generate
Content-Type: application/json

{
  "idea": "Your video idea",
  "platform": "instagram"
}
```

### Generate Video from Script
```
POST /api/video/generate
Content-Type: application/json

{
  "script": { /* script object */ },
  "model": "veo3",
  "options": {}
}
```

### Complete Flow (Idea to Video)
```
POST /api/create
Content-Type: application/json

{
  "idea": "Your video idea",
  "platform": "youtube",
  "model": "veo3"
}
```

## 🎯 Supported Platforms

| Platform | Max Duration | Aspect Ratio | Recommended Duration |
|----------|-------------|--------------|---------------------|
| TikTok | 180s | 9:16 | 60s |
| Instagram | 90s | 9:16 | 30s |
| YouTube Shorts | 60s | 9:16 | 45s |
| Facebook Reels | 60s | 9:16 | 30s |
| LinkedIn | 180s | 16:9 | 90s |

## 🤖 Video Generation Models

- **VEO3**: Cloud-based high-quality video generation
- **Grok**: AI-powered video generation by X.AI
- **WAN 2.1/2.2**: Local models for on-premise video generation

## 📁 Project Structure

```
viral-reels-assistant/
├── src/
│   ├── api/
│   │   └── routes.js          # API endpoints
│   ├── config/
│   │   ├── index.js           # Configuration
│   │   └── constants.js       # Platform and model constants
│   ├── models/
│   │   └── VideoScript.js     # Data models
│   ├── services/
│   │   ├── AIScriptGenerator.js    # Script generation service
│   │   └── VideoGenerator.js       # Video generation service
│   └── server.js              # Express server
├── public/
│   └── index.html             # Frontend UI
├── .env.example               # Environment template
└── package.json
```

## 🛠️ Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `OPENAI_API_KEY`: OpenAI API key (required)
- `VEO3_API_KEY`: VEO3 API key (optional)
- `GROK_API_KEY`: Grok API key (optional)
- `WAN2_1_ENDPOINT`: Local WAN 2.1 model endpoint (optional)
- `WAN2_2_ENDPOINT`: Local WAN 2.2 model endpoint (optional)

## 🎨 How It Works

1. **Idea Input**: User provides a video idea and selects target platform
2. **Analysis**: AI analyzes the idea for viral potential and audience fit
3. **Story Crafting**: AI creates an engaging narrative with hook, build-up, and CTA
4. **Scene Generation**: Detailed scene-by-scene breakdown with visual and audio prompts
5. **Video Generation**: Generate videos using preferred model (VEO3, Grok, or WAN)

## 📝 Example Usage

```javascript
// Example: Generate script for TikTok
const response = await fetch('/api/script/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    idea: 'Quick morning routine for productivity',
    platform: 'tiktok'
  })
});

const data = await response.json();
console.log(data.script);
```

## 🔐 Security Notes

- Never commit your `.env` file
- Keep API keys secure
- Use environment variables for sensitive data
- Implement rate limiting for production use

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Video generation model providers
- All contributors to this project