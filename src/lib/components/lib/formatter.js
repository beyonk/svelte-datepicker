import { derived } from 'svelte/store'

function createFormatter (selectedStartDate, selectedEndDate, config) {
  const formatter = derived([ selectedStartDate, selectedEndDate ], ([ $selectedStartDate, $selectedEndDate ]) => {
    const formattedSelected = $selectedStartDate && $selectedStartDate.format(config.format)
    const formattedSelectedEnd = config.isRangePicker && $selectedEndDate && $selectedEndDate.format(config.format)

    return {
      formattedSelected,
      formattedSelectedEnd,
      formattedCombined: config.isRangePicker ? `${formattedSelected} - ${formattedSelectedEnd}` : formattedSelected
    }
  })

  return { formatter }
}

export {
  createFormatter
}
