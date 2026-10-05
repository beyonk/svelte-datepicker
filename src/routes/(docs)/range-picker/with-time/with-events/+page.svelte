<script>
  import { DatePicker } from '#lib'

  let firedEvents = []
</script>

<h2>With Events</h2>
<div class="demo">
  <DatePicker
  format='ddd, DD MMM YYYY'
  range={true}
  time={true}
  on:range-selected={e => {
    firedEvents = [
      ...firedEvents,
      `Picked range ${e.detail.from} to ${e.detail.to}`
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
