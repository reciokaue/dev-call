'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { weekDays } from '@/utils/get-week-day'
import {
  TimeIntervalsPropsInput,
  TimeIntervalsPropsOutput,
  timeIntervalsSchema,
} from '@/utils/schemas/time-intervals'

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsPropsInput, any, TimeIntervalsPropsOutput>({
    resolver: zodResolver(timeIntervalsSchema),
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

  async function SetTimeIntervals(data: TimeIntervalsPropsOutput) {
    try {
      await api.post('/users/time-intervals', {
        formData: data,
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
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
