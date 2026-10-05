import { describe, it, beforeAll, afterAll } from 'vitest'
import assert from 'node:assert/strict'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { ensureFutureMonth } from './date-manipulation.js'

describe('ensureFutureMonth', () => {
  beforeAll(() => {
    MockDate.set('2020-04-20')
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('when same month', () => {
    const start = dayjs('2020-04-01')
    const end = dayjs('2020-04-30')
    const expected = end.add(1, 'month').month()
    assert.deepEqual(
      ensureFutureMonth(start, end).month(),
      expected
    )
  })

  it('when future month', () => {
    const start = dayjs('2020-04-30')
    const end = dayjs('2020-05-01')
    const expected = end.month()
    assert.deepEqual(
      ensureFutureMonth(start, end).month(),
      expected
    )
  })

  it('when previous month', () => {
    const start = dayjs('2020-06-01')
    const end = dayjs('2020-05-31')
    const expected = end.month()
    assert.deepEqual(
      ensureFutureMonth(start, end).month(),
      expected
    )
  })
})
