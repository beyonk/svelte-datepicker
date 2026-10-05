import { dayjs } from './date-utils.js'
import { ensureFutureMonth } from './date-manipulation.js'
import { buildDaySelectionValidator } from './day-selection-validator.js'
import { getCalendarPage } from './calendar-page.js'

function getMonths (config) {
  const { start, end, selectableCallback } = config
  const firstMonth = start.startOf('month').startOf('day')
  const lastMonth = ensureFutureMonth(firstMonth, end.startOf('month').startOf('day'))

  const months = []
  const validator = buildDaySelectionValidator(start, end, selectableCallback)
  let date = dayjs(firstMonth)
  while (date.isSameOrBefore(lastMonth)) {
    months.push(getCalendarPage(date, validator))
    date = date.add(1, 'month')
  }
  return months
}

export {
  getMonths
}
