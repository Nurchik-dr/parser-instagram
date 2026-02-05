import {
  NEGATIVE_WORDS,
  NEGATIVE_AUDIO,
  POSITIVE_VISUAL,
  POSITIVE_AUDIO
} from "./rules";
import { SentimentInput, SentimentResult } from "./types";

export function analyzeSentiment(input: SentimentInput): SentimentResult {
  let score = 50;
  const reasons: string[] = [];

  input.textTags?.forEach(word => {
    if (NEGATIVE_WORDS.includes(word)) {
      score -= 40;
      reasons.push(`negative text: ${word}`);
    }
  });

  input.audioTags?.forEach(tag => {
    if (NEGATIVE_AUDIO.includes(tag)) {
      score -= 30;
      reasons.push(`negative audio: ${tag}`);
    }
    if (POSITIVE_AUDIO.includes(tag)) {
      score += 15;
      reasons.push(`positive audio: ${tag}`);
    }
  });

  input.visualTags?.forEach(tag => {
    if (POSITIVE_VISUAL.includes(tag)) {
      score += 15;
      reasons.push(`positive visual: ${tag}`);
    }
  });

  if (score >= 65) {
    return { sentiment: "positive", score, reasons };
  }

  if (score <= 35) {
    return { sentiment: "negative", score, reasons };
  }

  return { sentiment: "neutral", score, reasons };
}
