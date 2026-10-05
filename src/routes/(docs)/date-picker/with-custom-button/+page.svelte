<script>
  import { DatePicker } from '#lib'
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'

  dayjs.extend(relativeTime)

  let customSelected = null
</script>

<h3>With Custom Button</h3>
<div class="demo">
  <DatePicker
    bind:selected={customSelected}>
    <button class="custom-button">
      {#if customSelected}
        Beach Time! {dayjs(customSelected).fromNow()}
      {:else}
        Beach Time?
      {/if}
    </button>
  </DatePicker>
</div>
<p>* Beach Time <a href="https://codepen.io/merkund">by merkund</a></p>
