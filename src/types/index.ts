import { RoundStatusEnum, TournamentStatusEnum, UserRoleEnum } from 'src/enums'

// ── User ──────────────────────────────────────────────────────────────────────

export type UserRoleT = {
  id: number
  role: UserRoleEnum
}

export type UserT = {
  id: number
  email: string
  firstName: string
  lastName: string
  roles: UserRoleT[]
}

// ── Tournament ────────────────────────────────────────────────────────────────

export type TournamentT = {
  id: number
  name: string
  description: string | null
  rules: string | null
  registrationStartDate: string
  registrationEndDate: string
  startDate: string
  endDate: string | null
  maxTeamCapacity: number | null
  status: TournamentStatusEnum
}

// ── Round ─────────────────────────────────────────────────────────────────────

export type RoundT = {
  id: number
  name: string
  description: string | null
  technologyRequirements: string | null
  mustHaveCriteria: string[]
  referenceLinks: string[] | null
  startTime: string
  submissionDeadline: string
  status: RoundStatusEnum
  tournament?: Pick<TournamentT, 'id' | 'name' | 'status'>
}

// ── Team ──────────────────────────────────────────────────────────────────────

export type TeamMemberT = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type TeamT = {
  id: number
  name: string
  city: string | null
  school: string | null
  telegramHandle: string | null
  discordHandle: string | null
  captain: Pick<UserT, 'id' | 'email' | 'firstName' | 'lastName'>
  members: TeamMemberT[]
  tournament?: Pick<TournamentT, 'id' | 'name' | 'status'>
}

// ── Submission ────────────────────────────────────────────────────────────────

export type SubmissionT = {
  id: number
  githubUrl: string
  videoDemoUrl: string
  liveDemoUrl: string | null
  description: string | null
  submittedAt: string
  isLocked: boolean
  team?: Pick<TeamT, 'id' | 'name'>
  round?: Pick<RoundT, 'id' | 'name' | 'status' | 'submissionDeadline'> & {
    tournament?: Pick<TournamentT, 'id'>
  }
}

// ── Evaluation ────────────────────────────────────────────────────────────────

export type EvaluationT = {
  id: number
  backendQuality: number
  databaseStructure: number
  frontendQuality: number
  requirementsCompletion: number
  functionality: number
  usability: number
  totalScore: number
  comment: string | null
  evaluatedAt: string
  assignment?: {
    id: number
    juryMember: Pick<UserT, 'id' | 'firstName' | 'lastName' | 'email'>
  }
}

// ── Jury Assignment ───────────────────────────────────────────────────────────

export type JuryAssignmentT = {
  id: number
  submission: Pick<SubmissionT, 'id' | 'githubUrl' | 'videoDemoUrl'> & {
    team: Pick<TeamT, 'id' | 'name'>
  }
  round?: Pick<RoundT, 'id' | 'name' | 'status'>
  evaluation?: Pick<
    EvaluationT,
    | 'id'
    | 'totalScore'
    | 'backendQuality'
    | 'databaseStructure'
    | 'frontendQuality'
    | 'requirementsCompletion'
    | 'functionality'
    | 'usability'
    | 'comment'
  >
}

// ── Shared ────────────────────────────────────────────────────────────────────

export type DateRangeT = {
  from: Date
  to: Date
}
