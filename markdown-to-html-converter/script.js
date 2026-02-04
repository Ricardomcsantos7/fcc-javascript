/* function convertMarkdown() {
  return "";
}
 */
function convertMarkdown() {
  let markdown = document.getElementById("markdown-input").value;

  // Headings
  markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Bold (**text** or __text__)
  markdown = markdown.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  markdown = markdown.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic (*text* or _text_)
  markdown = markdown.replace(/\*(.+?)\*/g, "<em>$1</em>");
  markdown = markdown.replace(/_(.+?)_/g, "<em>$1</em>");

  return markdown;
}

/* eventListener for user Input */
const markdownInput = document.getElementById("markdown-input");

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  document.getElementById("html-output").textContent = html;
  document.getElementById("preview").innerHTML = html;
});
