<script>
  import { onMount } from 'svelte'
  import DatePickerInner from './DatePicker.svelte'
  import { setLoadingCursor } from './lib/context'

  let ready = false

  onMount(async () => {
    await setLoadingCursor()
    ready = true
  })
</script>

{#if ready}
  {#if $$slots.default}
    <DatePickerInner {...$$restProps}
      on:open
      on:range-selected
      on:date-selected
      on:change
      on:close
      let:selectedStart
      let:selectedEnd
    >
      <slot {selectedStart} {selectedEnd} />
      <div slot="beforeContents" let:selectedStart let:selectedEnd>
       <slot name="beforeContents" {selectedStart} {selectedEnd} />
      </div>
    </DatePickerInner>
  {:else}
    <DatePickerInner {...$$restProps}
      on:open
      on:range-selected
      on:date-selected
      on:change
      on:close
    />
  {/if}
{/if}
