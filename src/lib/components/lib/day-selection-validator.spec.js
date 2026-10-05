import { describe, it, beforeAll, afterAll } from 'vitest'
import assert from 'node:assert/strict'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { buildDaySelectionValidator } from './day-selection-validator.js'

describe('buildDaySelectionValidator/no-selectable-callback', () => {
  let ctx = {}

  const start = dayjs('2020-07-20')
  const end = dayjs('2020-07-24')

  beforeAll(() => {
    MockDate.set('2020-04-20')
    ctx = {
      fn: buildDaySelectionValidator(start, end)
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('returns a function', () => {
    assert.equal(typeof ctx.fn, 'function')
  })

  it('with today', () => {
    const given = dayjs('2020-04-20')
    assert.deepEqual(
      ctx.fn(given),
      {
        isInRange: false,
        selectable: false,
        isToday: true
      }
    )
  })

  it('later today', () => {
    const given = dayjs().endOf('day')
    assert.deepEqual(
      ctx.fn(given),
      {
        isInRange: false,
        selectable: false,
        isToday: true
      }
    )
  })

  it('with date before start', () => {
    assert.deepEqual(
      ctx.fn(start.subtract(1, 'day')),
      {
        isInRange: false,
        selectable: false,
        isToday: false
      }
    )
  })

  it('with first day of range', () => {
    assert.deepEqual(
      ctx.fn(start),
      {
        isInRange: true,
        selectable: true,
        isToday: false
      }
    )
  })

  it('with last day of range', () => {
    assert.deepEqual(
      ctx.fn(end),
      {
        isInRange: true,
        selectable: true,
        isToday: false
      }
    )
  })

  it('with date after end', () => {
    assert.deepEqual(
      ctx.fn(end.add(1, 'day')),
      {
        isInRange: false,
        selectable: false,
        isToday: false
      }
    )
  })
})
