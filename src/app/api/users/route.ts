import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const data = await req.json()
  const { name, username } = data

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return Response.json(user, { status: 201 })
}
