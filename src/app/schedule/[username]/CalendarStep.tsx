'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'

import { Calendar } from '@/components/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/axios'

import { UserScheduleProps } from './page'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface BlockedWeekDays {
  blockedWeekDays: number[]
}

export function CalendarStep({ params }: UserScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const monthAndDate =
    selectedDate && dayjs(selectedDate).format('DD[ de ]MMMM')

  const selectedDateString = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateString],
    queryFn: async () => {
      const response = await api.get(`/users/${params.username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  const { data: blockedWeekDates } = useQuery<BlockedWeekDays>({
    queryKey: ['availability', 'blockedWeekDates'],
    queryFn: async () => {
      const response = await api.get(
        `/users/${params.username}/blocked-dates`,
        {
          params: {
            year: dayjs(selectedDate).format('YYYY'),
            month: dayjs(selectedDate).format('MM'),
          },
        },
      )
      return response.data
    },
  })

  return (
    <div className="flex h-full justify-between">
      <Calendar
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        blockedWeekDays={blockedWeekDates?.blockedWeekDays}
      />

      {isDateSelected && (
        <aside className="flex w-[280px] flex-col  border-l border-gray-600 py-6">
          <header className="flex items-center px-6">
            <h1 className="text-base font-medium leading-relaxed text-white first-letter:capitalize">
              {weekDay} <span className="text-gray-200">{monthAndDate}</span>
            </h1>
            <span className="h-10 " />
          </header>
          <div className="bottom-0 right-0 top-[calc(40px+6rem)] grid grid-cols-1 gap-2 overflow-y-scroll px-6 py-6">
            {availability
              ? availability?.possibleTimes?.map((hour) => (
                  <button
                    disabled={!availability.availableTimes.includes(hour)}
                    key={hour}
                    className="flex  items-center justify-center rounded-md bg-gray-600 px-7 py-1 text-sm leading-relaxed text-gray-100 hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:pointer-events-none disabled:bg-transparent disabled:opacity-40 "
                  >
                    {hour}
                  </button>
                ))
              : Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton
                    key={`skeleton-${i}`}
                    className="h-8 w-full rounded-md"
                  />
                ))}
          </div>
        </aside>
      )}
    </div>
  )
}
