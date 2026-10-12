// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { PANEL, addBrewColors } from "./brew-theme.mjs";

// The .brew grammar, for the ```brew blocks of the docs
const brew = JSON.parse(readFileSync(new URL("./brew.tmLanguage.json", import.meta.url), "utf8"));

export default defineConfig({
  site: "https://brewlang.github.io",
  // llms.txt is read from the brewlang repo next to this one
  vite: { server: { fs: { allow: [".."] } } },
  integrations: [
    // Starlight only serves the docs, under /doc; every other page in src/pages is free of it
    starlight({
      title: "Brewlang",
      description: "A plain-text markup language for coffee brewing recipes.",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/brewlang/brewlang" }],
      // Cloudflare Web Analytics: cookieless visit counts; the playground uses the same token
      // The home page's look: its fonts, then its colors in custom.css
      customCss: ["./src/styles/custom.css"],
      head: [
        { tag: "link", attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" } },
        { tag: "link", attrs: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true } },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&display=swap",
          },
        },
        {
          tag: "script",
          attrs: {
            type: "module",
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": '{"token": "bead6919586742c4abb3fe181d4c1385"}',
          },
        },
      ],
      editLink: { baseUrl: "https://github.com/brewlang/brewlang.github.io/edit/main/" },
      expressiveCode: {
        shiki: { langs: [brew] },
        customizeTheme: addBrewColors,
        // Code blocks as the home page's code panels
        styleOverrides: {
          codeBackground: ({ theme }) => PANEL[theme.type === "dark" ? "dark" : "light"].background,
          borderColor: ({ theme }) => PANEL[theme.type === "dark" ? "dark" : "light"].border,
          borderRadius: "12px",
          codeFontFamily: "var(--sl-font-mono)",
          uiFontFamily: "var(--sl-font)",
        },
      },
      sidebar: [
        { label: "Overview", link: "/doc/" },
        {
          label: "Guide",
          items: [
            { label: "Getting started", slug: "doc/guide/getting-started" },
            { label: "Writing recipes", slug: "doc/guide/writing-recipes" },
          ],
        },
        { label: "Reference", items: [{ label: "Vocabulary", slug: "doc/reference/vocabulary" }] },
        {
          label: "Integrate",
          items: [
            { label: "JavaScript library", slug: "doc/integrate/library" },
            { label: "Recipe cards", slug: "doc/integrate/render" },
            { label: "CLI", slug: "doc/integrate/cli" },
            { label: "JSON output", slug: "doc/integrate/json" },
          ],
        },
        { label: "Specification", items: [{ label: "Brewlang v0", slug: "doc/spec/v0" }] },
        { label: "Playground", link: "https://brewlang.github.io/playground/", attrs: { target: "_blank" } },
      ],
    }),
  ],
});
