import { z } from 'zod'

export const memberSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
})

export const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  city: z.string().optional(),
  school: z.string().optional(),
  telegramHandle: z.string().optional(),
  discordHandle: z.string().optional(),
  members: z.array(memberSchema).min(2, 'At least 2 members required'),
})

export type TeamRegisterFormT = z.infer<typeof schema>
