import { z } from 'zod'

import { getCurrentUser } from '@/lib/session'
import { TimeIntervalsPropsOutput } from '@/utils/schemas/time-intervals'

// import { prisma } from '../../../../lib/prisma'

export async function POST(req: Request) {
  const data = await req.json()
  const { formData }: TimeIntervalsPropsOutput = data

  const session = await getCurrentUser()
  if (!session)
    return Response.json({ message: 'User not authenticated' }, { status: 401 })

  return Response.json(session, { status: 200 })
}
