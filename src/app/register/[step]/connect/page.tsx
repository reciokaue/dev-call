'use client'

import { ChevronRight } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'

export default function Connect() {
  const [user, setUser] = useState<any>()

  function handleSignIn() {
    signIn('google')
  }

  useEffect(() => {
    async function getUserData() {
      const session = await getCurrentUser()
      setUser(session)
    }
    getUserData()
  }, [])

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between rounded-md border border-gray-600 px-6 py-4">
        <span className="text-base leading-relaxed text-gray-100">
          Google Calendar
        </span>
        <Button
          onClick={handleSignIn}
          className="border-white bg-transparent hover:bg-white hover:text-gray-700"
          variant="outline"
        >
          Conectar
        </Button>
      </div>
      {JSON.stringify(user)}
      <Button disabled={true}>
        Proximo passo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
