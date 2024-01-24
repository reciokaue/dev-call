'use client'

// interface CalendarProps {}
import '../lib/dayjs'

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { shortWeekDays } from '@/utils/get-week-day'

import { Button } from './ui/button'

interface CalendarWeeks {
  date: dayjs.Dayjs
  disabled: boolean
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const calendarWeeks = useMemo<CalendarWeeks[][]>(() => {
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
        return { date, disabled }
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
  }, [currentDate])

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
    <div className="flex w-full max-w-[540px] flex-col gap-6">
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
              {week.map((day) => (
                <td className="box-border" key={day.date.toString()}>
                  <button
                    disabled={day?.disabled}
                    className="aspect-square w-full rounded-sm bg-gray-600 text-center  transition-colors hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:pointer-events-none disabled:bg-transparent"
                  >
                    {day.date.format('DD')}
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
