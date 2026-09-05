import * as vscode from "vscode";
import { addComment } from "./addComments";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(addComment);
}

// This method is called when your extension is deactivated
export function deactivate() {}
