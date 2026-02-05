chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ANALYZE_POST") {
    fetch("http://localhost:3000/feed/analyze-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: message.text
      })
    })
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err =>
        sendResponse({ sentiment: "neutral", error: err.toString() })
      );

    return true; // async
  }
});
