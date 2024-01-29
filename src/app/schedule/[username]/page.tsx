'use client'

import { useState } from 'react'

import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

interface UserScheduleProps {
  params: {
    username: string
  }
}

export default function UserSchedule({ params }: UserScheduleProps) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  if (selectedDateTime)
    return (
      <ConfirmStep
        selectedDate={selectedDateTime}
        onSelectDateTime={setSelectedDateTime}
      />
    )

  return (
    <CalendarStep
      username={params.username}
      onSelectDateTime={setSelectedDateTime}
    />
  )
}
