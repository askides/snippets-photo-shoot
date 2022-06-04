const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
  const htmlPath = path.resolve(context.extensionPath, "webview/index.html");

  vscode.commands.executeCommand(
    "editor.action.clipboardCopyWithSyntaxHighlightingAction"
  );

  vscode.commands.registerCommand("extension.createSnippetShoot", () => {
    const panel = vscode.window.createWebviewPanel(
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

    panel.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "save":
          vscode.window
            .showSaveDialog({
              filters: {
                Images: ["png"],
              },
            })
            .then((uri) => {
              if (uri) {
                fs.writeFileSync(
                  uri.fsPath,
                  Buffer.from(message.data, "base64")
                );
              }
            });
          break;
        default:
          console.log("Unknown message");
          break;
      }
    });

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
