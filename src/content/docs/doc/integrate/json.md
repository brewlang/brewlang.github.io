---
title: JSON output
description: Brewlang recipes as versioned JSON, described by a JSON Schema.
---

`toJson(recipe)` and `brewlang json` give a recipe as plain data, for apps that do not want to parse `.brew` themselves. The format is versioned (`"brewlang": "0.1"`) and described by a [JSON Schema](https://github.com/brewlang/brewlang/blob/main/packages/brewlang/schema/brewlang-0.1.schema.json).

```json
{
  "brewlang": "0.1",
  "metadata": { "title": "Chemex by James Hoffmann", "filter": "paper" },
  "brewer": "Chemex",
  "coffee": { "value": 30, "unit": "gram" },
  "water": { "value": 500, "unit": "gram" },
  "water_temp": { "value": 100, "unit": "celsius" },
  "grind": { "size": "medium" },
  "steps": [
    { "kind": "action", "name": "rinse" },
    { "kind": "pour", "at_s": 0, "to_water": { "value": 80, "unit": "gram" }, "action_duration_s": 10, "bloom": true, "technique": "spiral" },
    { "kind": "target", "at_s": 250 }
  ]
}
```

- **Lossless:** everything the recipe says is kept: added pours (`add_water`), temperature changes (`"kind": "temp"`), comments, and the unit a duration was written in. Only the layout, like blank lines, is not.
- **Metadata:** the frontmatter's simple `key: value` lines, as text. Any other line is left out, with a warning.
- **Grind:** on the recipe, not among the steps.
- **Values:** units are spelled out (`gram`, `celsius`), ranges are `min` and `max`, and times are in seconds (`at_s`, `action_duration_s`).

A change to the format comes with a new version number and a new schema.
