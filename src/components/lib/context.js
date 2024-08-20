import { writable } from 'svelte/store'
import { createFormatter } from './formatter.js'
import { getMonths } from './calendar.js'
import { sanitizeInitialValue } from './sanitization.js'
import { dayjs } from './date-utils.js'
import { ensureFutureMonth } from './date-manipulation.js'

const contextKey = {}

function setLoadingCursor () {
  console.log('setting up loading cursor')
  const loadingStyle = document.createElement('style')

  loadingStyle.id = 'loading-style'

  loadingStyle.innerHTML = '* { cursor: wait !important; }'

  document.head.appendChild(loadingStyle)
}

function clearLoadingCursor () {
  const loadingStyle = document.getElementById('loading-style')
  setTimeout(() => {
    console.log('removing loading cursor')
    loadingStyle.remove()
  }, 0)
}

function setup (given, config) {
  setLoadingCursor()
  const today = dayjs().startOf('day')

  const { isDateChosen, chosen: [ preSelectedStart, preSelectedEnd ] } = sanitizeInitialValue(given, config)
  const selectedStartDate = writable(preSelectedStart)
  const selectedEndDate = writable(preSelectedEnd)
  const { formatter } = createFormatter(selectedStartDate, selectedEndDate, config)
  const component = writable('date-view')

  const leftDate = preSelectedStart.subtract(
    config.isRangePicker && preSelectedStart.isSame(config.end, 'month') ? 1 : 0, 'month'
  ).startOf('month')
  const rightDate = config.isRangePicker ? ensureFutureMonth(leftDate, preSelectedEnd).startOf('month') : null

  const setupObj = {
    months: getMonths(config),
    component,
    today,
    selectedStartDate,
    selectedEndDate,
    leftCalendarDate: writable(leftDate),
    rightCalendarDate: writable(rightDate),
    config,
    shouldShakeDate: writable(false),
    isOpen: writable(false),
    isClosing: writable(false),
    highlighted: writable(today),
    formatter,
    isDateChosen: writable(isDateChosen),
    resetView: () => {
      component.set('date-view')
    },
    isSelectingFirstDate: writable(true)
  }

  clearLoadingCursor()

  return setupObj
}

export {
  contextKey,
  setup
}
