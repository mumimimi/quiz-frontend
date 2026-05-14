import { JSX } from 'react'
import dayjs from 'dayjs'
import StatusBadge from 'src/components/status-badge'
import { useTournamentListPage } from './use-tournament-list-page'

const TournamentListPage = (): JSX.Element => {
  const { tournaments, isLoading, isError, toDetail } = useTournamentListPage()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">Loading…</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-400 text-sm">Failed to load tournaments</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-6">Tournaments</h1>

        {tournaments.length === 0 ? (
          <p className="text-[#555] text-sm">No tournaments yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {tournaments.map(t => (
              <div
                key={t.id}
                onClick={() => toDetail(t.id)}
                className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 cursor-pointer hover:border-[#333] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-white font-medium text-base truncate">{t.name}</span>
                    {t.description && (
                      <span className="text-[#666] text-sm line-clamp-2">{t.description}</span>
                    )}
                  </div>
                  <StatusBadge status={t.status} className="shrink-0" />
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#555]">
                  <span>
                    Registration:{' '}
                    <span className="text-[#888]">
                      {dayjs(t.registrationStartDate).format('DD MMM')} –{' '}
                      {dayjs(t.registrationEndDate).format('DD MMM YYYY')}
                    </span>
                  </span>
                  <span>
                    Start:{' '}
                    <span className="text-[#888]">{dayjs(t.startDate).format('DD MMM YYYY')}</span>
                  </span>
                  {t.maxTeamCapacity && (
                    <span>
                      Max teams: <span className="text-[#888]">{t.maxTeamCapacity}</span>
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
