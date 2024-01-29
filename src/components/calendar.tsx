'use client'

import '../lib/dayjs'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { shortWeekDays, weekDays } from '@/utils/get-week-day'
import { getCalendarWeeks } from '@/utils/getCalendarWeeks'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
  getBlockedDates: (date: dayjs.Dayjs) => any
}

interface BlockedWeekDays {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function Calendar({
  onDateSelected,
  selectedDate,
  getBlockedDates,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

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

  function handleSelectDate(date: dayjs.Dayjs) {
    if (blocked) onDateSelected(date.toDate())
  }

  const { data: blocked } = useQuery<BlockedWeekDays | null>(
    getBlockedDates(currentDate),
  )
  const calendarWeeks = useMemo(
    () => getCalendarWeeks(currentDate, blocked),
    [currentDate, blocked],
  )

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
          <tr className="text-center">
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>
        <tbody className='before:block before:leading-3 before:text-gray-800 before:content-["."]'>
          {calendarWeeks.length > 0
            ? calendarWeeks.map((week, index) => (
                <tr key={`week-${index}`}>
                  {week.map(({ date, disabled }) => (
                    <td className="box-border" key={date.toString()}>
                      <button
                        onClick={() => handleSelectDate(date)}
                        disabled={disabled}
                        className="aspect-square w-full rounded-sm bg-gray-600 text-center  transition-colors hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:pointer-events-none disabled:bg-transparent disabled:opacity-40"
                      >
                        {date.format('DD')}
                      </button>
                    </td>
                  ))}
                </tr>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <tr key={`week-${index}`}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <td className="box-border" key={`skeleton-calendar-${i}`}>
                      <Skeleton className="aspect-square w-full rounded-sm" />
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
