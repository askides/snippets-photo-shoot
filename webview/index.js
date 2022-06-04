(() => {
  const vscode = acquireVsCodeApi();

  const snippetNode = document.querySelector(".terminal__shell");
  const snippetContainerNode = document.querySelector(".background");
  const saveButton = document.getElementById("save");

  saveButton.addEventListener("click", () => {
    const node = document.querySelector(".terminal");

    const padding = 64;
    const width = node.offsetWidth * 2 + padding * 2;
    const height = node.offsetHeight * 2 + padding * 2;
    const config = {
      width,
      height,
      style: {
        transform: `scale(2)`,
        "transform-origin": "left top",
        padding: `${padding / 2}px`,
      },
    };

    domtoimage.toPng(snippetContainerNode, config).then(function (img) {
      var data = img.replace(/^data:image\/\w+;base64,/, "");

      vscode.postMessage({
        command: "save",
        data: data,
      });
    });
  });

  document.addEventListener("paste", (e) => {
    const innerHTML = e.clipboardData.getData("text/html");
    const innerHTMLWithoutBackground = innerHTML.replace(
      /background-color: (#[a-fA-F0-9]+)/,
      ""
    );
    snippetNode.innerHTML = innerHTMLWithoutBackground;
  });

  window.addEventListener("message", (e) => {
    switch (e.data.type) {
      case "init":
      case "update":
        document.execCommand("paste");
        break;
      default:
        console.log("Unknown message");
        break;
    }
  });
})();
