<script>
  import { DatePicker } from '#lib'

  let firedEvents = []
  let firedEventsValue = null
</script>

<h2>With Events</h2>
<div class="demo">
  <DatePicker
    format='ddd, DD MMM YYYY'
    bind:selected={firedEventsValue}
    on:date-selected={e => {
      firedEvents = [
        ...firedEvents,
        `Picked date ${e.detail.date} (${firedEventsValue})`
      ]
    }}
    on:change={e => {
      firedEvents = [
        ...firedEvents,
        'Change fired'
      ]
    }}
  />
</div>
<ul>
  {#each firedEvents as fired}
  <li>{fired}</li>
  {:else}
  <li>Pick date to see events</li>
  {/each}
</ul>
