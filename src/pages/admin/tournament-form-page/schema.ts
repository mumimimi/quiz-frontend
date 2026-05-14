import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  rules: z.string().optional(),
  registrationStartDate: z.string().min(1, 'Required'),
  registrationEndDate: z.string().min(1, 'Required'),
  startDate: z.string().min(1, 'Required'),
  maxTeamCapacity: z.string().optional(),
})

export type FormT = z.infer<typeof schema>
