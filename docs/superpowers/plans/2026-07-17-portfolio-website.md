# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Brixton's single-page portfolio (About Me, 2048Race, Beary the Bear) with per-section theme cross-fades on scroll.

**Architecture:** One `index.html` with three `<section data-theme=...>` blocks and a sticky nav. All colors flow through CSS custom properties scoped to `body[data-theme=...]`; a small script watches which section crosses the viewport center and swaps `document.body.dataset.theme`, letting CSS transitions cross-fade every color. No build step.

**Tech Stack:** Plain HTML5, CSS3, vanilla JavaScript. No frameworks, no bundler, no test framework — verification is opening the page in a browser and checking specific observable behaviors (this project intentionally has zero toolchain).

## Global Constraints

- No build step, no external dependencies, no CDN links — the site must work by double-clicking `index.html`.
- Every color used anywhere must come from a theme variable (`--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--accent-2`) so theme swaps re-color the entire page. Shadows may use fixed rgba blacks.
- Theme palettes are fixed by the spec (do not invent colors):
  - `about` (LinkedIn look): bg `#f4f2ee`, surface `#ffffff`, text `#191919`, muted `#666666`, accent `#0a66c2`, accent-2 `#004182`
  - `race2048`: bg `#0b0e14`, surface `#12161f`, text `#e2e8f0`, muted `#8b93a7`, accent `#7c5cff`, accent-2 `#5cc8ff`
  - `beary`: bg `#f3e2c8`, surface `#c4a484`, text `#281c12`, muted `#5e4a33`, accent `#966c46`, accent-2 `#281c12`
- Personal details (LinkedIn URL, school, email, bio, project URLs) are placeholders marked with `TODO` — never invent real-looking values.
- Windows paths; the Beary sprite source is `C:\Users\brixt\OneDrive\Desktop\deskPet\assets\Bears\Brown\idle.png` (256×64 sheet, four 64×64 frames, 250ms/frame).
- Commit after every task with the message given in the task.

**Verification workflow used by every task:** run `start index.html` (Windows opens the default browser) or refresh the already-open tab, then check the listed behaviors. There is no automated test runner by design.

---

### Task 1: Page structure and assets (`index.html`)

**Files:**
- Create: `index.html`
- Create: `assets/beary-idle.png` (copied from the deskPet repo)
- Create: `.gitignore`

**Interfaces:**
- Produces: section ids `about`, `race2048`, `beary`; `data-theme` attributes with the same names; class names `nav`, `nav-link`, `profile-card`, `profile-banner`, `profile-photo`, `profile-body`, `headline`, `school`, `bio`, `profile-links`, `showcase`, `tagline`, `shot-frame`, `desc`, `tags`, `beary-stage`, `beary-sprite`, `btn`, `btn-primary`, `section-inner`. Tasks 2 and 3 style/query exactly these names.

- [ ] **Step 1: Copy the Beary sprite into the project**

```powershell
New-Item -ItemType Directory -Force assets
Copy-Item "C:\Users\brixt\OneDrive\Desktop\deskPet\assets\Bears\Brown\idle.png" "assets\beary-idle.png"
```

Expected: `assets\beary-idle.png` exists (256×64 PNG).

