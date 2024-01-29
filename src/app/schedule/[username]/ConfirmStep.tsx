'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  confirmStepSchema,
  confirmStepSchemaProps,
} from '@/utils/schemas/confirmStep'

interface ConfirmStepProps {
  selectedDate: Date
  onSelectDateTime: (date: Date | null) => void
}

export function ConfirmStep({
  onSelectDateTime,
  selectedDate,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<confirmStepSchemaProps>({
    resolver: zodResolver(confirmStepSchema),
  })

  async function handleConfirmSchedule(data: confirmStepSchemaProps) {}

  function handleCancelSchedule() {
    onSelectDateTime(null)
  }

  const longDate = dayjs(selectedDate).format('DD[ de ]MMMM[ de ]YYYY')
  const hour = dayjs(selectedDate).format('HH:mm[h]')

  return (
    <div className="flex w-[540px] flex-col p-6">
      <header className="flex gap-4 border-b border-gray-600 pb-6">
        <div className="flex items-center gap-2 text-base leading-relaxed text-gray-50">
          <Calendar className="h-5 w-5 text-gray-200" />
          {longDate}
        </div>
        <div className="flex items-center gap-2 text-base leading-relaxed text-gray-50">
          <Clock className="h-5 w-5 text-gray-200" />
          {hour}
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
          <Button variant="ghost" size="lg" onClick={handleCancelSchedule}>
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
