import { describe, it, beforeAll, afterAll } from 'vitest'
import assert from 'node:assert/strict'
import { getCalendarPage } from './calendar-page.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'

describe('calendar-page/getCalendarPage', () => {
  let ctx = {}

  beforeAll(() => {
    MockDate.set('2020-04-20')
    const date = dayjs()
    ctx = {
      date,
      page: getCalendarPage(date, () => ({
        isInRange: true,
        isSelected: true,
        isToday: true
      }))
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('returns calendar page month', () => {
    assert.deepEqual(
      ctx.page.month,
      ctx.date.month()
    )
  })

  it('returns calendar page year', () => {
    assert.deepEqual(
      ctx.page.year,
      ctx.date.year()
    )
  })

  it('returns calendar page weeks', () => {
    assert.deepEqual(
      ctx.page.weeks.length,
      5
    )
  })
})