- [ ] **Step 2: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brixton — Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-theme="about">
  <!--
    HOW TO ADD A NEW PROJECT TAB:
    1. Copy any <section> block below. Give it a unique id and data-theme name.
    2. Add a matching nav link: <a href="#yourid" class="nav-link">Your Project</a>
    3. In style.css, copy a body[data-theme="..."] block and set its six color
       variables for the new theme.
    script.js discovers sections automatically — no JS changes needed.
  -->

  <header class="nav">
    <span class="nav-name">Brixton</span>
    <nav class="nav-links">
      <a href="#about" class="nav-link">About Me</a>
      <a href="#race2048" class="nav-link">2048Race</a>
      <a href="#beary" class="nav-link">Beary the Bear</a>
    </nav>
  </header>

  <main>
    <!-- ============ ABOUT ME ============ -->
    <section id="about" data-theme="about">
      <div class="section-inner">
        <div class="profile-card">
          <div class="profile-banner"></div>
          <img class="profile-photo" src="assets/profile.jpg"
               alt="Photo of Brixton (add assets/profile.jpg)">
          <div class="profile-body">
            <h1>Brixton</h1>
            <p class="headline">Student · Builder of games and desk pets
              <!-- TODO: replace with your real headline --></p>
            <p class="school">School: TODO — add your school here</p>
            <p class="bio">
              TODO — write a short bio. A couple of sentences about who you are,
              what you like building, and what you're learning right now.
            </p>
            <div class="profile-links">
              <a class="btn btn-primary" href="https://www.linkedin.com/in/TODO">LinkedIn</a>
              <a class="btn" href="https://github.com/TODO">GitHub</a>
              <a class="btn" href="mailto:TODO@example.com">Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 2048RACE ============ -->
    <section id="race2048" data-theme="race2048">
      <div class="section-inner">
        <div class="showcase">
          <h2>2048Race</h2>
          <p class="tagline">Head-to-head multiplayer 2048 — race an opponent to the winning tile.</p>
          <div class="shot-frame">
            <img src="assets/2048race-screenshot.png"
                 alt="2048Race gameplay screenshot (add assets/2048race-screenshot.png)">
          </div>
          <p class="desc">
            TODO — describe 2048Race: real-time matches, matchmaking queue,
            guest names, and stats tracking.
          </p>
          <ul class="tags">
            <li>TypeScript</li><li>React</li><li>Socket.IO</li>
            <li>Tailwind CSS</li><li>SQLite</li>
          </ul>
          <a class="btn btn-primary" href="https://TODO-2048race-url.example">Play it</a>
        </div>
      </div>
    </section>

    <!-- ============ BEARY THE BEAR ============ -->
    <section id="beary" data-theme="beary">
      <div class="section-inner">
        <div class="showcase">
          <h2>Beary the Bear</h2>
          <p class="tagline">A desktop pet in the spirit of the early-2000s desk buddies.</p>
          <div class="beary-stage">
            <div class="beary-sprite" role="img" aria-label="Beary idle animation"></div>
          </div>
          <p class="desc">
            TODO — describe Beary: he lives on your desktop, wanders your taskbar,
            naps, dances, and reacts when you drag him around.
          </p>
          <ul class="tags">
            <li>C#</li><li>.NET 8</li><li>WPF</li><li>Sprite animation</li>
          </ul>
          <a class="btn btn-primary" href="https://github.com/TODO/deskPet">View on GitHub</a>
        </div>
      </div>
    </section>
  </main>

  <footer>© 2026 Brixton</footer>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Write `.gitignore`**

```gitignore
Thumbs.db
Desktop.ini
```

- [ ] **Step 4: Verify in browser**

Run: `start index.html`
Expected: unstyled page showing all three sections' text top-to-bottom; the three nav links jump to their sections; broken-image icons with alt text where `profile.jpg` and the 2048Race screenshot are missing (those are user-supplied later). No 404 for `beary-idle.png` in devtools Network tab (it isn't referenced yet — just confirm the file exists on disk).

- [ ] **Step 5: Commit**

```powershell
git add index.html assets/beary-idle.png .gitignore
git commit -m "feat: page structure with three themed sections and Beary sprite asset"
```

---

### Task 2: Styling and themes (`style.css`)

**Files:**
- Create: `style.css`

**Interfaces:**
- Consumes: every class name and `data-theme` value from Task 1, `assets/beary-idle.png`.
- Produces: `body[data-theme]` variable blocks named `about`, `race2048`, `beary`; `.nav-link.active` style hook that Task 3's script toggles.

- [ ] **Step 1: Write `style.css`**

