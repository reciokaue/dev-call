import dayjs from 'dayjs'
import { NextRequest } from 'next/server'

import { prisma } from '../../../../../lib/prisma'

interface RouteParams {
  params: {
    username: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const searchParams = req.nextUrl.searchParams
  const date = searchParams.get('date')

  if (!date)
    return Response.json({ message: 'Date not provided.' }, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { username: params.username },
  })

  if (!user)
    return Response.json({ message: 'User does not exist.' }, { status: 400 })

  const referenceDate = dayjs(date)
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate)
    return Response.json({ possibleTimes: [], availableTimes: [] })

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability)
    return Response.json({ possibleTimes: [], availableTimes: [] })

  const { time_end_in_minutes, time_start_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )
  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTimes) => blockedTimes.date.getHours() === time,
    )
    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

  return Response.json({ possibleTimes, availableTimes }, { status: 201 })
}
