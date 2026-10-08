// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

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
      editLink: { baseUrl: "https://github.com/brewlang/brewlang.github.io/edit/main/" },
      expressiveCode: { shiki: { langs: [brew] } },
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
