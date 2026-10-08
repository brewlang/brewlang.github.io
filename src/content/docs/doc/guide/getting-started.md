---
title: Getting started
description: Write your first coffee recipe in Brewlang in five minutes.
---

Brewlang is a way to write coffee recipes as plain text, the way you would note them in a notebook. A tool can then check them, scale them to your dose, convert their units and show them as a recipe card.

You don't need to install anything: open the [playground](https://brewlang.github.io/playground/) and type along.

## Your first recipe

```brew
@V60 15g 250g 94°C
grind medium-fine

/rinse
0:00 50g bloom
0:45 150g spiral
1:30 250g spiral

target 3:00
```

Read it line by line:

1. **`@V60 15g 250g 94°C`** is the header: the brewer, the coffee dose, the total water and the water temperature. Only the brewer and the dose are required.
2. **`grind medium-fine`** sets the grind for the whole recipe.
3. **`/rinse`** is an action. Without a time, it is done before you start the timer: it is a preparation.
4. **`0:00 50g bloom`** means: at 0:00, pour until the scale shows 50 g. It is the bloom.
5. **`0:45 150g spiral`** means: at 0:45, pour in a spiral until the scale shows 150 g. Amounts are always what the scale shows, not what you add.
6. **`target 3:00`** is when the brew should be done.

## Add details when you need them

```brew
---
title: My morning V60
filter: paper
---

@V60 15g 250g 94°C
grind medium-fine

/rinse
0:00 50g ~10s bloom center -- wet all the grounds
0:45 150g ~15s spiral
90°C
1:30 250g ~20s center
2:00 /swirl

target 3:00
```

- The block between `---` lines holds the title and anything else you want to note.
- **`~10s`** says how long the pour lasts.
- **`90°C`** alone on a line lowers the temperature for every following step.
- **`--`** starts a comment, until the end of the line.

## No timer? No problem

Times are optional. Without them, steps follow each other at your pace:

```brew
@FrenchPress 30g 500g 95°C
grind coarse

500g
/stir
/wait ~4m
/press ~30s
```

## When something is wrong

The playground underlines mistakes and says how to fix them:

```brew invalid
@V60 15g 94°C
0:00 50g bloom
0:45 40g
```

> The scale is already at 50g: pour to a higher total, or add water with '+'

Messages come in three levels: an **error** makes the recipe invalid, a **warning** is probably a mistake, and a **suggestion** is a possible improvement.

## Next

- [Writing recipes](/doc/guide/writing-recipes/) covers every part of a recipe.
- The [vocabulary](/doc/reference/vocabulary/) lists the brewers, actions, grind sizes and units.
- The playground's Examples menu holds real recipes from baristas and roasters.
