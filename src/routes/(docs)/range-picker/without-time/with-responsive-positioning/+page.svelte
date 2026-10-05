<script>
  import { DatePicker } from '#lib'
</script>

<p>Button is down there to the right!</p>
<div class="demo">
  <DatePicker
    range={true}
  >
    <div class="offscreen-button off-top">Open Calendar</div>
  </DatePicker>
  <DatePicker
    range={true}
  >
    <div class="offscreen-button off-bottom">Open Calendar</div>
  </DatePicker>
</div>
