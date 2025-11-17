class VideoScript {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.title = data.title;
    this.platform = data.platform;
    this.idea = data.idea;
    this.story = data.story;
    this.scenes = data.scenes || [];
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  addScene(scene) {
    this.scenes.push(scene);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      platform: this.platform,
      idea: this.idea,
      story: this.story,
      scenes: this.scenes,
      metadata: this.metadata,
      createdAt: this.createdAt
    };
  }
}

class Scene {
  constructor(data) {
    this.id = data.id || Date.now().toString() + Math.random();
    this.sceneNumber = data.sceneNumber;
    this.description = data.description;
    this.duration = data.duration; // in seconds
    this.visualPrompt = data.visualPrompt;
    this.audioPrompt = data.audioPrompt;
    this.textOverlay = data.textOverlay;
    this.transition = data.transition;
  }

  toJSON() {
    return {
      id: this.id,
      sceneNumber: this.sceneNumber,
      description: this.description,
      duration: this.duration,
      visualPrompt: this.visualPrompt,
      audioPrompt: this.audioPrompt,
      textOverlay: this.textOverlay,
      transition: this.transition
    };
  }
}

module.exports = { VideoScript, Scene };
