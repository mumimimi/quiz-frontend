import { JSX } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import StatusBadge from 'src/components/status-badge'
import { IoArrowBack, IoTrophyOutline } from 'react-icons/io5'
import { useTournamentDetailPage } from './use-tournament-detail-page'

const TournamentDetailPage = (): JSX.Element => {
  const {
    tournament,
    rounds,
    isLoading,
    isError,
    hasResults,
    canRegister,
    handleBack,
    toRound,
    toLeaderboard,
    toRegister,
  } = useTournamentDetailPage()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">{t('common.loading')}</span>
      </div>
    )
  }

  if (isError || !tournament) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-400 text-sm">{t('tournaments.failedToLoadSingle')}</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[#555] hover:text-white text-sm mb-4 transition-colors cursor-pointer"
          >
            <IoArrowBack size={16} />
            {t('tournaments.allTournaments')}
          </button>

          <div className="flex items-start justify-between gap-4">
            <h1 className="text-white text-2xl font-semibold">{tournament.name}</h1>
            <div className="flex items-center gap-2 shrink-0">
              {hasResults && (
                <button
                  onClick={toLeaderboard}
                  className="flex items-center gap-1.5 text-xs text-yellow-300 border border-yellow-900/50 bg-yellow-900/20 px-3 py-1.5 rounded-lg hover:bg-yellow-900/40 transition-colors cursor-pointer"
                >
                  <IoTrophyOutline size={14} />
                  {t('tournaments.leaderboard')}
                </button>
              )}
              {canRegister && (
                <button
                  onClick={toRegister}
                  className="text-xs text-white bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {t('tournaments.registerTeam')}
                </button>
              )}
              <StatusBadge status={tournament.status} />
            </div>
          </div>
        </div>

        <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
          {tournament.description && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('tournaments.description')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {tournament.description}
              </p>
            </div>
          )}

          {tournament.rules && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('tournaments.rules')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">{tournament.rules}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#1d1d1d]">
            <div>
              <span className="text-xs text-[#555]">{t('tournaments.registrationDates')}</span>
              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(tournament.registrationStartDate).format('DD MMM')} –{' '}
                {dayjs(tournament.registrationEndDate).format('DD MMM YYYY')}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#555]">{t('tournaments.startDate')}</span>
              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(tournament.startDate).format('DD MMM YYYY')}
              </p>
            </div>
            {tournament.endDate && (
              <div>
                <span className="text-xs text-[#555]">{t('tournaments.endDate')}</span>
                <p className="text-[#aaa] text-sm mt-0.5">
                  {dayjs(tournament.endDate).format('DD MMM YYYY')}
                </p>
              </div>
            )}
            {tournament.maxTeamCapacity && (
              <div>
                <span className="text-xs text-[#555]">{t('tournaments.maxTeamsCount')}</span>
                <p className="text-[#aaa] text-sm mt-0.5">{tournament.maxTeamCapacity}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-white font-medium mb-3">{t('tournaments.rounds')}</h2>

          {rounds.length === 0 ? (
            <p className="text-[#555] text-sm">{t('tournaments.noRoundsYet')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {rounds.map(round => (
                <div
                  key={round.id}
                  onClick={() => toRound(round.id)}
                  className="bg-[#181818] border border-[#1d1d1d] rounded-xl p-4 cursor-pointer hover:border-[#333] transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-white text-sm font-medium truncate">{round.name}</span>
                    <span className="text-[#555] text-xs">
                      {t('tournaments.deadline')}{' '}
                      {dayjs(round.submissionDeadline).format('DD MMM YYYY, HH:mm')}
                    </span>
                  </div>
                  <StatusBadge status={round.status} className="shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TournamentDetailPage
