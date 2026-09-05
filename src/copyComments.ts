import * as vscode from "vscode";
import { readFile } from "node:fs/promises";
import * as path from "node:path";

export const copyCommments = vscode.commands.registerCommand(
  "playnoh.copyComments",
  async () => {
    const ws = vscode.workspace.workspaceFolders?.[0];
    // loose file, no folder open
    if (!ws) {
      return;
    }
    const file = path.join(ws.uri.fsPath, ".claude", "agent-notes-user.jsonl");
    const raw = await readFile(file, "utf8");
    const data = raw
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));

    const str = data
      .map((entry) => {
        return `- [${entry.id}] @${entry.file} L${entry.startLine}-L${entry.endLine} - ${entry.comment}`;
      })
      .join("\n");

    await vscode.env.clipboard.writeText(str);
  },
);
