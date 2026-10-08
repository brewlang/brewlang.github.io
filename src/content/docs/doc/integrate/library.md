---
title: JavaScript library
description: Check, format, scale, convert and export Brewlang recipes from TypeScript or JavaScript.
---

The `brewlang` package is the reference implementation: a lexer, a parser, a checker, a formatter, scaling, unit conversion and JSON output. It is written in TypeScript, runs in the browser and in Node, and has no runtime dependencies.

> Brewlang is at v0 and the package is not on npm yet. Until it is, build it from the [repository](https://github.com/brewlang/brewlang).

## Check a recipe

```ts
import { check } from "brewlang";

const { recipe, diagnostics } = check(source);

for (const d of diagnostics) {
  console.log(`${d.line}:${d.column} ${d.severity}: ${d.message}`);
}
```

`check` is the main entry point. It parses the source, runs the semantic checks when there is no syntax error, and returns the recipe with every diagnostic, in file order.

Nothing throws. A diagnostic is `{ severity, message, line, column }`, with 1-based positions, and `severity` is one of:

- `error`: the recipe is invalid.
- `warning`: probably a mistake.
- `suggestion`: a possible improvement.

Every message says what to do, so you can show it to the reader as is.

## Use a valid recipe

`format`, `scale`, `convert` and `toJson` expect a recipe without errors:

```ts
import { check, format, scaleToDose, convert, toJson } from "brewlang";

const { recipe, diagnostics } = check(source);
if (diagnostics.some((d) => d.severity === "error")) throw new Error("Invalid recipe");

format(recipe);                                       // canonical .brew text
scaleToDose(recipe, { value: 25, unit: "g" }).recipe; // for a 25 g dose
convert(recipe, { dose: "oz", temp: "°F" }).recipe;   // in ounces and Fahrenheit
toJson(recipe).json;                                  // plain data
```

## Functions

| Function | What it does |
|---|---|
| `check(source)` | Parse and check: the recipe and every diagnostic, in file order |
| `parse(source)` | Syntax only: the `Recipe` and the syntax errors |
| `analyze(recipe)` | The semantic checks of a parsed recipe |
| `lex(source)` | The tokens, for syntax highlighting |
| `format(recipe)` | The canonical `.brew` text; never changes the meaning |
| `scale(recipe, factor)` | Every amount multiplied by `factor` |
| `scaleToDose(recipe, { value, unit })` | Scaled to a new dose |
| `scaleToWater(recipe, { value, unit })` | Scaled to a new total water |
| `convert(recipe, { dose, water, temp })` | The same recipe in other units |
| `toJson(recipe)` | The recipe as [JSON](/doc/integrate/json/) |

The vocabulary is exported too, for editors and forms: `BREWERS`, `ACTIONS`, `ACTION_ALIASES`, `GRIND_SIZES`, `QUALIFIERS`, `DOSE_UNITS`, `WATER_UNITS`, `TEMP_UNITS`, plus `findBrewer` and `findAction`.

## Scaling

Scaling multiplies the dose, the header water and every pour. Times, durations, temperatures and the grind stay as written, with a warning: a bigger batch drains slower, so it needs a coarser grind and ends later.

Amounts are rounded the way a scale shows them: 1 g or 1 ml, 0.1 oz or 0.1 floz. Added pours (`+60g`) are computed from the rounded running total, so they still add up to the scaled total.

## Units

`convert` rewrites a recipe in the reader's units: dose in `g` or `oz`, water within weights (`g`, `oz`) or within volumes (`ml`, `floz`), temperatures in `°C` or `°F`. Weights never become volumes. Amounts are rounded like scaling, temperatures to 1 degree.
