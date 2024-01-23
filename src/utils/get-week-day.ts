interface weekDayProps {
  format?: 'short' | 'long' | 'narrow'
}

export function getWeekDays({ format = 'long' }: weekDayProps) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: format })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      return weekDay
    })
}

export const weekDays = getWeekDays({ format: 'long' })
export const shortWeekDays = getWeekDays({ format: 'short' })
export const narrowWeekDays = getWeekDays({ format: 'narrow' })
