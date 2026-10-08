---
title: Writing recipes
description: Every part of a Brewlang recipe, with examples.
---

A recipe is a `.brew` text file: optional metadata, a header line, then one step per line. Blank lines are allowed anywhere.

## Metadata

An optional block between two `---` lines, at the very top, with one `key: value` per line:

```brew
---
title: Chemex by James Hoffmann
source: https://example.com/recipe
filter: paper
---
```

Any key is accepted. Without a `title`, tools use the file name. `filter` is free text, like `paper`, `cloth` or `paper, V60 cone`.

## The header

The first line after the metadata names the brewer, then the dose, then optionally the total water and the starting temperature, in this order:

```brew
@V60 15g 250g 94°C
```

- **Brewer:** `@` followed by its name, matched ignoring case (`@aeropress` is `@AeroPress`). The [vocabulary](/doc/reference/vocabulary/#brewers) lists the known brewers; any other name is accepted, without action checks.
- **Dose:** in `g` or `oz`.
- **Total water:** when the recipe has pours, it must equal where the pours end. Without pours, it is the water to use.
- **Temperature:** in `°C` or `°F`. A range is fine: `90-93°C`.

The ratio is never written: tools compute it from the dose and the water.

## Grind

```brew
grind medium-fine
```

At most one `grind` line, right after the header. Sizes: `extra-fine`, `fine`, `medium-fine`, `medium`, `medium-coarse`, `coarse`, `extra-coarse`. They are generic on purpose, so a recipe works with any grinder; give your grinder's setting in a comment if you like.

## Pours

```brew
0:45 150g ~15s spiral
```

A pour has an optional start time, an amount, then optional details in any order: one duration and qualifiers.

- **`150g`** is the total on the scale after the pour. Each pour must go higher than the one before.
- **`+60g`** is water to add instead. Both forms can be mixed, but a recipe reads more easily with one.
- **Units:** `g`, `ml`, `oz` or `floz`, the same for every amount of water in a recipe.
- **Duration:** `~15s`, `~2m` or `~1:30`. A timed pour must end before the next timed step starts.
- **Qualifiers:** `bloom`, plus at most one technique: `spiral`, `center` or `pulse`.

A small first pour, at most three times the dose and followed by another pour, gets a suggestion to mark it `bloom`.

## Actions

```brew
2:00 /swirl
/press ~30s
```

An action is a gesture, always written with `/` and alone on its line, with an optional time and duration. Brewlang knows a core set (`/swirl`, `/stir`, `/wait`, `/press`, `/open`…, see the [vocabulary](/doc/reference/vocabulary/#actions)) and checks them against the brewer: `/open` only works on a valve brewer like `@Switch`. Any other name is accepted, so you can write `/tap-brewer`; a name one or two letters away from a known one gets a warning (`/swril`: did you mean `/swirl`?).

`/wait` alone means "wait until it is ready" (the bloom has settled, the bed is dry). With a duration, it is a timed wait: `/wait ~45s`.

## Times

`0:45` is when a step starts, counted from the start of the timer. Times never go down; steps with the same time run in the written order.

Times are optional:

- **Preparation:** steps without a time before the first timed step are done before starting the timer, in the written order: `/rinse`, `/close`, `/invert`, even the water of a siphon.
- **Step by step:** a recipe with no time at all runs at your pace. Write waits with `/wait ~4m`.
- **In between:** an untimed step after a timed one happens when you are ready.

## When the coffee goes in

Brewlang assumes the ground coffee is in the brewer from the start. When it goes in later, mark the moment with `/add-coffee`:

```brew
@Clever 18g 250g 90°C
grind medium-fine

/rinse
0:00 250g ~10s -- the water goes in first
0:10 /add-coffee ~5s
0:15 /stir ~10s
2:55 /open -- set the Clever on the cup

target 4:00
```

You can write it more than once, for coffee added in two parts; add a comment to each.

## Temperature changes

```brew
90°C
```

A temperature alone on its line, without a time, applies to every following step. A line that changes nothing, or that applies from the very start (put it in the header instead), gets a warning.

## Target

```brew
target 3:00
```

When the brew should be done. Optional, at most one, and never guessed by tools when absent. A target before the start of the last timed step gets a warning.

## Comments

`--` starts a comment, alone on its line or after a step:

```brew
0:00 50g bloom -- wet all the grounds
```

## Brewer states

Some brewers have a state that actions change, and Brewlang warns about actions that change nothing.

- **Valve brewers** start open (`@Switch`, `@Pulsar`) or closed (`@Clever`, which opens when set on the cup). A Switch recipe that starts closed begins with `/close`.
- **The AeroPress** starts upright. An inverted recipe begins with `/invert`, and uses `/flip` to turn it back onto the cup before `/press`.

```brew
@AeroPress 15g 200g 93°C
grind medium-fine

/invert
0:00 200g
1:30 /flip
1:40 /press ~30s
```

## Ranges and units

- **Ranges:** `90-93°C`, `40-50g`, when a recipe gives some leeway.
- **One unit per measure:** every water amount in the same unit, every temperature too. Spoons and cups are not units: weigh the coffee.
- **No conversion in the file:** a recipe keeps its author's units. Tools convert for the reader (g↔oz, ml↔floz, °C↔°F), never weight to volume.
