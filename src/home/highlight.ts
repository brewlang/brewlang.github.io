import type { Diagnostic, Token } from "brewlang";
import { GRIND_SIZES, QUALIFIERS, lex } from "brewlang";

// The home page colors code with brewlang's own lexer, like the playground: tokens written
// without a space between them ('150g', '~15s', '90-93°C') form one word, colored by its role

/// Escape text for HTML: the editor shows what the reader types
const escape = (text: string) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/// The role of a word from its tokens: '150g' is an amount, '90°C' a temperature, '~15s' a duration
function role(word: Token[]): string | undefined {
  const [first] = word;
  if (!first) return undefined;
  if (word.some((t) => t.kind === "ERROR")) return undefined;

  switch (first.kind) {
    case "BREWER":
      return "brewer";
    case "ACTION":
      return "action";
    case "TIME":
      return "time";
    case "TILDE":
      return "dur";
    case "COMMENT":
      return "comment";
    case "PLUS":
    case "NUMBER":
      return word.some((t) => t.kind === "UNIT" && t.text.startsWith("°")) ? "temp" : "amount";
    case "WORD":
      if (first.text === "grind" || first.text === "target") return "kw";
      if ((QUALIFIERS as readonly string[]).includes(first.text)) return "qual";
      if ((GRIND_SIZES as readonly string[]).includes(first.text)) return "grind";
      return undefined;
    default:
      return undefined;
  }
}

/** Colors a source line by line: one HTML string per line, words in `<span class="tok-…">`.
 *  An error diagnostic underlines the word it points at. */
export function highlight(source: string, diagnostics: Diagnostic[] = []): string[] {
  const lines = source.split("\n");
  // One role per character, line by line
  const roles: (string | undefined)[][] = lines.map((line) => new Array<string | undefined>(line.length));
  const paint = (line: number, from: number, to: number, name: string) => {
    const row = roles[line - 1];
    if (!row) return;
    for (let i = Math.max(0, from); i < Math.min(row.length, to); i++) row[i] = name;
  };

  const tokens = lex(source).tokens.filter((t) => t.text && t.kind !== "NEWLINE" && t.kind !== "EOF");
  let i = 0;
  while (i < tokens.length) {
    const first = tokens[i]!;

    // The metadata block: '---' lines, then 'key: value'
    if (first.kind === "FRONTMATTER") {
      first.text.split("\n").forEach((text, n) => {
        const line = first.line + n;
        const key = /^([\w-]+)(:)/.exec(text);
        if (/^---\s*$/.test(text)) paint(line, 0, 3, "punct");
        else if (key) {
          paint(line, 0, key[1]!.length, "fmkey");
          paint(line, key[0].length, text.length, "fmval");
        } else paint(line, 0, text.length, "fmval");
      });
      i++;
      continue;
    }

    // A word: the tokens that follow each other on the line without a gap, a comment always alone
    const word = [first];
    let end = first.column - 1 + first.text.length;
    while (first.kind !== "COMMENT" && i + word.length < tokens.length) {
      const next = tokens[i + word.length]!;
      if (next.kind === "COMMENT" || next.line !== first.line || next.column - 1 !== end) break;
      word.push(next);
      end += next.text.length;
    }
    const name = role(word);
    if (name) paint(first.line, first.column - 1, end, name);
    i += word.length;
  }

  // The words errors point at, up to the next space
  const wrong = new Set<string>();
  for (const d of diagnostics) {
    if (d.severity !== "error") continue;
    const text = lines[d.line - 1] ?? "";
    let to = d.column - 1;
    while (to < text.length && text[to] !== " ") to++;
    for (let c = d.column - 1; c < Math.max(to, d.column); c++) wrong.add(`${d.line}:${c}`);
  }

  return lines.map((text, l) => {
    let html = "";
    let c = 0;
    while (c < text.length) {
      const name = roles[l]![c];
      const err = wrong.has(`${l + 1}:${c}`);
      let to = c + 1;
      while (to < text.length && roles[l]![to] === name && wrong.has(`${l + 1}:${to}`) === err) to++;
      const classes = [name ? `tok-${name}` : "", err ? "tok-error" : ""].filter(Boolean).join(" ");
      const part = escape(text.slice(c, to));
      html += classes ? `<span class="${classes}">${part}</span>` : part;
      c = to;
    }
    return html;
  });
}
