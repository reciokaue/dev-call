import { z } from 'zod'

import { convertTimeStringToMinutes } from '../convert-time-string-to-minutes'

export const timeIntervalsSchema = z.object({
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
export type TimeIntervalsPropsInput = z.input<typeof timeIntervalsSchema>
export type TimeIntervalsPropsOutput = z.output<typeof timeIntervalsSchema>
