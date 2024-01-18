'use client'

import { Check, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '../../../../components/ui/button'
import { getCurrentUser } from '../../../../lib/session'

export default function Connect() {
  const [user, setUser] = useState<any>()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const router = useRouter()

  const hasAuthError = error === 'permissions'
  const isSignedIn = !!user

  async function handleSignIn() {
    await signIn('google')
  }

  async function handleNextStep() {
    router.push('/register/3/time-intervals')
  }

  useEffect(() => {
    async function getUserData() {
      const session = await getCurrentUser()
      setUser(session)
    }
    getUserData()
  }, [searchParams])

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between rounded-md border border-gray-600 px-6 py-4">
        <span className="text-base leading-relaxed text-gray-100">
          Google Calendar
        </span>
        {isSignedIn ? (
          <Button disabled size="sm">
            Conectado <Check className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSignIn}
            className="border-white bg-transparent hover:bg-white hover:text-gray-700"
            variant="outline"
            size="sm"
          >
            Conectar
          </Button>
        )}
      </div>
      {hasAuthError && (
        <span className="mb-2 text-sm text-red-500">
          Falha ao se conectar ao Google, verifique se você habilitou as
          permissões de acesso ao Google Calendar
        </span>
      )}
      <Button onClick={handleNextStep} disabled={!isSignedIn}>
        Proximo passo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
