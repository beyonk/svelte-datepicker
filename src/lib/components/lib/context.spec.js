import { describe, it, beforeAll, afterAll } from 'vitest'
import assert from 'node:assert/strict'
import { setup } from './context.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import { get } from 'svelte/store'

describe('setup/range-picker/defaults', () => {
  let ctx = {}

  beforeAll(() => {
    MockDate.set('2020-04-20')
    ctx = {
      config: {
        start: dayjs().subtract(1, 'year'),
        end: dayjs().add(1, 'year'),
        isRangePicker: true,
        defaultRange: [ 1, 'month' ]
      }
    }
    ctx.output = setup(undefined, ctx.config)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('has correct start date', () => {
    const selectedStartDate = get(ctx.output.selectedStartDate)
    assert.deepEqual(selectedStartDate.toDate(), dayjs('2020-04-20').toDate())
  })

  it('has correct end date', () => {
    const selectedEndDate = get(ctx.output.selectedEndDate)
    assert.deepEqual(selectedEndDate.toDate(), dayjs('2020-05-20').toDate())
  })

  it('has two years worth of months plus one extra', () => {
    assert.deepEqual(ctx.output.months.length, 25)
  })

  it('has correct view component', () => {
    const component = get(ctx.output.component)
    assert.deepEqual(component, 'date-view')
  })

  it('has today', () => {
    assert.deepEqual(ctx.output.today, dayjs().startOf('day'))
  })

  it('has correct left date', () => {
    const leftCalendarDate = get(ctx.output.leftCalendarDate)
    assert.deepEqual(leftCalendarDate.toDate(), dayjs('2020-04-01').toDate())
  })

  it('has correct right date', () => {
    const rightCalendarDate = get(ctx.output.rightCalendarDate)
    assert.deepEqual(rightCalendarDate.toDate(), dayjs('2020-05-01').toDate())
  })

  it('has passed configuration', () => {
    assert.equal(ctx.output.config, ctx.config)
  })

  it('has correct open state', () => {
    const state = get(ctx.output.isOpen)
    assert.ok(!state)
  })

  it('has correct closing state', () => {
    const state = get(ctx.output.isClosing)
    assert.ok(!state)
  })

  it('has correct highlighted day', () => {
    const highlightedDay = get(ctx.output.highlighted)
    assert.deepEqual(highlightedDay.toDate(), dayjs().toDate())
  })

  it('does not have a chosen date', () => {
    const isDateChosen = get(ctx.output.isDateChosen)
    assert.ok(!isDateChosen)
  })

  it('has correct user state', () => {
    const isSelectingFirstDate = get(ctx.output.isSelectingFirstDate)
    assert.ok(isSelectingFirstDate)
  })

  it('has reset function', () => {
    assert.equal(typeof ctx.output.resetView, 'function')
  })
})

describe('setup/date-range/selected-dates/same-month', () => {
  let ctx = {}

  beforeAll(() => {
    MockDate.set('2020-04-20')
    ctx = {
      config: {
        start: dayjs().subtract(1, 'year'),
        end: dayjs().add(1, 'year'),
        selected: [
          dayjs('2020-04-25'),
          dayjs('2020-04-27')
        ],
        isRangePicker: true,
        defaultRange: [ 1, 'month' ]
      }
    }
    ctx.output = setup(undefined, ctx.config)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('correct left-hand month is displayed', () => {
    const date = get(ctx.output.leftCalendarDate)
    assert.deepEqual(date.toDate(), dayjs('2020-04-01').toDate())
  })

  it('correct right-hand month is displayed', () => {
    const date = get(ctx.output.rightCalendarDate)
    assert.deepEqual(date.toDate(), dayjs('2020-05-01').toDate())
  })
})

describe('setup/date-range/default-dates/selected-inside-range', () => {
  let ctx = {}

  beforeAll(() => {
    MockDate.set('2021-02-04')
    ctx = {
      config: {
        start: dayjs('2021-01-11'),
        end: dayjs('2021-04-18'),
        isRangePicker: true,
        defaultRange: [ 1, 'month' ]
      }
    }
    ctx.output = setup(undefined, ctx.config)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('left-hand month is start of default selection', () => {
    const date = get(ctx.output.leftCalendarDate)
    assert.deepEqual(date.format('YYYY-MM-DD'), '2021-02-01')
  })

  it('right hand month is next month', () => {
    const date = get(ctx.output.rightCalendarDate)
    assert.deepEqual(date.format('YYYY-MM-DD'), '2021-03-01')
  })
})
