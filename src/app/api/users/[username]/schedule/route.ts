import dayjs from 'dayjs'
import { google } from 'googleapis'
import { z } from 'zod'

import { getGoogleOauthToken } from '@/lib/google'

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

  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })
  const auth = getGoogleOauthToken(user.id)
  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOauthToken(user.id),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `DevCall: ${name}`,
      description: observations,
      start: { dateTime: schedulingDate.format() },
      end: { dateTime: schedulingDate.add(1, 'hour').format() },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return Response.json({}, { status: 201 })
}
