const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const editor = vscode.window.activeTextEditor;

function activate(context) {
  let panel = null;
  const htmlPath = path.resolve(context.extensionPath, "webview/index.html");

  const text = editor.document.getText(editor.selection);

  vscode.commands.registerCommand("extension.createSnippetShoot", () => {
    panel = vscode.window.createWebviewPanel(
      "Snippet Photo Shoot",
      "Snippet Photo Shoot",
      2,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, "webview")),
        ],
      }
    );

    panel.webview.html = getHtmlContent(htmlPath);

    const fontFamily = vscode.workspace.getConfiguration("editor").fontFamily;
    const bgColor = context.globalState.get("polacode.bgColor", "#2e3440");
    panel.webview.postMessage({
      type: "init",
      fontFamily,
      bgColor,
      html: text,
    });
  });

  //   context.subscriptions.push(disposable);
}

// TODO: Da capire perchè
function getHtmlContent(htmlPath) {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  return htmlContent.replace(/script src="([^"]*)"/g, (match, src) => {
    const realSource = "vscode-resource:" + path.resolve(htmlPath, "..", src);
    return `script src="${realSource}"`;
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
