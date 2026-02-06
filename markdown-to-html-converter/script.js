function convertMarkdown() {
  let markdown = document.getElementById("markdown-input").value.trim();

  // Headings
  markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Bold
  markdown = markdown.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  markdown = markdown.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  markdown = markdown.replace(/\*(.+?)\*/g, "<em>$1</em>");
  markdown = markdown.replace(/_(.+?)_/g, "<em>$1</em>");

  // Images
  markdown = markdown.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img alt="$1" src="$2">',
  );

  // Links
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  markdown = markdown.replace(/^>\s?(.*)$/gm, "<blockquote>$1</blockquote>");

  // Line breaks
  markdown = markdown.replace(/\n/g, "<br>");

  return markdown;
}

/* eventListener for user Input */
const markdownInput = document.getElementById("markdown-input");

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  document.getElementById("html-output").textContent = html;
  document.getElementById("preview").innerHTML = html;
});
