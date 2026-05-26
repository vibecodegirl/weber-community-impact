## Problem

The About page renders `about.boardPreview.members` (placeholder "Board Member" entries with gradient boxes), not the real `board.directors` list from `src/content/board.ts`. The real data was already updated, but the About page never pulled from it.

## Fix

1. In `src/routes/about.tsx`:
   - Import `board` from `@/content/board`.
   - Replace the board preview section's mapping over `about.boardPreview.members` with `board.directors`.
   - Render each director using their `imageUrl` (in an `<img>` filling the square) instead of the gradient placeholder, plus `name`, `role`, and `affiliation` underneath.

2. In `src/content/about.ts`:
   - Remove the now-unused `boardPreview.members` placeholder array (keep `eyebrow` and `title` since the section header still uses them).

No changes to `board.ts` — its data is correct.