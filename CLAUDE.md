# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

brewlang.github.io is the site of Brewlang, the `.brew` coffee recipe language: the home page at `/` and the documentation under `/doc/`, both in English. It is Astro + Starlight. The language itself lives in the `brewlang` repo next to this one (`../brewlang`); the playground (`/playground/`) is its own repo and its own Pages site.

## Commands

- `npm run dev` — dev server on http://localhost:4321
- `npm test` — Vitest: the docs against the language (`tests/docs.test.ts`)
- `npm run build` — the static site in `dist/`

## Dependency on brewlang

- `"brewlang": "file:../brewlang/packages/brewlang"` and `"@brewlang/render": "file:../brewlang/packages/render"` link the sibling repo's packages; they resolve to their `dist/`, so run `npm run build` at the root of `../brewlang` after changing it.
- `src/pages/llms.txt.ts` serves `../brewlang/docs/llms.txt` (a `?raw` import; `vite.server.fs.allow: [".."]` lets the dev server read it). `llms.txt` stays in the brewlang repo, tested with the language and also served by the playground. Change it there.
- `.github/workflows/deploy.yml` checks out both repos side by side, builds brewlang, tests and builds the site, and publishes it on GitHub Pages from `main`. It also runs weekly, so a language change that breaks the docs shows up.

## Analytics

Cloudflare Web Analytics counts visits, without cookies: its script is added to every docs page by `head` in `astro.config.mjs`, and to the home page by `src/pages/index.astro`. The playground loads the same script with the same token, so both show in one Cloudflare dashboard.

## SEO

- `public/`: `favicon.svg` (a white Bricolage Grotesque B, as a path, on the accent; also Starlight's favicon), `apple-touch-icon.png` (the same icon, square, 180px), `og.png` (the share preview, 1200×630, a screenshot of a page in the home page's look) and `robots.txt` (points to the sitemap).
- The sitemap is `@astrojs/sitemap`, added in `astro.config.mjs` so it also lists `/playground/` (`customPages`); Starlight skips its own when it is there.
- The home page sets its own canonical, Open Graph tags and JSON-LD (`WebSite` for the site name in Google, `SoftwareSourceCode`); Starlight sets the docs' canonical and Open Graph tags from each page's `title` and `description`, plus the `og:image` from `head`. Give every new page a `description`.
- The playground's `index.html` points to the same icons and image.

## Content

- `src/pages/index.astro` — the home page, outside Starlight (its own layout, Bricolage Grotesque and JetBrains Mono, a `#d42e3b` accent; light code panels on the light theme, dark ones on the dark theme). Every recipe on it goes through the real `brewlang` and `@brewlang/render`: at build time in the page, then in `src/home/home.ts` in the browser (the hero typed once, the rotating cards, scaling and units, the editable recipes). `src/home/content.ts` holds its recipes (the full ones are `../brewlang/examples/*.brew`, read with `?raw`), `src/home/highlight.ts` colors code from brewlang's `lex()` like the playground, `src/home/home.css` holds its tokens and maps them onto the cards' `--brew-*` variables. The theme uses Starlight's `starlight-theme` key, so the home page and the docs share the reader's choice. The design is the "Brewlang Home" canvas (claude.ai/design).
- The docs take the home page's look through Starlight's variables only (`src/styles/custom.css`: fonts, accent, warm grays; the fonts are loaded by `head` in `astro.config.mjs`); Starlight's layout stays.
- `src/content/docs/doc/` — the documentation: `guide/` for recipe writers, `reference/vocabulary.md`, `integrate/` for developers, `spec/v0.md` (the language spec: grammar, semantic rules, conformance). The sidebar is set by hand in `astro.config.mjs`: add new pages there.
- Links between pages are absolute: `/doc/guide/writing-recipes/`.
- Code blocks of recipes use ```` ```brew ````, colored by `brew.tmLanguage.json` (one scope per role, like `src/home/highlight.ts`) with the home page's colors, added to Starlight's themes by `brew-theme.mjs`, which also gives the blocks the home page's code panels. Change a color in both places (`brew-theme.mjs` and `src/home/home.css`). After changing the grammar, delete `.astro/` and `node_modules/.astro/`: the build caches it. `tests/docs.test.ts` checks every block holding a whole recipe (a line starting with `@`): no diagnostic at all, or at least one error for a block marked ```` ```brew invalid ````. It also checks that `reference/vocabulary.md` names every brewer, action, alias, grind size, qualifier and unit of the language.
- The spec follows the lexer, parser and analyzer of `../brewlang`: when the language changes, update the spec, the guide and the vocabulary here. Notion keeps the reasoning ("Décisions & questions ouvertes").

## Conventions

2-space indent, TypeScript in `tests/`. Commit messages are in English, Conventional Commits style (`feat: …`, `docs: …`), like the playground.
