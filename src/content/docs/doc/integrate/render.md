---
title: Recipe cards
description: Show any Brewlang recipe as a card with the <brew-recipe> element or as an HTML string.
---

`@brewlang/render` turns a recipe into a card a reader can brew from: title, specs, ratio, preparation, steps and target. It renders HTML, nothing else, so it works in any page, framework or static site.

> The package is not on npm yet: build it from the [repository](https://github.com/brewlang/brewlang).

## In a page: `<brew-recipe>`

```html
<link rel="stylesheet" href="brew.css" />
<script type="module">
  import "@brewlang/render/element";
</script>

<brew-recipe src="chemex.brew"></brew-recipe>

<brew-recipe weight="oz" temp="F" scale="2">
@V60 15g 250g 94°C
0:00 50g bloom
0:45 250g
</brew-recipe>
```

| Attribute | Effect |
|---|---|
| `src` | Load the recipe from a URL; without it, the element's text is the recipe |
| `scale` | Multiply every amount: `2` doubles the recipe |
| `weight` | Show the dose and the water in `g` or `oz`; water written as a volume shows in `ml` or `fl oz` |
| `temp` | Show the temperatures in `°C` or `°F` (`C` and `F` work too) |
| `heading` | The title when the recipe's metadata has none |
| `theme` | `light` or `dark` |

The card is rendered in the page, not in a shadow root, so your CSS reaches it. The element gets an `invalid` attribute when the recipe has errors, and fires `brew-render` with the diagnostics in `event.detail`.

## As HTML: `render()`

```ts
import { render } from "@brewlang/render";

const { html, diagnostics, notes } = render(source, { factor: 1.5, weight: "oz", temp: "°F" });
```

`html` is the card, with every text escaped. Scaling and units only change what the card shows, and need a recipe without errors. With errors, the card shows the recipe as parsed and `diagnostics` says why. `notes` holds what scaling and converting reported.

| Function | What it does |
|---|---|
| `render(source, options)` | Check, scale, convert, then the card: the usual way |
| `describe(recipe, { title, written })` | A recipe → the card's content in words |
| `toHtml(model, { signed, theme })` | That content → HTML; `signed` adds "Brewlang" at the bottom, for an image to share |
| `brewerKind(name)` | `'V60'` → `'Pour-over'` |

## Styling

`brew.css` styles every class, and they all start with `brew-`. Restyle the card through its variables, on `.brew-card` or any parent:

```css
.brew-card {
  --brew-bg: white;
  --brew-ink: #222;
  --brew-accent: #b5542e;
  --brew-font-display: Georgia, serif;
  --brew-radius: 12px;
}
```

| Variable | Used for |
|---|---|
| `--brew-bg`, `--brew-ink`, `--brew-muted`, `--brew-faint` | Background and text |
| `--brew-rule`, `--brew-rule-soft`, `--brew-soft` | Lines and the "Before you start" box |
| `--brew-accent` | The brewer line, the ratio and the water bars |
| `--brew-qual`, `--brew-qual-line` | The `bloom`, `spiral`… chips |
| `--brew-font-display`, `--brew-font-body`, `--brew-font-mono` | Fonts |
| `--brew-radius` | Corners |

`data-theme="dark"` on the card switches to the dark palette. The card adapts to its own width, not the window's. Class names and variables are a public contract: they change only with a new version.
