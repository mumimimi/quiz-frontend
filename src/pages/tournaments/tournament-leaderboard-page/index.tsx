import { JSX } from 'react'
import ScoreBar from 'src/components/score-bar'
import { LeaderboardEntryT } from 'src/services/leaderboard/types'
import { IoArrowBack } from 'react-icons/io5'
import { useTournamentLeaderboardPage } from './use-tournament-leaderboard-page'

const SCORE_COLS: { key: keyof LeaderboardEntryT; label: string }[] = [
  { key: 'backendQuality', label: 'Backend' },
  { key: 'databaseStructure', label: 'Database' },
  { key: 'frontendQuality', label: 'Frontend' },
  { key: 'requirementsCompletion', label: 'Requirements' },
  { key: 'functionality', label: 'Functionality' },
  { key: 'usability', label: 'Usability' },
]

const RankBadge = ({ rank }: { rank: number }): JSX.Element => {
  if (rank === 1) return <span className="text-xl">🥇</span>
  if (rank === 2) return <span className="text-xl">🥈</span>
  if (rank === 3) return <span className="text-xl">🥉</span>
  return <span className="text-[#555] text-sm font-medium w-7 text-center">{rank}</span>
}

const TournamentLeaderboardPage = (): JSX.Element => {
  const { entries, isLoading, isError, handleBack } = useTournamentLeaderboardPage()

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
        <span className="text-red-400 text-sm">Failed to load leaderboard</span>
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
            Tournament
          </button>
          <h1 className="text-white text-2xl font-semibold">Leaderboard</h1>
          <p className="text-[#555] text-sm mt-0.5">
            {entries.length} team{entries.length !== 1 ? 's' : ''} ranked
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-8 text-center">
            <p className="text-[#555] text-sm">No results yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map(entry => (
              <EntryCard key={entry.team.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const EntryCard = ({ entry }: { entry: LeaderboardEntryT }): JSX.Element => (
  <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-8 shrink-0">
        <RankBadge rank={entry.rank} />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-white font-medium truncate block">{entry.team.name}</span>
        <span className="text-[#555] text-xs">
          {[
            entry.team.city,
            entry.team.school,
            `${entry.evaluationCount} evaluation${entry.evaluationCount !== 1 ? 's' : ''}`,
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
      </div>
      <div className="text-right shrink-0">
        <span
          className={`text-2xl font-bold ${
            entry.totalScore > 70
              ? 'text-green-400'
              : entry.totalScore > 40
                ? 'text-yellow-400'
                : 'text-red-400'
          }`}
        >
          {entry.totalScore.toFixed(1)}
        </span>
        <p className="text-[#555] text-xs">avg score</p>
      </div>
    </div>

    <ScoreBar value={entry.totalScore} />

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 pt-1 border-t border-[#1d1d1d]">
      {SCORE_COLS.map(({ key, label }) => (
        <div key={key} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[#555] text-xs">{label}</span>
            <span className="text-[#aaa] text-xs">{(entry[key] as number).toFixed(1)}</span>
          </div>
          <ScoreBar value={entry[key] as number} />
        </div>
      ))}
    </div>
  </div>
)

export default TournamentLeaderboardPage
