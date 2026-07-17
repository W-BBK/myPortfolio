# Brixton's Portfolio

Single-page portfolio. No build step — open `index.html` in a browser.

## Adding a new project section

1. In `index.html`, copy any `<section>` block; give it a new `id` and `data-theme`.
2. Add a nav link pointing at the new `id`.
3. In `style.css`, copy a `body[data-theme="..."]` block and set its six colors.

`script.js` picks up new sections automatically.

## Publishing on GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main`, root folder.
3. Site appears at `https://<username>.github.io/<repo>/`.
