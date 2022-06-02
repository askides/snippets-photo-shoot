const vscode = require("vscode");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "snippets-photo-shoot.helloWorld",
    function () {
      vscode.window.showInformationMessage(
        "Hello World from Snippets Photo Shoot!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
