import { Request, Response } from "express";
import { videoQueue } from "../../../../core/queue/video.queue";
import { getFeed } from "../../../../data/feed.store";
import { gptAnalyzeSentiment } from "../../../../core/analysis/gpt/gptSentiment.service";

export async function analyzeFromUrl(req: Request, res: Response) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  await videoQueue.add("analyze", { url });

  res.json({ status: "accepted", url });
}

export async function getFeedHandler(req: Request, res: Response) {
  const feed = await getFeed();
  res.json(feed);
}

// 🔥 ВОТ ЭТО НОВОЕ — ДЛЯ CHROME EXTENSION
export async function analyzeText(req: Request, res: Response) {
  const { text } = req.body;

  if (!text) {
    return res.json({ sentiment: "neutral" });
  }

  const sentiment = await gptAnalyzeSentiment({
    visualTags: [],
    audioTags: [],
    textTags: [text]
  });

  res.json(sentiment);
}
