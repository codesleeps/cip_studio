# SKILL.md
---
name: Image Copy Lesson
description: Lessons learned about copying Gemini‑generated images into a project with sandbox permissions.
---

## Lesson Summary

When copying generated assets into a repository you may encounter sandbox restrictions that block direct file system operations. The reliable workflow is:

1. **Request the narrowest permissions** – use `ask_permission` for `read_file` on the source directory and `write_file` on the target `assets/` folder.
2. **Create the destination folder** (`mkdir -p assets`).
3. **Copy the files** with a single `cp .../*.png assets/` command or copy‑and‑rename each file as needed.
4. **Verify** the files exist (`ls assets`) before proceeding.
5. **Avoid repeated attempts** – once permissions are granted, reuse them for subsequent copy commands.

Applying this pattern prevents long‑running, failing retries and keeps the workflow deterministic.
