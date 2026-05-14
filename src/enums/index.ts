export enum CacheKeys {
  GET_ME = 'get_me',
  GET_USER_ROLE = 'get_user_role',
  GET_TOURNAMENTS = 'get_tournaments',
  GET_TOURNAMENT = 'get_tournament',
  GET_ROUNDS_BY_TOURNAMENT = 'get_rounds_by_tournament',
  GET_ROUND = 'get_round',
  GET_TEAMS_BY_TOURNAMENT = 'get_teams_by_tournament',
  GET_TEAM = 'get_team',
  GET_SUBMISSIONS_BY_ROUND = 'get_submissions_by_round',
  GET_SUBMISSION = 'get_submission',
  GET_LEADERBOARD_BY_TOURNAMENT = 'get_leaderboard_by_tournament',
  GET_LEADERBOARD_BY_ROUND = 'get_leaderboard_by_round',
  GET_MY_ASSIGNMENTS = 'get_my_assignments',
  GET_EVALUATIONS_BY_SUBMISSION = 'get_evaluations_by_submission',
}

export enum EnvModEnum {
  PROD = 'production',
  DEV = 'development',
}

export enum ModalsEnum {
  TEMPLATE = 'template',
  DARK_DATE_PICKER_MODAL = 'dark_date_picker_modal',
  CONFIRM_DIALOG = 'confirm_dialog',
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  TEAM = 'team',
  JURY = 'jury',
}

export enum TournamentStatusEnum {
  DRAFT = 'draft',
  REGISTRATION = 'registration',
  RUNNING = 'running',
  FINISHED = 'finished',
}

export enum RoundStatusEnum {
  DRAFT = 'draft',
  ACTIVE = 'active',
  SUBMISSION_CLOSED = 'submission_closed',
  EVALUATED = 'evaluated',
}
