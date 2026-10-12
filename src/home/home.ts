import { render } from "@brewlang/render";
import { check, format, parse, scaleToDose } from "brewlang";
import { CONVERTED, EXAMPLES, HEADERS, HERO, JOT, LLMS_URL, SCALED } from "./content";
import { highlight } from "./highlight";

// Everything that moves on the home page. The page is complete without it: the server renders
// the final hero, the first recipe and every card; this script only animates and reacts

const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string) => [...document.querySelectorAll<T>(selector)];
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

/// Lines of code as the page shows them: a number, then the colored text
const codeLines = (lines: string[], caret = false) =>
  lines
    .map((html, i) => {
      const end = caret && i === lines.length - 1 ? `<span class="caret"></span>` : "";
      return `<div class="ln"><span class="ln-n">${i + 1}</span><span class="ln-c">${html || " "}${end}</span></div>`;
    })
    .join("");

/// Restart a fade on an element whose content just changed
function fade(el: HTMLElement) {
  el.classList.remove("fade");
  void el.offsetWidth;
  el.classList.add("fade");
}

// Theme: the same key as Starlight, so the home page and the docs share the reader's choice
for (const button of $$("[data-theme-toggle]")) {
  button.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("starlight-theme", dark ? "dark" : "light");
    } catch {}
  });
}

// The phone menu
const menuButton = $("#menu-button");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  $("#menu")!.hidden = !open;
});

// Hero: type the recipe once, the card building itself as each line completes
const heroCode = $("#hero-code");
const heroCard = $("#hero-card");
if (heroCode && heroCard && !still) {
  let n = 0;
  const step = () => {
    n = Math.min(HERO.source.length, n + 2);
    const typed = HERO.source.slice(0, n);
    heroCode.innerHTML = codeLines(highlight(typed), n < HERO.source.length);
    const result = render(typed);
    if (result.html && !result.diagnostics.some((d) => d.severity === "error")) heroCard.innerHTML = result.html;
    if (n < HERO.source.length) setTimeout(step, 30);
  };
  heroCode.innerHTML = codeLines([""], true);
  heroCard.innerHTML = `<div class="card-empty">Your recipe appears here</div>`;
  setTimeout(step, 400);
}

// Phones: the Code / Recipe tabs of the hero
for (const tab of $$("[data-tab]")) {
  tab.addEventListener("click", () => {
    $("#demo")!.dataset.view = tab.dataset.tab!;
    for (const other of $$("[data-tab]")) other.setAttribute("aria-selected", String(other === tab));
  });
}

// The two rotating cards: a note line and a brewer's header
const jot = $("#jot");
const header = $("#header-line");
if (jot && header && !still) {
  let i = 0;
  setInterval(() => {
    i++;
    jot.innerHTML = JOT[i % JOT.length]!
      .map(([text, role, label]) => `<div class="jot-part"><span class="tok-${role}">${text}</span><span class="jot-label">${label}</span></div>`)
      .join("");
    const [brewer, rest, kind] = HEADERS[i % HEADERS.length]!;
    header.innerHTML = `<span class="tok-brewer">${brewer}</span> <span class="tok-amount">${rest}</span>`;
    $("#header-kind")!.textContent = kind;
    fade(jot);
    fade(header);
  }, 3500);
}

/// Mark the pressed button of a group
const press = (group: HTMLElement[], pressed: HTMLElement) => {
  for (const b of group) b.setAttribute("aria-pressed", String(b === pressed));
};

// Scaling: brewlang scales the recipe to the dose, and formats it back
const doses = $$("[data-dose]");
const scaledRecipe = parse(SCALED).recipe;
for (const button of doses) {
  button.addEventListener("click", () => {
    press(doses, button);
    const { recipe } = scaleToDose(scaledRecipe, { value: Number(button.dataset.dose), unit: "g" });
    $("#scaled")!.innerHTML = codeLines(highlight(format(recipe).trimEnd()));
  });
}

// Units: the same recipe converted by brewlang, as the card would show it
const units = $$("[data-units]");
for (const button of units) {
  button.addEventListener("click", () => {
    press(units, button);
    const metric = button.dataset.units === "metric";
    const specs = render(CONVERTED, metric ? {} : { weight: "oz", temp: "°F" }).model?.specs ?? [];
    $$("[data-unit-value]").forEach((dd, i) => {
      dd.textContent = specs[i]?.value ?? "";
      fade(dd);
    });
  });
}

// Real recipes: pick one, edit it, the card and the problems follow
const editor = $<HTMLTextAreaElement>("#editor");
const chips = $$("[data-example]");
function refresh() {
  if (!editor) return;
  const source = editor.value;
  const { diagnostics } = check(source);
  $("#editor-code")!.innerHTML = codeLines(highlight(source, diagnostics));
  const errorLines = new Set(diagnostics.filter((d) => d.severity === "error").map((d) => d.line));
  $$("#editor-code .ln").forEach((ln, i) => ln.classList.toggle("ln-error", errorLines.has(i + 1)));
  $("#editor-card")!.innerHTML = render(source).html || `<div class="card-empty">Start with a header, like @V60 15g 250g 94°C</div>`;
  const problems = $("#problems")!;
  problems.innerHTML = diagnostics.length
    ? diagnostics
        .map((d) => `<li class="problem problem-${d.severity}"><span class="problem-pos">${d.line}:${d.column}</span><span></span></li>`)
        .join("")
    : `<li class="problem problem-ok">No problems</li>`;
  // Messages as text: they quote what the reader typed
  problems.querySelectorAll(".problem-pos + span").forEach((span, i) => (span.textContent = diagnostics[i]!.message));
}
editor?.addEventListener("input", refresh);
for (const chip of chips) {
  chip.addEventListener("click", () => {
    const example = EXAMPLES.find((e) => e.id === chip.dataset.example)!;
    press(chips, chip);
    editor!.value = example.source;
    editor!.dataset.example = example.id;
    $("#editor-file")!.textContent = example.file;
    refresh();
  });
}
$("#editor-reset")?.addEventListener("click", () => {
  const example = EXAMPLES.find((e) => e.id === editor!.dataset.example) ?? EXAMPLES[0]!;
  editor!.value = example.source;
  refresh();
});

// llms.txt: copy its address for an assistant
$("#copy-llms")?.addEventListener("click", async (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  try {
    await navigator.clipboard.writeText(LLMS_URL);
    button.textContent = "Copied";
  } catch {
    button.textContent = "Select and copy";
  }
});
