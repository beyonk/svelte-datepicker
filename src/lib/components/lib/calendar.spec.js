import { describe, it, beforeAll, afterAll, vi } from 'vitest'
import assert from 'node:assert/strict'
import { getMonths } from './calendar.js'
import { dayjs } from './date-utils.js'
import MockDate from 'mockdate'
import * as daySelectionValidator from './day-selection-validator.js'

describe('calendar/getMonths', () => {
  beforeAll(() => {
    MockDate.set('2020-04-20')
    vi.spyOn(daySelectionValidator, 'buildDaySelectionValidator').mockReturnValue(() => {})
  })

  afterAll(() => {
    MockDate.reset()
    vi.restoreAllMocks()
  })

  const config = {
    start: dayjs('2020-03-10'),
    end: dayjs('2020-06-25'),
    selectableCallback: () => {}
  }

  it('has correct month count', () => {
    const months = getMonths(config)

    assert.deepEqual(
      months.length,
      4
    )
  })

  it('calls day selection validator with correct arguments', () => {
    getMonths(config)

    assert.deepEqual(
      daySelectionValidator.buildDaySelectionValidator.mock.calls[0],
      [ config.start, config.end, config.selectableCallback ]
    )
  })
})
