<div>
  <NavBar {viewContextKey} />
  <Month
    {viewContextKey}
    id={visibleMonthsId}
    on:chosen={e => registerSelection(e.detail.date)} />
</div>

<style>
  div {
    padding: 10px;
  }
</style>

<script>
  import Month from './Month.svelte'
  import NavBar from './NavBar.svelte'
  import { checkIfVisibleDateIsSelectable, shakeDate } from './feedback.js'
  import { contextKey } from '../../lib/context.js'
  import { getContext, createEventDispatcher } from 'svelte'

  export let viewContextKey

  const dispatch = createEventDispatcher()
  const { displayedDate } = getContext(viewContextKey)
  const { months, shouldShakeDate } = getContext(contextKey)

  $: visibleMonthsId = $displayedDate.unix()

  function registerSelection (chosen) {
    if (!checkIfVisibleDateIsSelectable(months, chosen)) {
      return shakeDate(shouldShakeDate, chosen)
    }

    dispatch('chosen', { date: chosen })
    return true
  }
</script>
