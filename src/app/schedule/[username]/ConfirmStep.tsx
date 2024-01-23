'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  confirmStepSchema,
  confirmStepSchemaProps,
} from '@/utils/schemas/confirmStep'

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<confirmStepSchemaProps>({
    resolver: zodResolver(confirmStepSchema),
  })

  async function handleConfirmSchedule(data: confirmStepSchemaProps) {}

  return (
    <div className="flex w-[540px] flex-col">
      <header className="flex gap-4 border-b border-gray-600 pb-6">
        <div className="flex items-center gap-2 text-base leading-relaxed text-gray-50">
          <Calendar className="h-5 w-5 text-gray-200" /> 22 de Janeiro de 2022
        </div>
        <div className="flex items-center gap-2 text-base leading-relaxed text-gray-50">
          <Clock className="h-5 w-5 text-gray-200" /> 18:00h
        </div>
      </header>
      <form
        onSubmit={handleSubmit(handleConfirmSchedule)}
        className="mt-6 flex flex-col gap-6"
      >
        <div className="flex flex-col justify-start gap-2 text-sm leading-relaxed">
          <label htmlFor="">Username</label>
          <Input prefix="dev.call/" {...register('username')} />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-start gap-2 text-sm leading-relaxed">
          <label htmlFor="">Endereço de e-mail</label>
          <Input {...register('email')} />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col justify-start gap-2 text-sm leading-relaxed">
          <label htmlFor="">Observações</label>
          <Textarea
            className="h-20 w-full resize-none"
            {...register('observations')}
          />
        </div>
        <footer className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="lg">
            Cancelar
          </Button>
          <Button className="font-bold" size="lg">
            Confirmar
          </Button>
        </footer>
      </form>
    </div>
  )
}
