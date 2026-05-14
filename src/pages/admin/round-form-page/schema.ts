import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  technologyRequirements: z.string().optional(),
  startTime: z.string().min(1, 'Required'),
  submissionDeadline: z.string().min(1, 'Required'),
})

export type FormT = z.infer<typeof schema>