```css
/* ============================================================
   THEMES — to add a project, copy one block, rename the theme,
   set the six variables. Everything else re-colors itself.
   ============================================================ */
body[data-theme="about"] {      /* LinkedIn-profile look */
  --bg: #f4f2ee;
  --surface: #ffffff;
  --text: #191919;
  --muted: #666666;
  --accent: #0a66c2;
  --accent-2: #004182;
}
body[data-theme="race2048"] {   /* 2048Race's neon blue/purple */
  --bg: #0b0e14;
  --surface: #12161f;
  --text: #e2e8f0;
  --muted: #8b93a7;
  --accent: #7c5cff;
  --accent-2: #5cc8ff;
}
body[data-theme="beary"] {      /* Beary's actual sprite palette */
  --bg: #f3e2c8;
  --surface: #c4a484;
  --text: #281c12;
  --muted: #5e4a33;
  --accent: #966c46;
  --accent-2: #281c12;
}

/* ============ Base ============ */
* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.6s ease, color 0.6s ease;
}

img { max-width: 100%; display: block; }

/* ============ Sticky nav ============ */
.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--surface);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.18);
  transition: background-color 0.6s ease;
}

.nav-name { font-weight: 700; font-size: 1.1rem; color: var(--accent); transition: color 0.6s ease; }

.nav-links { display: flex; gap: 0.25rem; flex-wrap: wrap; }

.nav-link {
  color: var(--muted);
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.95rem;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.nav-link:hover { color: var(--accent); }

.nav-link.active {
  color: var(--accent);
  background-color: var(--bg);
  font-weight: 600;
}

/* ============ Sections ============ */
section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
}

.section-inner { width: 100%; max-width: 720px; }

/* ============ About Me: LinkedIn-style profile card ============ */
.profile-card {
  background-color: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transition: background-color 0.6s ease;
}

.profile-banner {
  height: 130px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  transition: background 0.6s ease;
}

.profile-photo {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid var(--surface);
  object-fit: cover;
  background-color: var(--bg);
  margin: -65px 0 0 2rem;
  transition: border-color 0.6s ease, background-color 0.6s ease;
}

.profile-body { padding: 1rem 2rem 2rem; }

.profile-body h1 { font-size: 1.9rem; margin-bottom: 0.2rem; }

.headline { color: var(--text); margin-bottom: 0.35rem; }

.school { color: var(--muted); font-size: 0.95rem; margin-bottom: 1rem; transition: color 0.6s ease; }

.bio { line-height: 1.6; margin-bottom: 1.5rem; }

.profile-links { display: flex; gap: 0.75rem; flex-wrap: wrap; }

/* ============ Buttons (shared) ============ */
.btn {
  display: inline-block;
  padding: 0.55rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  color: var(--accent);
  border: 1.5px solid var(--accent);
  transition: color 0.3s ease, border-color 0.6s ease, background-color 0.3s ease;
}

.btn:hover { background-color: var(--accent); color: var(--surface); }

.btn-primary { background-color: var(--accent); color: var(--surface); }

.btn-primary:hover { filter: brightness(1.15); }

/* ============ Project showcases (shared) ============ */
.showcase { text-align: center; }

.showcase h2 {
  font-size: 2.4rem;
  margin-bottom: 0.4rem;
  color: var(--accent);
  transition: color 0.6s ease;
}

.tagline { color: var(--muted); margin-bottom: 1.5rem; transition: color 0.6s ease; }

.shot-frame {
  aspect-ratio: 16 / 9;
  border: 2px dashed var(--muted);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: var(--surface);
  transition: background-color 0.6s ease, border-color 0.6s ease;
}

.shot-frame img { width: 100%; height: 100%; object-fit: cover; }

.desc { line-height: 1.6; margin-bottom: 1.25rem; text-align: left; }

.tags {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.tags li {
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: var(--surface);
  color: var(--accent-2);
  border: 1px solid var(--muted);
  transition: background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease;
}

/* ============ Beary sprite (real 64×64 frames, 4-frame idle loop) ============ */
.beary-stage {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  margin-bottom: 1.5rem;
}

.beary-sprite {
  width: 64px;
  height: 64px;
  background: url("assets/beary-idle.png") 0 0 no-repeat;
  image-rendering: pixelated;
  transform: scale(2.5);
  transform-origin: bottom center;
  animation: beary-idle 1s steps(4) infinite;
}

@keyframes beary-idle {
  to { background-position: -256px 0; }
}

/* ============ Footer ============ */
footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--muted);
  font-size: 0.85rem;
  transition: color 0.6s ease;
}

/* ============ Small screens ============ */
@media (max-width: 540px) {
  .nav { flex-direction: column; padding: 0.6rem 1rem; }
  .profile-photo { margin-left: 1rem; }
  .profile-body { padding: 1rem 1.25rem 1.5rem; }
  .showcase h2 { font-size: 1.9rem; }
}
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`. Expected:
- Whole page uses the LinkedIn theme (warm gray `#f4f2ee` background) — JS doesn't exist yet, so the theme never changes while scrolling; that's correct for this task.
- About: white card, blue banner gradient, circular photo frame overlapping the banner, LinkedIn-blue buttons.
- 2048Race and Beary sections show centered showcases with dashed screenshot frame / animated frame area.
- Beary's sprite animates through 4 idle frames (he shifts weight/blinks), crisp pixels, no neighboring frame bleeding at the edges.
- Narrow the window below 540px: nav stacks vertically, nothing overflows horizontally.

