import { getCurrentUser } from '@/lib/session'
import { TimeIntervalsPropsOutput } from '@/utils/schemas/time-intervals'

import { prisma } from '../../../../lib/prisma'

export async function POST(req: Request) {
  const data = await req.json()
  const { formData } = data
  const { intervals }: TimeIntervalsPropsOutput = formData

  const user = await getCurrentUser()
  if (!user)
    return Response.json({ message: 'User not authenticated' }, { status: 401 })

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: user.id,
        },
      })
    }),
  )

  return Response.json(user, { status: 201 })
}
