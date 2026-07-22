<script>
  import { getContext } from 'svelte'
  import { contextKey } from '../../lib/context'
  import { dayjs } from '../../lib/date-utils.js'

  export let viewContextKey

  const { months, config, highlighted, leftCalendarDate, rightCalendarDate } = getContext(contextKey)
  const { isStart, displayedDate, monthView } = getContext(viewContextKey)

  let monthSelectorOpen = false
  let availableMonths

  $: {
    const isOnLowerBoundary = config.start.isSame($displayedDate, 'year')
    const isOnUpperBoundary = config.end.isSame($displayedDate, 'year')
    availableMonths = dayjs.months().map((m, i) => {
      return Object.assign({}, {
        name: m,
        abbrev: dayjs.monthsShort()[i]
      }, {
        selectable:
          (!isOnLowerBoundary && !isOnUpperBoundary) ||
        (
          (!isOnLowerBoundary || i >= config.start.month()) &&
          (!isOnUpperBoundary || i <= config.end.year())
        )
      })
    })
  }

  $: myPosition = dayjs($displayedDate).diff('0000-00-00', 'month')
  $: startPosition = dayjs($leftCalendarDate).diff('0000-00-00', 'month')
  $: endPosition = dayjs($rightCalendarDate).diff('0000-00-00', 'month')
  $: canIncrementMonth = ($monthView.monthIndex < months.length - 1) && (config.isRangePicker && isStart ? myPosition < (endPosition - 1) : true)
  $: canDecrementMonth = $monthView.monthIndex > 0 && (config.isRangePicker && !isStart ? myPosition > (startPosition + 1) : true)

  function changeMonth (selectedMonth) {
    displayedDate.update(v => v.month(selectedMonth))
    highlighted.set($displayedDate)
  }

function increment (direction, entity) {
    if (direction === 1 && !canIncrementMonth) return
    if (direction === -1 && !canDecrementMonth) return

    displayedDate.update((d) => d.add(direction, entity))
    highlighted.set($displayedDate)
  }

  function toggleMonthSelectorOpen () {
    monthSelectorOpen = !monthSelectorOpen
  }

  function monthSelected (event, { monthDefinition, index }) {
    event.stopPropagation()
    if (!monthDefinition.selectable) return
    changeMonth(index)
    toggleMonthSelectorOpen()
  }
</script>

<div class="title">
  <div class="heading-section">
    <button class="control"
      type="button"
      aria-label="Previous month"
      disabled={!canDecrementMonth}
      on:click={() => increment(-1, monthSelectorOpen ? 'year' : 'month')}>
      <i class="arrow left"></i>
    </button>
    <button type="button" class="label" on:click={toggleMonthSelectorOpen}>
      <span>{$displayedDate.format('MMMM YYYY')}</span>
    </button> 
    <button class="control"
      type="button"
      aria-label="Next month"
      disabled={!canIncrementMonth}
      on:click={() => increment(1, monthSelectorOpen ? 'year' : 'month')}>
      <i class="arrow right"></i>
    </button>
  </div>
  <div class="month-selector" class:open={monthSelectorOpen}>
      {#each availableMonths as monthDefinition, index}
        <button 
          class="month-selector--month" 
          class:selected={index === $displayedDate.month()}
          type="button"
          disabled={!monthDefinition.selectable}
          on:click={e => monthSelected(e, { monthDefinition, index })}
        >
          <span>{monthDefinition.abbrev}</span>
        </button>
      {/each}
  </div>
</div>

<style>
  .heading-section { 
    font-size: 16px;
    padding: 6px 15px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #3d4548;
    font-weight: bold;
  }

  .label {
    color: var(--month-year-text-color);
  }

  .heading-section {
    padding: 12px 15px;
  }

  .label,
  .title { 
    cursor: pointer;
    display: flex;
  }
  .month-selector { 
    position: absolute;
    top: 75px; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background-color: #fff;
    transition: all 300ms; 
    transform: scale(0.8);
    opacity: 0; 
    visibility: hidden;
    z-index: 2;
    text-align: center;
  }
  .month-selector.open { 
    transform: scale(1); 
    visibility: visible;
    opacity: 1;
  }
  .month-selector--month { 
    width: 31.333%; 
    margin: .5%; 
    height: 21.5%;
    display: inline-block;
    color: #4a4a4a;
    background: none;
    border: 1px solid #efefef;
    opacity: 0.2;
  }
  .month-selector--month:enabled { 
    opacity: 1; 
  }
  .month-selector--month:enabled:hover { 
    cursor: pointer;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.15);
  }
  .month-selector--month.selected { 
    background: var(--highlight-color);
    color: #fff;
  }
  .month-selector--month:before { 
    content: ' ';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .month-selector--month span { 
    vertical-align: middle; 
    display: inline-block;
  }
  .control, .label {
    background: none;
    border: none;
  }
  .control { 
    padding: 0 3px;
    opacity: 0.2;
    transform: translateY(3px);
  }

  .control:enabled { 
    opacity: 1; 
    cursor: pointer;
  }

  .arrow {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-style: solid;
    border-color: #a9a9a9;
    border-width: 0;
    border-bottom-width: 2px;
    border-right-width: 2px;
  }

  .arrow.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .arrow.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .arrow {
    width: 18px;
    height: 18px;
  }

  .control {
    padding: 0 8px;
  }

  .heading-section { 
    font-size: 20px;
  }

  .label {
    margin-left: 5%;
  }
</style>
