export async function analyzeVideo(videoPath: string): Promise<{
  visualTags: string[];
  audioTags: string[];
  textTags: string[];
}> {
  // ПОКА ЗАГЛУШКА
  return {
    visualTags: ["dog", "nature"],
    audioTags: ["music"],
    textTags: []
  };
}
