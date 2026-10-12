// What the home page shows: its recipes and the words its cards rotate. The full recipes are the
// brewlang repo's examples, read as they are, so the page always shows real, valid files
import switchHybrid from "../../../brewlang/examples/switch-hybrid.brew?raw";
import chemex from "../../../brewlang/examples/chemex-hoffmann.brew?raw";
import aeropress from "../../../brewlang/examples/aeropress-inverted-blue-bottle.brew?raw";
import frenchPress from "../../../brewlang/examples/french-press-rest.brew?raw";
import siphon from "../../../brewlang/examples/siphon-prima.brew?raw";

/** The hero's recipe: the shortest whole recipe there is. */
export const HERO = { file: "my-v60.brew", source: "---\ntitle: My V60\n---\n\n@V60 15g 250g 94°C\n50g\n150g\n250g" };

/** The recipes to pick from and edit, with what sets each apart. */
export const EXAMPLES = [
  { id: "switch", label: "Switch hybrid", sub: "two temperatures", file: "switch-hybrid.brew", source: switchHybrid.trimEnd() },
  { id: "chemex", label: "Chemex", sub: "James Hoffmann", file: "chemex-hoffmann.brew", source: chemex.trimEnd() },
  { id: "aeropress", label: "AeroPress", sub: "inverted", file: "aeropress-inverted-blue-bottle.brew", source: aeropress.trimEnd() },
  { id: "french", label: "French press", sub: "no timer", file: "french-press-rest.brew", source: frenchPress.trimEnd() },
  { id: "siphon", label: "Siphon", sub: "°F, cloth filter", file: "siphon-prima.brew", source: siphon.trimEnd() },
];

/** Lines that read like notes, each word with what it means. */
export const JOT: [text: string, role: string, label: string][][] = [
  [["0:45", "time", "when"], ["150g", "amount", "pour to"], ["spiral", "qual", "how"]],
  [["+60g", "amount", "add"], ["bloom", "qual", "how"]],
  [["2:00", "time", "when"], ["/swirl", "action", "do"]],
  [["grind", "kw", "grind"], ["medium-fine", "grind", "size"]],
  [["90°C", "temp", "water now at"]],
  [["target", "kw", "finish"], ["3:00", "time", "at"]],
];

/** Headers of different brewers: the same line, whatever the method. */
export const HEADERS: [brewer: string, rest: string, kind: string][] = [
  ["@V60", "15g 250g 94°C", "V60 · Pour-over"],
  ["@AeroPress", "15g 85°C", "AeroPress · Immersion"],
  ["@Chemex", "30g 500g 94°C", "Chemex · Pour-over"],
  ["@Switch", "20g 300g 90°C", "Switch · Hybrid"],
  ["@Siphon", "20g 300g 92°C", "Siphon · Vacuum"],
];

/** The recipe the scaling card scales. */
export const SCALED = "@V60 15g 250g 94°C\n0:00 50g\n0:45 150g\n1:30 250g";

/** The recipe the units card converts. */
export const CONVERTED = "@V60 15g 250g 94°C\n50g\n150g\n250g";

/** A recipe whose pours do not reach the header's water, for the errors card. */
export const WRONG = "@V60 15g 250g 94°C\n0:00 50g\n0:45 240g";

/** The address assistants read to learn the language. */
export const LLMS_URL = "https://brewlang.github.io/llms.txt";
