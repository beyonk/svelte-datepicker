import { dayjs } from './date-utils.js'

function buildDaySelectionValidator (start, end, selectableCallback) {
  return date => {
    const isInRange = date.isSameOrAfter(start, 'day') && date.isSameOrBefore(end, 'day')
    return {
      isInRange,
      selectable: isInRange && (!selectableCallback || selectableCallback(date.toDate())),
      isToday: date.isSame(dayjs(), 'day')
    }
  }
}

export {
  buildDaySelectionValidator
}
