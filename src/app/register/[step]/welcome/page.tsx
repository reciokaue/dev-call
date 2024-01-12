'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { api } from '../../../../lib/axios'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Letras de A-Z e "-"' })
    .toLowerCase(),
  name: z.string().min(3, { message: 'No mínimo 3 caracteres' }),
})
type Props = z.infer<typeof schema>

export default function RegisterWelcome() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username')

  async function handleSign(data: Props) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      router.push('/register/2/connect')
    } catch (err: any) {
      const message = err?.response?.data?.message

      if (message === 'Username already exists')
        return setError('username', {
          message: `O username "${data.username}" já existe`,
        })

      console.log(err)
    }
  }

  useEffect(() => {
    if (username) setValue('username', username)
  }, [setValue, username])

  return (
    <form
      onSubmit={handleSubmit(handleSign)}
      className="flex flex-col items-center gap-4 self-stretch"
    >
      <div className="flex w-full flex-col items-start gap-2">
        <label>Nome de usuário</label>
        <Input
          className="w-full"
          placeholder="seu-usuário"
          prefix="dev.cal.com/"
          {...register('username')}
        />
        <span className="text-sm text-red-500 ">
          {errors.username?.message}
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <label>Nome completo</label>
        <Input
          className="w-full"
          placeholder="Seu nome"
          {...register('name')}
        />
        <span className="text-sm text-red-500 ">{errors.name?.message}</span>
      </div>
      <Button disabled={isSubmitting} className="w-full">
        Proximo passo
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
