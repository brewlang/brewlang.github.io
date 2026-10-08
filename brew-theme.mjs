// The playground's .brew colors (its --syn-* variables, light and dark), added to Starlight's code themes,
// so a recipe looks the same in the docs as in the editor

/// oklch(l c h) -> '#rrggbb'
function oklch(l, c, h) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  const srgb = linear.map((x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055));
  return `#${srgb.map((x) => Math.round(Math.min(1, Math.max(0, x)) * 255).toString(16).padStart(2, "0")).join("")}`;
}

const COLORS = {
  light: {
    punct: oklch(0.62, 0.012, 70),
    fmkey: oklch(0.5, 0.012, 60),
    fmval: oklch(0.36, 0.012, 60),
    brewer: oklch(0.56, 0.15, 38),
    temp: oklch(0.52, 0.12, 70),
    time: oklch(0.47, 0.11, 250),
    dur: oklch(0.5, 0.012, 60),
    qual: oklch(0.45, 0.1, 155),
    action: oklch(0.47, 0.13, 320),
    comment: oklch(0.55, 0.012, 70),
  },
  dark: {
    punct: oklch(0.55, 0, 0),
    fmkey: oklch(0.66, 0, 0),
    fmval: oklch(0.82, 0, 0),
    brewer: oklch(0.76, 0.13, 45),
    temp: oklch(0.82, 0.11, 80),
    time: oklch(0.78, 0.09, 250),
    dur: oklch(0.7, 0, 0),
    qual: oklch(0.8, 0.1, 155),
    action: oklch(0.78, 0.11, 320),
    comment: oklch(0.62, 0, 0),
  },
};

/// Token colors for the scopes of brew.tmLanguage.json, like the playground's .tok-* classes
const settings = (c, ink) => [
  { scope: "punctuation.definition.frontmatter.brew", settings: { foreground: c.punct } },
  { scope: "entity.name.tag.frontmatter.brew", settings: { foreground: c.fmkey } },
  { scope: "string.unquoted.frontmatter.brew", settings: { foreground: c.fmval } },
  { scope: "entity.name.class.brewer.brew", settings: { foreground: c.brewer, fontStyle: "bold" } },
  { scope: "constant.numeric.amount.brew", settings: { foreground: ink, fontStyle: "bold" } },
  { scope: "constant.numeric.temperature.brew", settings: { foreground: c.temp } },
  { scope: "constant.numeric.time.brew", settings: { foreground: c.time } },
  { scope: "constant.numeric.duration.brew", settings: { foreground: c.dur } },
  { scope: ["support.constant.qualifier.brew", "support.constant.grind.brew"], settings: { foreground: c.qual } },
  { scope: "entity.name.function.action.brew", settings: { foreground: c.action } },
  { scope: "keyword.control.brew", settings: { foreground: ink } },
  { scope: "comment.line.double-dash.brew", settings: { foreground: c.comment, fontStyle: "italic" } },
];

/** Adds the .brew colors to an Expressive Code theme, in its light or dark variant. */
export function addBrewColors(theme) {
  theme.settings.push(...settings(COLORS[theme.type === "dark" ? "dark" : "light"], theme.fg));
  return theme;
}
