let shakeHighlightTimeout

function getDay (months, m, d, y) {
  const theMonth = months.find(aMonth => aMonth.month === m && aMonth.year === y)
  if (!theMonth) {
    return null
  }

  for (let i = 0; i < theMonth.weeks.length; i += 1) {
    for (let j = 0; j < theMonth.weeks[i].days.length; j += 1) {
      const aDay = theMonth.weeks[i].days[j]
      if (aDay.month === m && aDay.day === d && aDay.year === y) return aDay
    }
  }
  return null
}

function checkIfVisibleDateIsSelectable (months, date) {
  const proposedDay = getDay(
    months,
    date.month(),
    date.date(),
    date.year()
  )
  return proposedDay && proposedDay.selectable
}

function shakeDate (shouldShakeDate, date) {
  clearTimeout(shakeHighlightTimeout)
  shouldShakeDate.set(date)
  shakeHighlightTimeout = setTimeout(() => {
    shouldShakeDate.set(false)
  }, 700)
}

export {
  checkIfVisibleDateIsSelectable,
  shakeDate
}
