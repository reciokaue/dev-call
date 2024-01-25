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

  return Response.json({ blockedWeekDays }, { status: 201 })
}
