import { z } from 'zod'

export const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  roleId: z.number({ error: 'Role is required' }),
})

export type ProfileFormT = z.infer<typeof schema>
