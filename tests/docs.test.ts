/// <reference types="vite/client" />
import { describe, expect, test } from "vitest";
import {
  ACTION_ALIASES,
  ACTIONS,
  BREWERS,
  DOSE_UNITS,
  GRIND_SIZES,
  QUALIFIERS,
  TEMP_UNITS,
  WATER_UNITS,
  check,
} from "brewlang";

// The docs follow the language: brewlang is the one next to this repo, so a change there shows up here

const pages = import.meta.glob<string>("../src/content/docs/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

/// A page by its path under src/content/docs/
const page = (path: string) => {
  const text = pages[`../src/content/docs/${path}`];
  if (text === undefined) throw new Error(`Missing page ${path}`);
  return text;
};

/// Every word of the language a reference page must name, in backticks
const vocabulary = [
  ...BREWERS.map((brewer) => `@${brewer.name}`),
  ...[...Object.keys(ACTIONS), ...Object.keys(ACTION_ALIASES)].map((name) => `/${name}`),
  ...GRIND_SIZES,
  ...QUALIFIERS,
  ...new Set([...DOSE_UNITS, ...WATER_UNITS, ...TEMP_UNITS]),
];

describe("the vocabulary page names every word of the language", () => {
  test.each(vocabulary)("%s", (word) => {
    expect(page("doc/reference/vocabulary.md")).toContain(`\`${word}\``);
  });
});

/// The ```brew blocks holding a whole recipe (a header line), with their info string
const recipes = Object.entries(pages).flatMap(([path, text]) =>
  [...text.matchAll(/^```brew([^\n]*)\n([\s\S]*?)^```$/gm)]
    .map(([, info = "", source = ""]) => ({ path: path.replace("../src/content/docs/", ""), info: info.trim(), source }))
    .filter(({ source }) => /^@/m.test(source))
    .map(({ path, info, source }) => [`${path}: ${source.split("\n").find((line) => line.startsWith("@"))}`, info, source] as const),
);

describe("recipes in the docs", () => {
  test("there are some", () => {
    expect(recipes.length).toBeGreaterThan(5);
  });

  test.each(recipes)("%s", (_, info, source) => {
    const diagnostics = check(source).diagnostics.map((d) => `${d.severity}: ${d.message}`);

    // A block marked 'invalid' shows an error on purpose
    if (info.includes("invalid")) expect(diagnostics.some((d) => d.startsWith("error"))).toBe(true);
    else expect(diagnostics).toEqual([]);
  });
});
