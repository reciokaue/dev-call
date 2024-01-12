// import { setCookie } from 'nookies'
import { cookies } from 'next/headers'

import { prisma } from '../../../lib/prisma'

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

  cookies().set('@dev.call:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: true,
  })

  return Response.json(user, { status: 201 })
}
