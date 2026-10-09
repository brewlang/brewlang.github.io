# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

brewlang.github.io is the site of Brewlang, the `.brew` coffee recipe language: the home page at `/` and the documentation under `/doc/`, both in English. It is Astro + Starlight. The language itself lives in the `brewlang` repo next to this one (`../brewlang`); the playground (`/playground/`) is its own repo and its own Pages site.

## Commands

- `npm run dev` — dev server on http://localhost:4321
- `npm test` — Vitest: the docs against the language (`tests/docs.test.ts`)
- `npm run build` — the static site in `dist/`

## Dependency on brewlang

- `"brewlang": "file:../brewlang/packages/brewlang"` links the sibling repo's package; it resolves to its `dist/`, so run `npm run build` in `../brewlang` after changing it.
- `src/pages/llms.txt.ts` serves `../brewlang/docs/llms.txt` (a `?raw` import; `vite.server.fs.allow: [".."]` lets the dev server read it). `llms.txt` stays in the brewlang repo, tested with the language and also served by the playground. Change it there.
- `.github/workflows/deploy.yml` checks out both repos side by side, builds brewlang, tests and builds the site, and publishes it on GitHub Pages from `main`. It also runs weekly, so a language change that breaks the docs shows up.

## Analytics

Cloudflare Web Analytics counts visits, without cookies: its script is added to every page by `head` in `astro.config.mjs`. The playground loads the same script with the same token, so both show in one Cloudflare dashboard.

## Content

- `src/content/docs/index.mdx` — the home page, a Starlight `splash` page for now (a custom design may replace it in `src/pages/`).
- `src/content/docs/doc/` — the documentation: `guide/` for recipe writers, `reference/vocabulary.md`, `integrate/` for developers, `spec/v0.md` (the language spec: grammar, semantic rules, conformance). The sidebar is set by hand in `astro.config.mjs`: add new pages there.
- Links between pages are absolute: `/doc/guide/writing-recipes/`.
- Code blocks of recipes use ```` ```brew ````, colored by `brew.tmLanguage.json` (one scope per role, like the playground's `src/highlight.ts`) with the playground's colors, added to Starlight's themes by `brew-theme.mjs`. Change a color in both places. After changing the grammar, delete `.astro/` and `node_modules/.astro/`: the build caches it. `tests/docs.test.ts` checks every block holding a whole recipe (a line starting with `@`): no diagnostic at all, or at least one error for a block marked ```` ```brew invalid ````. It also checks that `reference/vocabulary.md` names every brewer, action, alias, grind size, qualifier and unit of the language.
- The spec follows the lexer, parser and analyzer of `../brewlang`: when the language changes, update the spec, the guide and the vocabulary here. Notion keeps the reasoning ("Décisions & questions ouvertes").

## Conventions

2-space indent, TypeScript in `tests/`. Commit messages are in English, Conventional Commits style (`feat: …`, `docs: …`), like the playground.
