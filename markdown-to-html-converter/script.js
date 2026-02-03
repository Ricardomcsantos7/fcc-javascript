/* function convertMarkdown() {
  return "";
}
 */
function convertMarkdown() {
  const markdown = document.getElementById("markdown-input").value;
  return markdown;
}

const markdownInput = document.getElementById("markdown-input");

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  document.getElementById("html-output").textContent = html;
  document.getElementById("preview").innerHTML = html;
});
