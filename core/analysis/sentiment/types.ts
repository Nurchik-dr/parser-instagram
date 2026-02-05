export type Sentiment = "positive" | "neutral" | "negative";

export interface SentimentInput {
  visualTags?: string[];
  audioTags?: string[];
  textTags?: string[];
}

export interface SentimentResult {
  sentiment: Sentiment;
  score: number;
  reasons: string[];
}
