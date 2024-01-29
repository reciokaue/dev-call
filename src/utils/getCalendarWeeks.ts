import dayjs from 'dayjs'

interface CalendarWeeks {
  date: dayjs.Dayjs
  disabled: boolean
}

export function getCalendarWeeks(
  currentDate: dayjs.Dayjs,
  blocked:
    | {
        blockedWeekDays: number[]
        blockedDates: number[]
      }
    | null
    | undefined,
): CalendarWeeks[][] {
  // if (!blockedWeekDays) return []

  const daysInMonthArray = Array.from({
    length: currentDate.daysInMonth(),
  }).map((_, i) => {
    return currentDate.set('date', i + 1)
  })

  const firstWeekDay = currentDate.get('day')
  const lastDay = daysInMonthArray.pop()
  const lastWeekDay = lastDay?.get('day') || 6

  const previousMonthFillArray = Array.from({
    length: firstWeekDay,
  })
    .map((_, i) => {
      return currentDate.subtract(i + 1, 'day')
    })
    .reverse()

  const nextMonthFillArray = Array.from({
    length: 7 - (lastWeekDay + 1),
  }).map((_, i) => {
    return lastDay?.add(i + 1, 'day')
  })

  const disable = (array: any[], disabled: boolean) =>
    array.map((date: dayjs.Dayjs) => {
      const isBefore = date.endOf('day').isBefore()
      const isBlocked = blocked
        ? blocked.blockedWeekDays.includes(date.get('day')) ||
          blocked.blockedDates.includes(date.get('date'))
        : false

      const isDisabled = disabled || isBefore || isBlocked

      return { date, disabled: isDisabled }
    })

  const allDays = [
    ...disable(previousMonthFillArray, true),
    ...disable(daysInMonthArray, false),
    ...disable(nextMonthFillArray, true),
  ]

  const daysPerWeek = Array.from({
    length: Math.ceil(allDays.length / 7),
  }).map((_, i) => {
    return allDays.slice(i * 7, i * 7 + 7)
  })

  return daysPerWeek
}
