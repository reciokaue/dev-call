import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
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

  return Response.json(user, { status: 201 })
}
