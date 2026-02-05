console.log("🌱 Positive Instagram extension loaded");

function getPostText(postEl) {
  // берём ВЕСЬ текст поста
  const text = postEl.innerText || "";
  return text.trim();
}

function analyzePost(postEl) {
  const text = getPostText(postEl);

  // 🔎 ВАЖНО: смотрим, что реально отправляем
  console.log("📝 Post text:", text.slice(0, 200));

  if (!text || text.length < 20) {
    // слишком мало текста — пропускаем
    return;
  }

  chrome.runtime.sendMessage(
    { type: "ANALYZE_POST", text },
    response => {
      console.log("🧠 Sentiment response:", response);

      if (!response || response.sentiment !== "positive") {
        postEl.style.display = "none";
      } else {
        postEl.style.outline = "3px solid #4CAF50";
      }
    }
  );
}

function scanFeed() {
  const posts = document.querySelectorAll("article");

  posts.forEach(post => {
    if (!post.dataset.checked) {
      post.dataset.checked = "true";
      analyzePost(post);
    }
  });
}

// первая загрузка
setTimeout(scanFeed, 3000);

// наблюдаем за подгрузкой новых постов
const observer = new MutationObserver(scanFeed);
observer.observe(document.body, { childList: true, subtree: true });
