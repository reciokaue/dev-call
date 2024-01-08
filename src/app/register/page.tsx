'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { MultiStep } from '@/components/multi-step'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Letras de A-Z e "-"' })
    .toLowerCase(),
  name: z.string().min(3, { message: 'No mínimo 3 caracteres' }),
})
type Props = z.infer<typeof schema>

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  const searchParams = useSearchParams()
  const username = searchParams.get('username')

  async function handleSign(data: Props) {
    console.log(data)
  }

  useEffect(() => {
    if (username) setValue('username', username)
  }, [setValue, username])

  return (
    <div className="mx-auto flex h-screen max-w-[500px] flex-col items-center justify-center">
      <div className="flex flex-col items-start self-stretch px-6">
        <h1 className="text-2xl font-bold leading-relaxed text-white">
          Quase lá
        </h1>
        <p className="text-base leading-relaxed text-gray-200">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
        <MultiStep className="mt-6" steps={4} currentStep={2} />
      </div>

      <form
        onSubmit={handleSubmit(handleSign)}
        className="mt-6 flex flex-col items-center gap-4 self-stretch rounded-lg border border-gray-600 bg-gray-800 p-6"
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
          <span className="text-sm text-red-500 ">
            {errors.username?.message}
          </span>
        </div>
        <Button className="w-full">
          Proximo passo
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
