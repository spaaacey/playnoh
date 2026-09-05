import * as vscode from "vscode";
import { commentController, createComment } from "./commentController";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(commentController, createComment);
}

// This method is called when your extension is deactivated
export function deactivate() {}
