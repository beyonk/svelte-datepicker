const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  pgup: 33,
  pgdown: 34,
  enter: 13,
  escape: 27,
  tab: 9
}

const keyCodesArray = Object.keys(keyCodes).map(k => keyCodes[k])

function handleKeyPress (evt, incrementDayHighlighted, incrementMonth, registerSelection, close) {
  if (keyCodesArray.indexOf(evt.keyCode) === -1) {
    return false
  }

  evt.preventDefault()

  switch (evt.keyCode) {
    case keyCodes.left:
      return incrementDayHighlighted(-1)
    case keyCodes.up:
      return incrementDayHighlighted(-7)
    case keyCodes.right:
      return incrementDayHighlighted(1)
    case keyCodes.down:
      return incrementDayHighlighted(7)
    case keyCodes.pgup:
      return incrementMonth(-1)
    case keyCodes.pgdown:
      return incrementMonth(1)
    case keyCodes.escape:
      return close()
    case keyCodes.enter:
      return registerSelection()
    default:
      return false
  }
}

function createKeyboardHandler ({ incrementDayHighlighted, incrementMonth, registerSelection, close }) {
  return evt => handleKeyPress(evt, incrementDayHighlighted, incrementMonth, registerSelection, close)
}

export {
  createKeyboardHandler
}
