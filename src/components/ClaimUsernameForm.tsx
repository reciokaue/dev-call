'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import { Input } from './ui/input'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Letras de A-Z e "-"' })
    .toLowerCase(),
})
type Props = z.infer<typeof schema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  async function handle(data: Props) {
    return new Promise(() =>
      setTimeout(() => {
        console.log(data)
      }, 2000),
    )
  }
  return (
    <form onSubmit={handleSubmit(handle)} className="flex flex-col">
      <div className="flex w-full gap-4">
        <Input
          className="w-full bg-gray-900"
          placeholder="seu-usuario"
          prefix="ignite.com/"
          {...register('username')}
        />
        <Button isLoading={isSubmitting}>
          Reservar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <span
        className={`pt-2 text-sm text-gray-500 ${
          errors.username?.message !== undefined && 'text-red-500'
        }`}
      >
        {errors.username?.message || 'Digite o nome do usuário'}
      </span>
    </form>
  )
}
