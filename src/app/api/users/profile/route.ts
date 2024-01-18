import { z } from 'zod'

import { getCurrentUser } from '@/lib/session'

import { prisma } from '../../../../lib/prisma'

const updateProfileSchema = z.object({
  bio: z.string(),
})

export async function PUT(req: Request) {
  const { data } = await req.json()

  const user = await getCurrentUser()
  if (!user)
    return Response.json({ message: 'User not authenticated' }, { status: 401 })

  const { bio } = updateProfileSchema.parse(data)

  await prisma.user.update({
    where: { id: user.id },
    data: { bio },
  })

  return Response.json('user updated', { status: 200 })
}
