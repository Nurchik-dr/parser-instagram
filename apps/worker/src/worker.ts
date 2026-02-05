import "dotenv/config";
import { Worker } from "bullmq";
import { connection } from "../../../core/queue/video.queue";
import { analyzeVideo } from "../../../core/analysis/video/video.analysis";
import { gptAnalyzeSentiment } from "../../../core/analysis/gpt/gptSentiment.service";
import { downloadInstagramVideo } from "../../../core/parser/instagram/instagram.parser";
import { savePositive } from "../../../data/feed.store";

new Worker(
  "video-analysis",
  async job => {
    try {
      const { url } = job.data;

      console.log("▶️ job started:", url);

      const { videoPath } = await downloadInstagramVideo(url);
      const analysis = await analyzeVideo(videoPath);

      const sentiment = await gptAnalyzeSentiment(analysis);

      console.log("🧠 GPT sentiment:", sentiment);

      if (sentiment.sentiment === "positive") {
        await savePositive({
          id: Date.now(),
          sourceUrl: url,
          analysis,
          sentiment
        });

        console.log("✅ saved to feed");
      } else {
        console.log("⛔ filtered:", sentiment.sentiment);
      }

      return sentiment;
    } catch (err) {
      console.error("❌ worker error:", err);
      throw err;
    }
  },
  { connection }
);

console.log("✅ Worker started");
