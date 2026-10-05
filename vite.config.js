import adapter from '@sveltejs/adapter-auto'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [ sveltekit({ adapter: adapter() }) ],
  test: {
    include: [ 'src/**/*.spec.js' ],
    env: { TZ: 'UTC' }
  }
})
