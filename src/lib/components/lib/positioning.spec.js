import { describe, it } from 'vitest'
import assert from 'node:assert/strict'
import { getPosition } from './positioning.js'

function element (right, display = 'block', children = []) {
  return { display, children, getBoundingClientRect: () => ({ x: 0, right }) }
}

function fakeWindow (children) {
  return {
    innerWidth: 1280,
    innerHeight: 900,
    getComputedStyle: el => ({ display: el.display }),
    document: {
      body: { children, scrollWidth: 1280, scrollHeight: 900, getBoundingClientRect: () => ({ x: 0 }) }
    }
  }
}

describe('positioning/getPosition', () => {
  const click = { pageX: 640, pageY: 450 }

  it('centres the popover on the click', () => {
    const w = fakeWindow([ element(1280) ])
    assert.deepEqual(getPosition(w, click, { isRangePicker: false }), { top: 245, left: 470 })
  })

  it('measures through display: contents wrappers', () => {
    const w = fakeWindow([ element(0, 'contents', [ element(1280) ]) ])
    assert.deepEqual(getPosition(w, click, { isRangePicker: false }), { top: 245, left: 470 })
  })
})
