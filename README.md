# brewlang.github.io

The home page and the documentation of [Brewlang](https://github.com/brewlang/brewlang), the plain-text format for coffee recipes: [brewlang.github.io](https://brewlang.github.io).

- `/`: the home page.
- `/doc/`: the documentation (guide, vocabulary, integration, specification).
- `/llms.txt`: the format for AI assistants, taken from the brewlang repo.
- `/playground/` is served by [brewlang/playground](https://github.com/brewlang/playground).

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Development

The site reads the language from the [brewlang](https://github.com/brewlang/brewlang) repo, cloned next to this one and built:

```sh
git clone https://github.com/brewlang/brewlang ../brewlang
(cd ../brewlang && npm install && npm run build)

npm install
npm run dev     # http://localhost:4321
npm test        # the docs against the language
npm run build   # the static site in dist/
```

`npm test` checks that the vocabulary page names every brewer, action, grind size, qualifier and unit of the language, and that every whole recipe in a ```` ```brew ```` block is valid. Mark a block that shows an error on purpose with ```` ```brew invalid ````.

## License

[MIT](https://github.com/brewlang/brewlang/blob/main/LICENSE)