- [ ] **Step 3: Commit**

```powershell
git add style.css
git commit -m "feat: theme system, LinkedIn-style profile card, showcases, Beary sprite animation"
```

---

### Task 3: Scroll theme switching (`script.js`)

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: `section[data-theme]` elements and `.nav-link` anchors from Task 1; `.nav-link.active` style from Task 2.
- Produces: sets `document.body.dataset.theme` and toggles `.active` on nav links. No exports.

- [ ] **Step 1: Write `script.js`**

```js
// Swap the page theme to whichever section currently crosses the viewport
// center. rootMargin shrinks the observation zone to a horizontal line at
// 50% viewport height, so exactly one section "owns" the page at a time —
// this also works for sections taller than the viewport, where a visibility
// threshold like 0.5 would never fire.
const sections = document.querySelectorAll("section[data-theme]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.body.dataset.theme = entry.target.dataset.theme;
      for (const link of navLinks) {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      }
    }
  },
  { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`. Expected:
- Scrolling down: as 2048Race reaches mid-screen the whole page (nav included) cross-fades to dark navy/purple over ~0.6s; continuing to Beary fades to warm brown/cream. Scrolling back up reverses correctly.
- The nav link of the current section is highlighted, and updates while scrolling and after clicking a nav button.
- Clicking "Beary the Bear" from the top smooth-scrolls and lands on the brown theme.
- Devtools console shows no errors.

- [ ] **Step 3: Verify the no-JS fallback**

In devtools (F12 → Ctrl+Shift+P → "Disable JavaScript"), reload. Expected: page renders fully in the LinkedIn theme, nav anchors still jump to sections. Re-enable JavaScript afterwards.

- [ ] **Step 4: Commit**

```powershell
git add script.js
git commit -m "feat: scroll-driven theme switching with nav highlight"
```

---

### Task 4: README and final pass

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: everything above; documents the add-a-project recipe from the Task 1 HTML comment.

- [ ] **Step 1: Write `README.md`**

```markdown
# Brixton's Portfolio

Single-page portfolio. No build step — open `index.html` in a browser.

## Filling in your info

Search the project for `TODO`:
- `index.html` — bio, school, headline, LinkedIn/GitHub/email URLs, project links
- `assets/profile.jpg` — add your photo (square works best)
- `assets/2048race-screenshot.png` — add a gameplay screenshot

## Adding a new project section

1. In `index.html`, copy any `<section>` block; give it a new `id` and `data-theme`.
2. Add a nav link pointing at the new `id`.
3. In `style.css`, copy a `body[data-theme="..."]` block and set its six colors.

`script.js` picks up new sections automatically.

## Publishing on GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main`, root folder.
3. Site appears at `https://<username>.github.io/<repo>/`.
```

- [ ] **Step 2: Full manual pass**

Run through every behavior once, in order: nav jumps (all three), scroll fades down and up, nav highlight tracking, Beary animation, sub-540px layout, no console errors, page works from a fresh `start index.html` double-click.

- [ ] **Step 3: Commit**

```powershell
git add README.md
git commit -m "docs: README with fill-in, expansion, and GitHub Pages instructions"
```
