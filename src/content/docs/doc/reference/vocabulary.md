---
title: Vocabulary
description: The brewers, actions, grind sizes, pour qualifiers and units Brewlang knows.
---

## Brewers

One entry per brewing method, not per product: a V60 is a V60, whatever its material. Names are matched ignoring case. Any other name is accepted, and its actions are not checked.

| Brewer | Type | Starting state |
|---|---|---|
| `@V60` | Dripper | |
| `@Kalita` | Dripper | |
| `@Melitta` | Dripper | |
| `@Chemex` | Dripper | |
| `@Origami` | Dripper | |
| `@UFO` | Dripper | |
| `@Phin` | Dripper | |
| `@Switch` | Valve | Open |
| `@Clever` | Valve | Closed: it opens when set on the cup |
| `@Pulsar` | Valve | Open |
| `@AeroPress` | AeroPress | Upright |
| `@FrenchPress` | Press | |
| `@Siphon` | Siphon | |

## Actions

Actions are open: any `/name` is accepted. These are the core ones, checked against the brewer's type. A name one or two letters away from one of them gets a warning.

| Action | Gesture | Brewers |
|---|---|---|
| `/swirl` | Swirl the brewer | All |
| `/stir` | Stir with a spoon | All |
| `/skim` | Remove the foam and the fines floating on top | All |
| `/wait` | Wait: for a duration (`/wait ~45s`), or until it is ready | All |
| `/rinse` | Rinse the filter | All |
| `/level-bed` | Level the coffee bed | All |
| `/add-coffee` | Put the ground coffee in, when it does not go in first | All |
| `/press` | Press the plunger; also written `/plunge` | AeroPress, Press |
| `/invert` | Turn the AeroPress upside down, for an inverted recipe | AeroPress |
| `/flip` | Turn the inverted AeroPress back onto the cup | AeroPress |
| `/open` | Open the valve | Valve |
| `/close` | Close the valve | Valve |
| `/drawdown` | Let the water drain through | Dripper, Valve |

## Grind sizes

From finest to coarsest: `extra-fine`, `fine`, `medium-fine`, `medium`, `medium-coarse`, `coarse`, `extra-coarse`.

## Pour qualifiers

| Qualifier | Meaning |
|---|---|
| `bloom` | The pour that wets the coffee and lets it degas |
| `spiral` | Pour in circles |
| `center` | Pour in the center |
| `pulse` | Pour in several short pulses |

`spiral`, `center` and `pulse` are techniques: a pour has at most one.

## Units

| Measure | Units |
|---|---|
| Dose | `g`, `oz` (ounce of weight) |
| Water | `g`, `ml`, `oz`, `floz` (fluid ounce, a volume) |
| Temperature | `°C`, `°F` |
| Duration | `~15s`, `~4m`, `~3:30` |
| Time | `0:45`, `12:00`: minutes, then two digits of seconds under 60 |
