(() => {
  const vscode = acquireVsCodeApi();

  console.log("bucchina");

  const snippetNode = document.getElementById("snippet");

  const getInitialHtml = (fontFamily) => {
    const cameraWithFlashEmoji = String.fromCodePoint(128248);
    const monoFontStack = `${fontFamily},SFMono-Regular,Consolas,DejaVu Sans Mono,Ubuntu Mono,Liberation Mono,Menlo,Courier,monospace`;
    return `<meta charset="utf-8"><div style="color: #d8dee9;background-color: #2e3440; font-family: ${monoFontStack};font-weight: normal;font-size: 12px;line-height: 18px;white-space: pre;"><div><span style="color: #8fbcbb;">console</span><span style="color: #eceff4;">.</span><span style="color: #88c0d0;">log</span><span style="color: #d8dee9;">(</span><span style="color: #eceff4;">'</span><span style="color: #a3be8c;">0. Run command \`Polacode ${cameraWithFlashEmoji}\`</span><span style="color: #eceff4;">'</span><span style="color: #d8dee9;">)</span></div><div><span style="color: #8fbcbb;">console</span><span style="color: #eceff4;">.</span><span style="color: #88c0d0;">log</span><span style="color: #d8dee9;">(</span><span style="color: #eceff4;">'</span><span style="color: #a3be8c;">1. Copy some code</span><span style="color: #eceff4;">'</span><span style="color: #d8dee9;">)</span></div><div><span style="color: #8fbcbb;">console</span><span style="color: #eceff4;">.</span><span style="color: #88c0d0;">log</span><span style="color: #d8dee9;">(</span><span style="color: #eceff4;">'</span><span style="color: #a3be8c;">2. Paste into Polacode view</span><span style="color: #eceff4;">'</span><span style="color: #d8dee9;">)</span></div><div><span style="color: #8fbcbb;">console</span><span style="color: #eceff4;">.</span><span style="color: #88c0d0;">log</span><span style="color: #d8dee9;">(</span><span style="color: #eceff4;">'</span><span style="color: #a3be8c;">3. Click the button ${cameraWithFlashEmoji}</span><span style="color: #eceff4;">'</span><span style="color: #d8dee9;">)</span></div></div></div>`;
  };

  document.addEventListener("paste", (e) => {
    const innerHTML = e.clipboardData.getData("text/html");
    snippetNode.innerHTML = innerHTML;
  });

  window.addEventListener("message", (e) => {
    if (e) {
      if (e.data.type === "init") {
        const { fontFamily, bgColor } = e.data;

        console.log(fontFamily, bgColor);

        const initialHtml = getInitialHtml(fontFamily);
        snippetNode.innerHTML = initialHtml;
      } else if (e.data.type === "update") {
        document.execCommand("paste");
      } else {
        console.log("Unknown message");
      }
    }
  });
})();
