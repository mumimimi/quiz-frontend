import { JSX } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import StatusBadge from 'src/components/status-badge'
import { useTournamentListPage } from './use-tournament-list-page'

const TournamentListPage = (): JSX.Element => {
  const { tournaments, isLoading, isError, toDetail } = useTournamentListPage()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">{t('common.loading')}</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-400 text-sm">{t('tournaments.failedToLoad')}</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-6">{t('tournaments.title')}</h1>

        {tournaments.length === 0 ? (
          <p className="text-[#555] text-sm">{t('tournaments.noTournamentsYet')}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {tournaments.map(t_ => (
              <div
                key={t_.id}
                onClick={() => toDetail(t_.id)}
                className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 cursor-pointer hover:border-[#333] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-white font-medium text-base truncate">{t_.name}</span>
                    {t_.description && (
                      <span className="text-[#666] text-sm line-clamp-2">{t_.description}</span>
                    )}
                  </div>
                  <StatusBadge status={t_.status} className="shrink-0" />
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#555]">
                  <span>
                    {t('tournaments.registration')}{' '}
                    <span className="text-[#888]">
                      {dayjs(t_.registrationStartDate).format('DD MMM')} –{' '}
                      {dayjs(t_.registrationEndDate).format('DD MMM YYYY')}
                    </span>
                  </span>
                  <span>
                    {t('tournaments.start')}{' '}
                    <span className="text-[#888]">{dayjs(t_.startDate).format('DD MMM YYYY')}</span>
                  </span>
                  {t_.maxTeamCapacity && (
                    <span>
                      {t('tournaments.maxTeams')}{' '}
                      <span className="text-[#888]">{t_.maxTeamCapacity}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TournamentListPage
