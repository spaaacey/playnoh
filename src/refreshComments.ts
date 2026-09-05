import * as vscode from "vscode";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { threadsById } from "./commentController";

export const refreshComments = vscode.commands.registerCommand(
  "playnoh.refreshComments",
  async () => {
    const ws = vscode.workspace.workspaceFolders?.[0];
    // loose file, no folder open
    if (!ws) {
      return;
    }
    const file = path.join(
      ws.uri.fsPath,
      ".claude",
      "agent-notes-replies.jsonl",
    );
    const raw = await readFile(file, "utf8");
    const data = raw
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));

    for (const entry of data) {
      const thread = threadsById.get(entry.id);
      if (!thread) {
        continue;
      }

      thread.comments = [
        ...thread.comments,
        {
          body: new vscode.MarkdownString(entry.comment),
          mode: vscode.CommentMode.Preview,
          author: { name: "Claude" },
        },
      ];

      thread.collapsibleState = vscode.CommentThreadCollapsibleState.Expanded;
    }
  },
);
