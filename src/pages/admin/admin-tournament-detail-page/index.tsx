import { JSX } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import StatusBadge from 'src/components/status-badge'
import { IoArrowBack, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import { useAdminTournamentDetailPage } from './use-admin-tournament-detail-page'

const AdminTournamentDetailPage = (): JSX.Element => {
  const {
    tournament,
    rounds,
    teams,
    isLoading,
    isError,
    nextStatus,
    buttonLabel,
    handleBack,
    handleEdit,
    handleAddRound,
    handleNavigateToRound,
    handleNavigateToTeam,
    handleChangeStatus,
    handleDelete,
  } = useAdminTournamentDetailPage()
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
        <span className="text-red-400 text-sm">{t('admin.tournamentDetail.tournamentNotFound')}</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[#555] hover:text-white text-sm mb-4 transition-colors cursor-pointer"
          >
            <IoArrowBack size={16} />
            {t('admin.tournamentDetail.allTournaments')}
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-white text-2xl font-semibold">
                {tournament.name}
              </h1>
              <StatusBadge status={tournament.status} className="shrink-0" />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 text-xs text-[#888] border border-[#2a2a2a] px-3 py-1.5 rounded-lg hover:text-red-400 hover:border-red-400 transition-colors cursor-pointer"
              >
                <IoTrashOutline size={14} />
                {t('common.delete')}
              </button>

              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 text-xs text-[#888] border border-[#2a2a2a] px-3 py-1.5 rounded-lg hover:text-white hover:border-[#444] transition-colors cursor-pointer"
              >
                <IoPencilOutline size={14} />
                {t('common.edit')}
              </button>

              {nextStatus && buttonLabel && (
                <button
                  onClick={handleChangeStatus}
                  className="text-xs bg-white text-black font-medium px-4 py-1.5 rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer"
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
          {tournament.description && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('admin.tournamentDetail.description')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {tournament.description}
              </p>
            </div>
          )}

          {tournament.rules && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('admin.tournamentDetail.rules')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {tournament.rules}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1d1d1d]">
            <div>
              <span className="text-xs text-[#555]">{t('admin.tournamentDetail.registration')}</span>
              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(tournament.registrationStartDate).format('DD MMM')} –{' '}
                {dayjs(tournament.registrationEndDate).format('DD MMM YYYY')}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#555]">{t('admin.tournamentDetail.startDate')}</span>
              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(tournament.startDate).format('DD MMM YYYY')}
              </p>
            </div>
            {tournament.maxTeamCapacity != null && (
              <div>
                <span className="text-xs text-[#555]">{t('admin.tournamentDetail.maxTeams')}</span>
                <p className="text-[#aaa] text-sm mt-0.5">
                  {tournament.maxTeamCapacity}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-medium">
              {t('tournaments.rounds')}{' '}
              <span className="text-[#555] font-normal text-sm">
                ({rounds.length})
              </span>
            </h2>
            <button
              onClick={handleAddRound}
              className="text-xs bg-white text-black font-medium px-3 py-1.5 rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer"
            >
              {t('admin.tournamentDetail.addRound')}
            </button>
          </div>

          {rounds.length === 0 ? (
            <p className="text-[#555] text-sm">{t('admin.tournamentDetail.noRoundsYet')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {rounds.map(r => (
                <div
                  key={r.id}
                  onClick={() => handleNavigateToRound(r.id)}
                  className="bg-[#181818] border border-[#1d1d1d] rounded-xl px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:border-[#2a2a2a] transition-colors"
                >
                  <div>
                    <span className="text-white text-sm">{r.name}</span>
                    <p className="text-[#555] text-xs mt-0.5">
                      {t('admin.tournamentDetail.deadline')}{' '}
                      {dayjs(r.submissionDeadline).format('DD MMM YYYY, HH:mm')}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-white font-medium mb-3">
            {t('team.teams')}{' '}
            <span className="text-[#555] font-normal text-sm">({teams.length})</span>
          </h2>

          {teams.length === 0 ? (
            <p className="text-[#555] text-sm">{t('admin.tournamentDetail.noTeamsRegistered')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {teams.map(tm => (
                <div
                  key={tm.id}
                  onClick={() => handleNavigateToTeam(tm.id)}
                  className="bg-[#181818] border border-[#1d1d1d] rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-[#2a2a2a] transition-colors"
                >
                  <div>
                    <span className="text-white text-sm">{tm.name}</span>
                    {(tm.city || tm.school) && (
                      <p className="text-[#555] text-xs mt-0.5">
                        {[tm.city, tm.school].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTournamentDetailPage
