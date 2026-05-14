import { JuryAssignmentT } from 'src/types'

export type ScoreKey =
  | 'backendQuality'
  | 'databaseStructure'
  | 'frontendQuality'
  | 'requirementsCompletion'
  | 'functionality'
  | 'usability'

export type Scores = Record<ScoreKey, number>

export type LocationState = { assignment?: JuryAssignmentT } | null
