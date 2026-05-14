import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(1, 'Required'),
  city: z.string().optional(),
  school: z.string().optional(),
  telegramHandle: z.string().optional(),
  discordHandle: z.string().optional(),
})

export type EditFormT = z.infer<typeof schema>
