import { setCookie } from 'nookies'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
  const data = await req.json()
  const { name, username } = data

  const userExists = await prisma.user.findUnique({
    where: { username },
  })

  if (userExists)
    return Response.json(
      { message: 'Username already exists' },
      { status: 400 },
    )

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie({ res }, '@dev.call:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return Response.json(user, { status: 201 })
}
