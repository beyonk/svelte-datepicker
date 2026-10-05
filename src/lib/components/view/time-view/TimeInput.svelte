<div class="time-picker" class:is-night={!$isDaytime}>
  <div class="controls">
    <Chevron up={true} on:click={() => increment('hour')} />
    <Chevron up={true} on:click={() => increment('minute')} />
  </div>
  <input type="text" use:timeInput={timeStore} />
  <div class="controls">
    <Chevron up={false} on:click={() => decrement('hour')} />
    <Chevron up={false} on:click={() => decrement('minute')} />
  </div>
</div>

<script>
  import { contextKey } from '../../lib/context.js'
  import { onMount, getContext } from 'svelte'
  import Chevron from './Chevron.svelte'
  import { timeInput } from './time-input.js'
  import { createStore } from './time-store.js'

  export let viewContextKey

  const { config } = getContext(contextKey)
  const { date, isDaytime } = getContext(viewContextKey)
  const { increment, decrement, time: timeStore } = createStore($date, config)

  onMount(() => timeStore.subscribe(ts => {
    const [ d, m ] = ts.split(':').map(g => parseInt(g))
    date.update(v => v.hour(d).minute(m))
  }))
</script>

<style>
  .time-picker {
    display: flex;
    flex-direction: column;
    color: var(--highlight-color);
    width: 80%;
  }

  @media (min-width: 600px) {
    .time-picker {
      width: 60%;
    }
  }

  .time-picker.is-night {
    color: var(--time-night-mode-text-color);
  }

  .time-picker.is-night input {
    color: var(--time-night-mode-text-color);
  }

  input {
    background-color: transparent;
    display: flex;
    border-width: 0 0 1px 0;
    border-color: inherit;
    font-family: inherit;
    font-size: 42px;
    line-height: 42px;
    text-align: center;
    letter-spacing: 16px;
    color: var(--time-input-text-color);
  }

  .controls {
    display: flex;
    justify-content: space-around;
    color: var(--highlight-color);
  }
</style>
