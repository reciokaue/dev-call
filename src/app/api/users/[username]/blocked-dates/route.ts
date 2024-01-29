import { NextRequest } from 'next/server'

import { prisma } from '../../../../../lib/prisma'

interface RouteParams {
  params: {
    username: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const searchParams = req.nextUrl.searchParams
  const year = searchParams.get('year')
  const month = searchParams.get('month')

  if (!year || !month)
    return Response.json(
      { message: 'Year/month not provided.' },
      { status: 400 },
    )

  const user = await prisma.user.findUnique({
    where: { username: params.username },
  })

  if (!user)
    return Response.json({ message: 'User does not exist.' }, { status: 400 })

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: { week_day: true },
    where: { user_id: user.id },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })
  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY
      EXTRACT(DAY FROM S.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

    HAVING amount >= size
  `
  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return Response.json({ blockedWeekDays, blockedDates }, { status: 200 })
}
