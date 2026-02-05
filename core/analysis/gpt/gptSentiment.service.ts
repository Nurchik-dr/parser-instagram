import OpenAI from "openai";

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function gptAnalyzeSentiment(input: {
  visualTags: string[];
  audioTags: string[];
  textTags: string[];
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const openai = new OpenAI({ apiKey });

  const prompt = `
You are a strict content moderator.
Decide if content is POSITIVE, NEUTRAL, or NEGATIVE.
Only POSITIVE content is allowed.

Visual tags: ${input.visualTags.join(", ")}
Audio tags: ${input.audioTags.join(", ")}
Text tags: ${input.textTags.join(", ")}

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT wrap in \`\`\`.
JSON format:
{
  "sentiment": "positive | neutral | negative",
  "score": number,
  "reason": string
}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  const content = res.choices[0].message.content;
  if (!content) {
    throw new Error("Empty GPT response");
  }

  return extractJson(content);
}
