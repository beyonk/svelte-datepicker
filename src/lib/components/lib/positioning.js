function rects (w, el) {
  return w.getComputedStyle(el).display === 'contents'
    ? [ ...el.children ].flatMap(child => rects(w, child))
    : [ el.getBoundingClientRect() ]
}

function sizes (w) {
  const contentWidth = [ ...w.document.body.children ]
    .flatMap(el => rects(w, el))
    .reduce((a, rect) => Math.max(a, rect.right), 0) - w.document.body.getBoundingClientRect().x

  return {
    pageWidth: Math.min(w.document.body.scrollWidth, contentWidth),
    pageHeight: w.document.body.scrollHeight,
    viewportHeight: w.innerHeight,
    viewportWidth: w.innerWidth
  }
}

const dimensions = {
  page: {
    padding: 6,
    deadzone: 80
  },
  content: {
    medium: {
      single: {
        height: 410,
        width: 340
      },
      range: {
        height: 410,
        width: 680
      }
    },
    small: {
      single: {
        height: 410,
        width: 340
      },
      range: {
        height: 786,
        width: 340
      }
    }
  }
}

function getPosition (w, e, config) {
  const { isRangePicker } = config
  const { pageWidth, viewportHeight, viewportWidth } = sizes(w)

  const display = pageWidth < 480 ? 'small' : 'medium'
  const mode = isRangePicker ? 'range' : 'single'
  const { padding, deadzone } = dimensions.page
  const { width, height } = dimensions.content[display][mode]

  if (viewportHeight < (height + padding + deadzone) || viewportWidth < (width + padding)) {
    return {
      fullscreen: true,
      top: 0,
      left: 0
    }
  }

  let left = Math.max(padding, e.pageX - (width / 2))

  if ((left + width) > pageWidth) {
    left = (pageWidth - width) - padding
  }

  let top = Math.max(padding, e.pageY - (height / 2))

  const willExceedViewableArea = (top + height) > viewportHeight
  if (willExceedViewableArea) {
    top = viewportHeight - height - padding
  }

  return { top, left }
}

export {
  getPosition
}
