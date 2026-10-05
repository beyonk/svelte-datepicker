'use strict'

class CalendarStyle {
  constructor (overrides = {}) {
    this.style = ''
    this.buttonBackgroundColor = '#fff'
    this.buttonBorderColor = '#eee'
    this.buttonTextColor = '#333'
    this.buttonWidth = '300px'
    this.highlightColor = '#f7901e'
    this.passiveHighlightColor = '#FCD9B1'

    this.dayBackgroundColor = 'none'
    this.dayBackgroundColorIsNight = 'none'
    this.dayTextColor = '#4a4a4a'
    this.dayTextColorIsNight = '#4a4a4a'
    this.dayTextColorInRange = 'white'
    this.dayHighlightedBackgroundColor = '#efefef'
    this.dayHighlightedTextColor = '#4a4a4a'

    this.currentDayTextColor = '#000'
    this.selectedDayTextColor = 'white'

    this.timeNightModeTextColor = 'white'
    this.timeNightModeBackgroundColor = '#808080'
    this.timeDayModeTextColor = 'white'
    this.timeDayModeBackgroundColor = 'white'
    this.timeSelectedTextColor = '#3d4548'
    this.timeInputTextColor = '#3d4548'
    this.timeConfirmButtonColor = '#2196F3'
    this.timeConfirmButtonTextColor = 'white'

    this.toolbarBorderColor = '#888'

    this.contentBackground = 'white'

    this.monthYearTextColor = '#3d4548'
    this.legendTextColor = '#4a4a4a'

    this.datepickerWidth = 'auto'

    Object.entries(overrides).forEach(([ prop, value ]) => {
      this[prop] = value
    })
  }

  toWrapperStyle () {
    return `
      --button-background-color: ${this.buttonBackgroundColor};
      --button-border-color: ${this.buttonBorderColor};
      --button-text-color: ${this.buttonTextColor};
      --button-width: ${this.buttonWidth};
      --highlight-color: ${this.highlightColor};
      --passive-highlight-color: ${this.passiveHighlightColor};

      --day-background-color: ${this.dayBackgroundColor};
      --day-background-color-is-night: ${this.dayBackgroundColorIsNight};
      --day-text-color: ${this.dayTextColor};
      --day-text-color-in-range: ${this.dayTextColorInRange};
      --day-text-color-is-night: ${this.dayTextColorIsNight};
      --day-highlighted-background-color: ${this.dayHighlightedBackgroundColor};
      --day-highlighted-text-color: ${this.dayHighlightedTextColor};

      --current-day-text-color: ${this.currentDayTextColor};
      --selected-day-text-color: ${this.selectedDayTextColor};

      --time-night-mode-text-color: ${this.timeNightModeTextColor};
      --time-night-mode-background-color: ${this.timeNightModeBackgroundColor};
      --time-day-mode-text-color: ${this.timeDayModeTextColor};
      --time-day-mode-background-color: ${this.timeDayModeBackgroundColor};

      --time-selected-text-color: ${this.timeSelectedTextColor};
      --time-input-text-color: ${this.timeInputTextColor};
      --time-confirm-button-text-color: ${this.timeConfirmButtonTextColor};
      --time-confirm-button-color: ${this.timeConfirmButtonColor};

      --toolbar-border-color: ${this.toolbarBorderColor};

      --content-background: ${this.contentBackground};

      --month-year-text-color: ${this.monthYearTextColor};
      --legend-text-color: ${this.legendTextColor};
      --datepicker-width: ${this.datepickerWidth};

      ${this.style}
    `
  }
}

export {
  CalendarStyle
}
