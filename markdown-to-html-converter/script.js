/* function convertMarkdown() {
  return "";
}
 */
function convertMarkdown() {
  let markdown = document.getElementById("markdown-input").value;

  // Headings level 3
  markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");

  // Headings level 2
  markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");

  // Headings level 1
  markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  return markdown;
}

/* eventListener for user Input */
const markdownInput = document.getElementById("markdown-input");

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  document.getElementById("html-output").textContent = html;
  document.getElementById("preview").innerHTML = html;
});
