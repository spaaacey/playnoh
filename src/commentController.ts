import * as vscode from "vscode";
import { randomBytes } from "node:crypto";
import * as path from "node:path";
import * as fs from "node:fs/promises";

export const commentController = vscode.comments.createCommentController(
  "playnoh",
  "Playnoh",
);

// Lines that get the "+" gutter button on hover.
commentController.commentingRangeProvider = {
  provideCommentingRanges: (document) => [
    new vscode.Range(0, 0, Math.max(document.lineCount - 1, 0), 0),
  ],
};

// Invoked by the button inside the comment widget (see comments/commentThread/context).
export const createComment = vscode.commands.registerCommand(
  "playnoh.createComment",
  async (reply: vscode.CommentReply) => {
    const { range, uri } = reply.thread;
    reply.thread.comments = [
      ...reply.thread.comments,
      {
        body: reply.text,
        mode: vscode.CommentMode.Preview,
        author: { name: "You" },
      },
    ];

    const ws = vscode.workspace.workspaceFolders?.[0];

    // loose file, no folder open
    if (!ws) {
      return;
    }

    const entry = {
      id: randomBytes(5).toString("hex"),
      comment: reply.text,
      file: uri.path,
      startLine: (range?.start.line ?? 0) + 1,
      endLine: (range?.end.line ?? 0) + 1,
    };

    const file = path.join(ws.uri.fsPath, ".claude", "agent-notes-user.jsonl");
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.appendFile(file, JSON.stringify(entry) + "\n");
  },
);
