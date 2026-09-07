# akiramartha — portfolio

A static site. No build step, no dependencies, nothing to install. Edit the HTML, push, done.

## Add a project (three steps)

1. Copy `files/_TEMPLATE.html` and rename the copy, e.g. `files/004-project-name.html`.
2. Open it and fill in every spot marked with an `<!-- ALL-CAPS comment -->`. The comments say what goes there and how long it should be.
3. Open `index.html`, find the commented-out `FILE 004` row near the bottom of the file index, uncomment it, and change its four values (number, title, category, status tag).

That's the whole process. Never touch `css/style.css` or `js/main.js` to add a project. The record count at the end of the index updates itself.

## Add a screenshot

1. Export it as WebP. Wide screenshots: 1600px wide max. Phone screenshots: 900px wide.
2. Drop it in `assets/` named after the file it belongs to, e.g. `004-home.webp`.
3. In the project page, copy the `<figure>` block, point `src` at the new file, and set `width` and `height` to the image's real pixel size (right-click the file, Get Info / Properties). Those two numbers stop the page from jumping while it loads.
4. Write the caption. Every image needs one; say what the reader is looking at.

For phone screenshots use `class="phone"` on the figure to get the rounded phone frame, and `class="evidence two-up"` on the wrapper to show two per row. Wide screenshots use `class="shot"` and plain `class="evidence"`.

Videos: self-host the MP4 in `assets/` (keep it under about 5MB), add a poster still as WebP, and use the commented-out video block in the template. Don't embed YouTube.

## The four status tags

Every project gets exactly one. Pick from this list; don't invent a fifth.

| Class | Reads as | Color | Use it for |
|---|---|---|---|
| `tag active` | ACTIVE | cyan | live and ongoing |
| `tag proto` | PROTOTYPE | amber | a working prototype that isn't public |
| `tag delivered` | DELIVERED | red | finished and handed over |
| `tag archived` | ARCHIVED | red, dimmer | finished and no longer maintained |

The same class goes in two places: the row in `index.html` and the `file-meta` line at the top of the project page.

## Change the accent color

Everything is a variable at the top of `css/style.css`, in the block marked `1. TOKENS`. To move the whole site from cyan to another color, change `--phos` (the main color), `--phos-dim` (labels), and `--phos-rgb` (the same color as three numbers, used for the glows). That's three lines. Glow strength is in the same block under `Glow`.

## Replace the placeholder files

The site ships with stand-ins at the right sizes. Replace each with the real file under the **same filename** and nothing else changes:

- `assets/photo.webp` — the portrait, 600×800
- `assets/akira-martha-resume.pdf` — the resume
- `assets/paul-walker.mp4` and `assets/paul-walker-poster.webp` — the edit and its poster still
- `assets/002-home.webp`, `002-daily-move.webp`, `002-patterns.webp`, `002-settings.webp` — Cycle Breaker screens, 900px wide. If the real ones aren't 1950px tall, update the `height="1950"` on those four `<img>` tags to the real height.

Also search the HTML for `akiramartha.github.io` and replace it with the site's real address once it's live. It's only used for link previews (`og:url` / `og:image`).

## Preview it on your computer

Open `index.html` in a browser. That's it. The boot sequence plays once per browser and then remembers; use the small `↻ REPLAY` link at the bottom of the credential to watch it again.

If you'd rather see it served like the real thing, run `python3 -m http.server` in this folder and open `http://localhost:8000`.

## Publish

Push to `main`. GitHub Pages (Settings → Pages → Deploy from branch `main`, folder `/`) serves the site as-is. The `.nojekyll` file tells GitHub not to process anything. Changes go live a minute or two after the push.
