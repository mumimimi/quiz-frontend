export enum FetchEndpointEnum {
  AUTH_REGISTER = '/auth/register',
  AUTH_LOGIN = '/auth/login',
  AUTH_REFRESH_TOKEN = '/auth/refresh-token',
  AUTH_LOGOUT = '/auth/log-out',

  USER_ME = '/user/me',

  USER_ROLE = '/user-role',

  TOURNAMENT = '/tournament',
  TOURNAMENT_ALL = '/tournament/all',

  ROUND = 'round',
  ROUND_ALL = '/round/all',
  ROUND_STATUS = '/round/status',
  ROUND_FINALIZE = '/round/finalize',

  TEAM = '/team',
  TEAM_ALL = '/team/all',

  SUBMISSION = '/submission',
  SUBMISSION_ALL = '/submission/all',

  JURY_ASSIGN = '/jury/assign',
  JURY_MY_ASSIGNMENTS = '/jury/my-assignments',
  EVALUATION = '/evaluation',

  LEADERBOARD_TOURNAMENT = '/leaderboard/tournament',
  LEADERBOARD_ROUND = '/leaderboard/round',
}
