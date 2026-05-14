export enum RoutesEnum {
  // Auth
  AUTH_LOGIN = '/auth/login',
  AUTH_REGISTER = '/auth/register',

  // Common
  TOURNAMENTS = '/tournaments',
  TOURNAMENT_DETAIL = '/tournaments/:tournamentId',
  TOURNAMENT_LEADERBOARD = '/tournaments/:tournamentId/leaderboard',

  // Team
  TEAM_REGISTER = '/tournaments/:tournamentId/register',
  TEAM_DETAIL = '/team/:teamId',
  ROUND_DETAIL = '/rounds/:roundId',
  ROUND_LEADERBOARD = '/rounds/:roundId/leaderboard',

  // Jury
  JURY = '/jury',
  JURY_ROUND = '/jury/rounds/:roundId',
  JURY_EVALUATE = '/jury/evaluate/:assignmentId',

  // Profile
  PROFILE = '/profile',

  // Admin
  ADMIN = '/admin',
  ADMIN_TOURNAMENTS = '/admin/tournaments',
  ADMIN_TOURNAMENTS_CREATE = '/admin/tournaments/create',
  ADMIN_TOURNAMENT_DETAIL = '/admin/tournaments/:tournamentId',
  ADMIN_TOURNAMENT_EDIT = '/admin/tournaments/:tournamentId/edit',
  ADMIN_ROUNDS_CREATE = '/admin/tournaments/:tournamentId/rounds/create',
  ADMIN_ROUND_DETAIL = '/admin/tournaments/:tournamentId/rounds/:roundId',
  ADMIN_ROUND_EDIT = '/admin/tournaments/:tournamentId/rounds/:roundId/edit',
  ADMIN_SUBMISSION_DETAIL = '/admin/submissions/:submissionId',
}
