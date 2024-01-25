'use client'

import '../lib/dayjs'

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { shortWeekDays } from '@/utils/get-week-day'
import { getCalendarWeeks } from '@/utils/getCalendarWeeks'

import { Button } from './ui/button'

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
  blockedWeekDays?: number[]
}

export function Calendar({
  onDateSelected,
  selectedDate,
  blockedWeekDays,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const calendarWeeks = useMemo(
    () => getCalendarWeeks(currentDate, blockedWeekDays),
    [currentDate, blockedWeekDays],
  )

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }
  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  return (
    <div className="flex w-[540px] flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-base font-medium capitalize leading-relaxed text-white">
          {currentMonth} <span className="text-gray-200">{currentYear}</span>
        </h1>
        <div className="text-gray-200">
          <Button
            title="previous month"
            onClick={handlePreviousMonth}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <Button
            title="next month"
            onClick={handleNextMonth}
            variant="ghost"
            size="icon"
          >
            <ChevronRight />
          </Button>
        </div>
      </header>
      <table className="w-full table-fixed border-separate border-spacing-1">
        <thead className="text-sm font-medium uppercase leading-relaxed text-gray-200">
          <tr className="text-left">
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>
        <tbody className='before:block before:leading-3 before:text-gray-800 before:content-["."]'>
          {calendarWeeks.map((week, index) => (
            <tr key={`week-${index}`}>
              {week.map(({ date, disabled }) => (
                <td className="box-border" key={date.toString()}>
                  <button
                    onClick={() => onDateSelected(date.toDate())}
                    disabled={disabled}
                    className="aspect-square w-full rounded-sm bg-gray-600 text-center  transition-colors hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:pointer-events-none disabled:bg-transparent"
                  >
                    {date.format('DD')}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
