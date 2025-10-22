function countVisibleChars(text) {
  // 改行(\nや\r\n)を除いた上でカウント
  return text.replace(/\r?\n/g, "").length;
}

function createCounter(textarea) {
  if (textarea.dataset.hasCounter) return;
  textarea.dataset.hasCounter = "true";

  const counter = document.createElement("div");
  counter.className = "char-counter";
  counter.textContent = `${countVisibleChars(textarea.value)}文字`;

  textarea.parentNode.style.position = "relative";
  textarea.parentNode.appendChild(counter);

  textarea.addEventListener("input", () => {
    counter.textContent = `${countVisibleChars(textarea.value)}文字`;
  });
}

// ページ内すべてのtextareaに処理を適用
document.querySelectorAll("textarea").forEach(createCounter);

// 動的生成されたtextareaにも対応
const observer = new MutationObserver(() => {
  document.querySelectorAll("textarea").forEach(createCounter);
});
observer.observe(document.body, { childList: true, subtree: true });
