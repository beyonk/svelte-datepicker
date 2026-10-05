function getCalendarPage (date, dayValidator) {
  const displayedRangeStart = date.startOf('month').startOf('week')
  const displayedRangeEnd = date.endOf('month').endOf('week').add(1, 'day')

  const weeks = []
  let currentDay = displayedRangeStart
  while (currentDay.isBefore(displayedRangeEnd, 'day')) {
    const weekOfMonth = Math.floor(currentDay.diff(displayedRangeStart, 'days') / 7)
    const isRequestedMonth = currentDay.isSame(date, 'month')
    weeks[weekOfMonth] = weeks[weekOfMonth] || { days: [], id: `${currentDay.format('YYYYMMYYYY')}${weekOfMonth}` }
    weeks[weekOfMonth].days.push(
      Object.assign({
        partOfMonth: isRequestedMonth,
        firstOfMonth: isRequestedMonth && currentDay.date() === 1,
        lastOfMonth: isRequestedMonth && currentDay.date() === date.daysInMonth(),
        day: currentDay.date(),
        month: currentDay.month(),
        year: currentDay.year(),
        date: currentDay
      }, dayValidator(currentDay))
    )
    currentDay = currentDay.add(1, 'day')
  }

  return { month: date.month(), year: date.year(), weeks }
}

export {
  getCalendarPage
}
