import { writable } from 'svelte/store'
import { dayjs } from '../../lib/date-utils.js'

function format (h, m) {
  return [
    String(h).padStart(2, '0'),
    String(m).padStart(2, '0')
  ].join(':')
}

function createStore (date, config) {
  const time = writable(dayjs(date).format('HH:mm'))

  function increment (segment) {
    time.update(t => {
      let [ h, m ] = t.split(':')
      if (segment === 'hour' && h < 23) { ++h }
      if (segment === 'minute' && m < 59) {
        m = Math.min(59, parseInt(m) + config.minuteStep)
      }
      return format(h, m)
    })
  }

  function decrement (segment) {
    time.update(t => {
      let [ h, m ] = t.split(':')
      if (segment === 'hour' && h > 0) { --h }
      if (segment === 'minute' && m > 0) {
        m = Math.max(0, parseInt(m) - config.minuteStep)
      }
      return format(h, m)
    })
  }

  function set (t) {
    time.set(t)
  }
  return {
    increment,
    decrement,
    time,
    set
  }
}

export {
  createStore
}
