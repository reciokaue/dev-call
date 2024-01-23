import { z } from 'zod'

export const confirmStepSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Letras de A-Z e "-"' })
    .toLowerCase(),
  email: z.string().email('Digite um email valido'),
  observations: z.string().nullable(),
})
export type confirmStepSchemaProps = z.infer<typeof confirmStepSchema>
