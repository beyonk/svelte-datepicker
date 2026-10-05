<script>
  import { DatePicker } from '#lib'
  import dayjs from 'dayjs'
</script>

<h3>With Selected Date</h3>
<div class="demo">
  <DatePicker
  format='ddd, DD MMM YYYY HH:mm'
  selected={dayjs('2020-04-20T16:15:33.000Z').toDate()}
  time={true} />
</div>
