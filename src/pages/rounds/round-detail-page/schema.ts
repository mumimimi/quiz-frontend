import { z } from 'zod'

export const submissionSchema = z.object({
  githubUrl: z.string().url('Must be a valid URL'),
  videoDemoUrl: z.string().url('Must be a valid URL'),
  liveDemoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
})

export type SubmissionFormT = z.infer<typeof submissionSchema>
