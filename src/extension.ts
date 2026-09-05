import * as vscode from "vscode";
import { commentController, createComment } from "./commentController";
import { copyCommments } from "./copyComments";
import { refreshComments } from "./refreshComments";
import path from "node:path";
import { unlink } from "node:fs/promises";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    commentController,
    createComment,
    copyCommments,
    refreshComments,
  );
}

// This method is called when your extension is deactivated
export async function deactivate() {
  const ws = vscode.workspace.workspaceFolders?.[0];
  // loose file, no folder open
  if (!ws) {
    return;
  }
  const userFile = path.join(
    ws.uri.fsPath,
    ".claude",
    "agent-notes-user.jsonl",
  );
  const agentFile = path.join(
    ws.uri.fsPath,
    ".claude",
    "agent-notes-replies.jsonl",
  );

  await unlink(userFile);
  await unlink(agentFile);

}
