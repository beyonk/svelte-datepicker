import recommended from '@beyonk/eslint-config/recommended'
import svelte from '@beyonk/eslint-config/svelte'

export default [
  ...recommended,
  ...svelte({}),
  {
    files: [ '**/*.svelte' ],
    rules: {
      'no-use-before-define': 'off'
    }
  },
  {
    files: [ 'src/lib/components/Popover.svelte' ],
    rules: {
      'svelte/no-dom-manipulating': 'off'
    }
  },
  {
    ignores: [
      '.svelte-kit',
      'dist'
    ]
  }
]
