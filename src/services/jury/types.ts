export type CreateEvaluationPayloadT = {
  assignmentId: number
  backendQuality: number
  databaseStructure: number
  frontendQuality: number
  requirementsCompletion: number
  functionality: number
  usability: number
  comment?: string
}

export type UpdateEvaluationPayloadT = {
  id: number
  backendQuality?: number
  databaseStructure?: number
  frontendQuality?: number
  requirementsCompletion?: number
  functionality?: number
  usability?: number
  comment?: string
}
