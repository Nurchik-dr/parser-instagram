import { useEffect, useState } from "react";

type FeedItem = {
  id: number;
  sourceUrl: string;
  sentiment: {
    sentiment: string;
    reason: string;
  };
};

function App() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/feed")
      .then(res => res.json())
      .then(setFeed);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>🌱 Позитивная лента</h1>

      {feed.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16
          }}
        >
          <p><strong>Почему позитив:</strong></p>
          <p>{item.sentiment.reason}</p>

          <a href={item.sourceUrl} target="_blank">
            Открыть оригинал
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
