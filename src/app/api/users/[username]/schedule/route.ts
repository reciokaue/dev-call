import dayjs from 'dayjs'
import { z } from 'zod'

import { prisma } from '../../../../../lib/prisma'

interface RouteParams {
  params: {
    username: string
  }
}

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().nullable(),
  date: z.string().datetime(),
})

export async function POST(req: Request, { params }: RouteParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  })

  if (!user)
    return Response.json({ message: 'User does not exist.' }, { status: 400 })

  const data = await req.json()
  const { name, email, observations, date } = schema.parse(data)
  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date()))
    return Response.json({ message: 'Date is in the past' }, { status: 400 })

  const conflictingSchedule = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })
  if (conflictingSchedule)
    return Response.json(
      { message: 'This time already has a schedule' },
      { status: 400 },
    )

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return Response.json({}, { status: 201 })
}
