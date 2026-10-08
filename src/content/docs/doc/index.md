---
title: Brewlang documentation
description: Write, check and share coffee recipes as plain text.
---

Brewlang is a plain-text format for coffee brewing recipes: pour-over, immersion and hybrid brewers. Write a recipe the way you would note it in a notebook, and get data a tool can check, scale, convert and show as a recipe card.

```brew
@Chemex 30g 500g 100°C
grind medium

/rinse
0:00 80g ~10s bloom spiral
0:45 300g ~30s spiral
1:15 500g ~30s spiral
1:45 /stir

target 4:10
```

## Where to start

| You want to | Read |
|---|---|
| Write your first recipe | [Getting started](/doc/guide/getting-started/) |
| Know every part of a recipe | [Writing recipes](/doc/guide/writing-recipes/) |
| Look up a brewer, an action or a unit | [Vocabulary](/doc/reference/vocabulary/) |
| Use Brewlang in an app or a site | [JavaScript library](/doc/integrate/library/), [Recipe cards](/doc/integrate/render/) |
| Write another implementation | [Specification](/doc/spec/v0/) |
| Let an AI assistant write recipes | [`llms.txt`](/llms.txt) |

Try everything in the [playground](https://brewlang.github.io/playground/). Brewlang is at v0: the syntax can still change.
