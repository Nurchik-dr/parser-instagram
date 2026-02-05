import { connection } from "../core/queue/video.queue";

const FEED_KEY = "positive-feed";

export async function savePositive(item: any) {
  await connection.lpush(FEED_KEY, JSON.stringify(item));
}

export async function getFeed() {
  const items = await connection.lrange(FEED_KEY, 0, 50);
  return items.map(i => JSON.parse(i));
}
