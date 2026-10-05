<script>
  import { DatePicker } from '#lib'
  import dayjs from 'dayjs'
</script>

<h2>With Date Restriction</h2>
<p>Restrict date from the start of the year until today</p>
<div class="demo">
  <DatePicker
    start={dayjs().startOf('year').toDate()}
    end={dayjs().endOf('day').toDate()}
  />
</div>
