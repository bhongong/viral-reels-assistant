const OpenAI = require('openai');
const config = require('../config');
const { PLATFORM_SPECS } = require('../config/constants');
const { VideoScript, Scene } = require('../models/VideoScript');

class AIScriptGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey
    });
  }

  /**
   * Analyze user's idea and provide suggestions
   */
  async analyzeIdea(idea, platform) {
    const platformSpec = PLATFORM_SPECS[platform];
    
    const prompt = `Analyze this video idea for ${platform}:
"${idea}"

Consider:
- Platform: ${platform}
- Max duration: ${platformSpec.maxDuration}s
- Aspect ratio: ${platformSpec.aspectRatio}
- Key hooks: ${platformSpec.hooks.join(', ')}

Provide:
1. Viral potential score (1-10)
2. Target audience
3. Key improvement suggestions
4. Trending topics that align with this idea

Format as JSON.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert social media content strategist specializing in viral video content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing idea:', error);
      throw new Error('Failed to analyze idea');
    }
  }

  /**
   * Craft an engaging story from the idea
   */
  async craftStory(idea, platform, analysis) {
    const platformSpec = PLATFORM_SPECS[platform];
    
    const prompt = `Create an engaging story for a ${platform} video based on:
Idea: "${idea}"
Analysis: ${JSON.stringify(analysis)}

Requirements:
- Duration: ${platformSpec.recommendedDuration}s
- Aspect ratio: ${platformSpec.aspectRatio}
- Must include: ${platformSpec.hooks.join(', ')}

Create a compelling narrative arc with:
1. Hook (first 3 seconds)
2. Build-up
3. Climax/Value delivery
4. Call-to-action

Format as JSON with: title, hook, story, cta, keyMessages.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a viral content storyteller who creates engaging narratives optimized for social media.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error crafting story:', error);
      throw new Error('Failed to craft story');
    }
  }

  /**
   * Generate detailed scene prompts
   */
  async generateScenePrompts(story, platform, numberOfScenes = 5) {
    const platformSpec = PLATFORM_SPECS[platform];
    const sceneDuration = Math.floor(platformSpec.recommendedDuration / numberOfScenes);
    
    const prompt = `Generate ${numberOfScenes} detailed scene prompts for:
Story: ${JSON.stringify(story)}
Platform: ${platform}
Scene duration: ~${sceneDuration}s each

For each scene provide:
1. Scene number
2. Description
3. Visual prompt (highly detailed for video generation AI)
4. Audio/music prompt
5. Text overlay suggestion
6. Transition type

Format as JSON array of scenes.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating detailed visual prompts for AI video generation, specializing in viral social media content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result.scenes || [];
    } catch (error) {
      console.error('Error generating scene prompts:', error);
      throw new Error('Failed to generate scene prompts');
    }
  }

  /**
   * Generate complete video script from idea to detailed scenes
   */
  async generateCompleteScript(idea, platform) {
    try {
      // Step 1: Analyze the idea
      const analysis = await this.analyzeIdea(idea, platform);
      
      // Step 2: Craft the story
      const story = await this.craftStory(idea, platform, analysis);
      
      // Step 3: Generate scene prompts
      const sceneData = await this.generateScenePrompts(story, platform);
      
      // Create VideoScript object
      const videoScript = new VideoScript({
        title: story.title,
        platform,
        idea,
        story: story.story,
        metadata: {
          analysis,
          hook: story.hook,
          cta: story.cta,
          keyMessages: story.keyMessages
        }
      });

      // Add scenes
      sceneData.forEach((sceneInfo, index) => {
        const scene = new Scene({
          sceneNumber: index + 1,
          description: sceneInfo.description,
          duration: sceneInfo.duration || Math.floor(PLATFORM_SPECS[platform].recommendedDuration / sceneData.length),
          visualPrompt: sceneInfo.visualPrompt,
          audioPrompt: sceneInfo.audioPrompt,
          textOverlay: sceneInfo.textOverlay,
          transition: sceneInfo.transition
        });
        videoScript.addScene(scene);
      });

      return videoScript;
    } catch (error) {
      console.error('Error generating complete script:', error);
      throw error;
    }
  }
}

module.exports = AIScriptGenerator;
