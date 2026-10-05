<a href="https://beyonk.com">
    <br />
    <br />
    <img src="https://user-images.githubusercontent.com/218949/144224348-1b3a20d5-d68e-4a7a-b6ac-6946f19f4a86.png" width="198" />
    <br />
    <br />
</a>

## Svelte Datepicker

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![svelte-v5](https://img.shields.io/badge/svelte-v5-blueviolet.svg)](https://svelte.dev) ![publish](https://github.com/beyonk/svelte-datepicker/workflows/publish/badge.svg)

This is a near total rewrite of the excellent [Svelte Calendar](https://github.com/6eDesign/svelte-calendar). It provides:

* Calendar
* Date Picker
* Date Range Picker
* Time Selection
* Better Responsiveness
* Improved theming
* Context-aware theming
* Toolbar to avoid awkward bindings
* Works in tough situations such as inside iframes

Roadmap:

* Re-introduce Keyboard Support
* Add code-samples to docs
* Add legend for keyboard shortcuts [h for Help]

## Svelte Kit Support

Due to the way dayjs is packaged, the following configuration is required in `vite.config.js` to get this working with SvelteKit:

```js
export default defineConfig({
  plugins: [ sveltekit() ],
  ssr: {
    noExternal: [ 'dayjs' ]
  }
})
```

## Usage

* See [The Documentation](https://svelte-datepicker.vercel.app) which is a work in progress.
* See [Small Svelte REPL](https://svelte.dev/repl/d812e880c6934f9e9a7cf9f760eddc11?version=3.31.2) for a minimum working verison.

## Contributing

### Tests

Tests written in [vitest](https://vitest.dev)

```bash
pnpm test
```
