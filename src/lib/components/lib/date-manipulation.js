function ensureFutureMonth (firstDate, secondDate) {
  return firstDate.isSame(secondDate, 'month') ? secondDate.add(1, 'month') : secondDate
}

export {
  ensureFutureMonth
}
