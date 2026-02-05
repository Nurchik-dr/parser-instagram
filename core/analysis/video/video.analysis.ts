export async function analyzeVideo(videoPath: string): Promise<{
  visualTags: string[];
  audioTags: string[];
  textTags: string[];
}> {
  // ПОКА ЗАГЛУШКА, но уже ПРАВИЛЬНАЯ по архитектуре
  // позже тут будет ffmpeg / cv / audio

  return {
    visualTags: ["dog", "nature"],
    audioTags: ["music"],
    textTags: []
  };
}
