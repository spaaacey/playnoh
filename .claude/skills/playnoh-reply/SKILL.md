---
name: playnoh-reply
description: Read inline code comments pasted from the Playnoh VS Code extension and write answers back to the workspace .claude/agent-notes-replies.jsonl.
---

# Playnoh comments

The user leaves comments on specific lines of code and pastes them here as a
block. Each line is one comment:

```
- [<id>] @<file> L<start>-L<end> - <text>
```

`<id>` is a 5-character hex string. The user uses this id to uniquely identify each comment.

## Answering

Treat each comment as a request about the referenced lines. Read that range
before answering; the comment text alone is rarely enough context. If the
comment asks for a change, make the change — the reply then reports what you
did rather than proposing it.

Work through every comment in the block. Don't batch unrelated comments into
one answer.

## Writing replies back

After the work is done, append one line per comment to
`.claude/agent-notes-replies.jsonl`:

```json
{
  "id": "a1b2c3d4e5",
  "reply": "Cast is load-bearing — `parse()` returns `unknown`. Narrowed it with a type guard instead."
}
```

Rules:

- **Only Appends to the .claude/agent-notes-replies.jsonl.** Never rewrite, reorder, or delete existing lines
- One JSON object per line, no trailing commas, no pretty-printing.
- `id` must match the pasted comment's id character for character.
- `reply` is a single-line string. Escape newlines as `\n` — a literal newline
  breaks the line-delimited format.
- Every comment in the block gets exactly one reply line, including ones you
  decided not to act on ("Left as is — ...").
- Create `.claude/` and the file if they don't exist in the workspace folder.

## After writing

Tell the user how many replies you wrote and that they can hit Refresh in the
editor to pull them into the threads. Keep your terminal answer short; the
substance belongs in the reply lines, not restated in chat.
