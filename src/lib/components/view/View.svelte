<div class="calendar" class:is-range-picker={config.isRangePicker} class:day={$isDaytime} class:night={!$isDaytime}>
  <svelte:component
    {viewContextKey}
    this={$component === 'date-view' ? DateView : TimeView}
    on:chosen
  />
</div>

<script>
  import { contextKey } from '../lib/context.js'
  import { getContext } from 'svelte'
  import DateView from './date-view/DateView.svelte'
  import TimeView from './time-view/TimeView.svelte'

  export let viewContextKey

  const { config, component } = getContext(contextKey)
  const { isDaytime } = getContext(viewContextKey)
</script>

<style>
  .calendar {
    box-sizing: border-box;
    position: relative;
    user-select: none;
    width: 100%;
    padding-top: 0;
    width: 340px;
    height: 345px;
  }

  /* @media (min-width: 600px) {
    .calendar {
      display: inline-block;
    }
  } */
</style>
