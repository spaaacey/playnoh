import * as vscode from "vscode";
import { commentController, createComment } from "./commentController";
import { copyCommments } from "./copyComments";
import path from "node:path";
import { unlink } from "node:fs/promises";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(commentController, createComment, copyCommments);
}

// This method is called when your extension is deactivated
export async function deactivate() {
  const ws = vscode.workspace.workspaceFolders?.[0];
  // loose file, no folder open
  if (!ws) {
    return;
  }
  const file = path.join(ws.uri.fsPath, ".claude", "agent-notes-user.jsonl");

  await unlink(file);
}
