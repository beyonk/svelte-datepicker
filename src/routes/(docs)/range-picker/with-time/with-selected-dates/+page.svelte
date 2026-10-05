<script>
  import { DatePicker } from '#lib'
  import dayjs from 'dayjs'
</script>

<h3>With Selected Dates</h3>
<div class="demo">
  <DatePicker
  format='ddd, DD MMM YYYY HH:mm'
  selected={[ dayjs('2020-04-20T16:15:33.000Z').toDate(), dayjs('2020-05-20T05:23:12.000Z').toDate() ]}
  range={true}
  time={true} />
</div>
