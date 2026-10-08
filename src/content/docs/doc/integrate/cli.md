---
title: CLI
description: Check, format, scale and export .brew files from the command line.
---

The `brewlang` package ships a small command-line tool.

```sh
brewlang check recipe.brew...            # report errors, warnings and suggestions
brewlang fmt recipe.brew...              # rewrite files in their canonical form
brewlang fmt --check recipe.brew...      # only report the files that are not formatted
brewlang scale --dose 25g recipe.brew    # print the recipe scaled to a new dose
brewlang scale --water 400g recipe.brew  # ... or to a new total water
brewlang json recipe.brew                # print the recipe as JSON
```

Diagnostics use the `file:line:column` format that editors and terminals turn into links:

```
bad.brew:1:10: error: The header announces 250g but the pours end at 100g. Make them match
bad.brew:4:1: warning: Unknown action '/swril'. Did you mean '/swirl'?
```

**Exit codes:** 0 when everything is fine, 1 when a file has errors or is not formatted, 2 for bad usage. Only errors fail `check`: warnings and suggestions are printed but do not change the exit code, so `brewlang check` and `brewlang fmt --check` fit in a CI job.

`scale` and `json` print their result on stdout and their diagnostics on stderr, so the result can be piped into a file. They never change the source file.
