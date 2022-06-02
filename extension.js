const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
  let panel = null;

  const htmlPath = path.resolve(context.extensionPath, "webview/index.html");

  vscode.commands.executeCommand(
    "editor.action.clipboardCopyWithSyntaxHighlightingAction"
  );

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

    panel.webview.postMessage({
      type: "init",
      fontFamily,
    });
  });
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
