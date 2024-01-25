import { Slot } from '@radix-ui/react-slot'
import Image from 'next/image'

import { prisma } from '@/lib/prisma'

import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export const revalidate = 60 * 60 * 24 // 1 day
async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  })
  return user
}

export interface UserScheduleProps {
  params: {
    username: string
  }
}

export default async function UserSchedule({ params }: UserScheduleProps) {
  const user = await getUser(params.username)

  return (
    <div className="relative mx-auto mb-4 flex flex-col  items-center overflow-hidden px-4 pt-20">
      <header className="flex flex-col items-center justify-center">
        <div className="mb-2 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full  bg-gray-200">
          {user?.avatar_url && (
            <Image
              src={user?.avatar_url}
              width={64}
              height={64}
              alt={user.username}
            />
          )}
        </div>
        <h1 className="text-2xl font-bold leading-relaxed text-white">
          {user?.name}
        </h1>
        <p className="text-sm leading-relaxed text-gray-200">{user?.bio}</p>
      </header>
      <div className="mt-6 w-auto max-w-[820px] rounded-lg border border-gray-600 bg-gray-800">
        <CalendarStep params={params} />
        {/* <ConfirmStep /> */}
      </div>
    </div>
  )
}
