'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { weekDays } from '@/utils/get-week-day'

const schema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 30 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário do término de ser ao menos 30 minutos depois do inicio',
      },
    ),
})
type PropsInput = z.input<typeof schema>
type PropsOutput = z.output<typeof schema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<PropsInput, any, PropsOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })
  const intervals = watch('intervals')

  async function SetTimeIntervals(data: PropsOutput) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(SetTimeIntervals)}
      className="flex w-full flex-col items-start gap-4"
    >
      <div className="flex w-full flex-col items-start rounded-md border border-gray-600">
        {fields.map((field, index) => (
          <label
            key={field.id}
            htmlFor={weekDays[field.weekDay]}
            className="flex w-full cursor-pointer items-center justify-between border-t border-gray-600 px-4 py-3 first:border-0"
          >
            <div className="flex w-full items-center gap-3">
              <Controller
                control={control}
                name={`intervals.${index}.enabled`}
                render={(checkbox) => (
                  <Checkbox
                    checked={checkbox.field.value}
                    onCheckedChange={(checked) => {
                      checkbox.field.onChange(checked === true)
                    }}
                    id={weekDays[field.weekDay]}
                  />
                )}
              />
              <span className="text-base leading-relaxed text-gray-100">
                {weekDays[field.weekDay]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                step={60}
                className="h-9 px-2"
                disabled={intervals[index].enabled === false}
                {...register(`intervals.${index}.startTime`)}
              />
              <Input
                type="time"
                step={60}
                className="h-9 px-2"
                disabled={intervals[index].enabled === false}
                {...register(`intervals.${index}.endTime`)}
              />
            </div>
          </label>
        ))}
      </div>
      <span className="text-sm text-red-500">
        {errors.intervals?.root?.message}
      </span>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        Proximo passo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
