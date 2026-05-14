export type UpsertSubmissionPayloadT = {
  roundId: number
  githubUrl: string
  videoDemoUrl: string
  liveDemoUrl?: string
  description?: string
}
