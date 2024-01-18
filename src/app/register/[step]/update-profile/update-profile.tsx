'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { UserProps } from '@/lib/session'

const schema = z.object({
  bio: z.string(),
})
type Props = z.infer<typeof schema>

export function UpdateProfileComponent({ user }: { user: UserProps | null }) {
  const { register, handleSubmit } = useForm<Props>({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  async function handleSign(data: Props) {
    try {
      await api.put('/users/profile', {
        data,
      })
      router.push(`/schedule/${user?.username}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSign)}
      className="flex w-full flex-col gap-4"
    >
      <span className="-mb-2 text-sm leading-relaxed text-gray-100">
        Foto de perfil
      </span>
      <div className="flex items-center justify-start gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
          {user?.avatar_url && (
            <Image
              src={user?.avatar_url}
              width={64}
              height={64}
              alt={user.username}
            />
          )}
        </div>
        <Button variant="outline" className="border-primary bg-transparent">
          Selecionar foto
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Sobre você"
          className="h-32 resize-none"
          {...register('bio')}
        />
        <span className="text-sm leading-relaxed text-gray-100">
          Isto será exibido em sua página pessoal.
        </span>
      </div>
      <Button className="w-full">
        Finalizar
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
