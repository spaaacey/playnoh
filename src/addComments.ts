import * as vscode from "vscode";

export const addComment = vscode.commands.registerCommand(
  "playnoh.addComment",
  () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const startLine = selection.start.line + 1;

    // A full-line selection ends at column 0 of the *next* line; don't count it.
    let endLine = selection.end.line + 1;
    if (endLine > selection.start.line && selection.end.character === 0) {
      endLine--;
    }

    vscode.window.showInformationMessage(
      `start line: ${startLine}, end line: ${endLine}`,
    );
  },
);
