// The home page's .brew colors (src/home/home.css, its --c-* variables, light and dark), added to
// Starlight's code themes, so a recipe looks the same in the docs as on the home page

const COLORS = {
  light: {
    punct: "#a39c90",
    fmkey: "#7a7064",
    fmval: "#8a5a12",
    brewer: "#a5242e",
    amount: "#17795e",
    temp: "#17795e",
    time: "#9a6100",
    dur: "#3f8c77",
    qual: "#3d6584",
    action: "#6b3fc4",
    kw: "#b4471b",
    comment: "#7d7366",
  },
  dark: {
    punct: "#6e665b",
    fmkey: "#9c9282",
    fmval: "#e9d5a8",
    brewer: "#dd5862",
    amount: "#8fd8c0",
    temp: "#8fd8c0",
    time: "#f5c451",
    dur: "#6fb8a3",
    qual: "#a9c3dd",
    action: "#c9a8ff",
    kw: "#ff9c73",
    comment: "#847a6d",
  },
};

/** The code blocks' background and border, the home page's code panels. */
export const PANEL = {
  light: { background: "#ece8e0", border: "#dcd6ca" },
  dark: { background: "#0b0a08", border: "#2b2620" },
};

/// Token colors for the scopes of brew.tmLanguage.json, like the home page's .tok-* classes
const settings = (c) => [
  { scope: "punctuation.definition.frontmatter.brew", settings: { foreground: c.punct } },
  { scope: "entity.name.tag.frontmatter.brew", settings: { foreground: c.fmkey } },
  { scope: "string.unquoted.frontmatter.brew", settings: { foreground: c.fmval } },
  { scope: "entity.name.class.brewer.brew", settings: { foreground: c.brewer, fontStyle: "bold" } },
  { scope: "constant.numeric.amount.brew", settings: { foreground: c.amount } },
  { scope: "constant.numeric.temperature.brew", settings: { foreground: c.temp } },
  { scope: "constant.numeric.time.brew", settings: { foreground: c.time } },
  { scope: "constant.numeric.duration.brew", settings: { foreground: c.dur } },
  { scope: ["support.constant.qualifier.brew", "support.constant.grind.brew"], settings: { foreground: c.qual } },
  { scope: "entity.name.function.action.brew", settings: { foreground: c.action } },
  { scope: "keyword.control.brew", settings: { foreground: c.kw, fontStyle: "bold" } },
  { scope: "comment.line.double-dash.brew", settings: { foreground: c.comment, fontStyle: "italic" } },
];

/** Adds the .brew colors to an Expressive Code theme, in its light or dark variant. */
export function addBrewColors(theme) {
  theme.settings.push(...settings(COLORS[theme.type === "dark" ? "dark" : "light"]));
  return theme;
}
