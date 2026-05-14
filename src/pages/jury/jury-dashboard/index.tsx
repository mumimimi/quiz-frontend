import { JSX } from 'react'
import StatusBadge from 'src/components/status-badge'
import { useJuryDashboard } from './use-jury-dashboard'

const JuryDashboard = (): JSX.Element => {
  const { assignments, isLoading, isError, roundGroups, handleNavigateToRound } = useJuryDashboard()

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
        <span className="text-red-400 text-sm">Failed to load assignments</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">My Assignments</h1>
          <p className="text-[#555] text-sm mt-1">
            {assignments.length} total submission{assignments.length !== 1 ? 's' : ''} to evaluate
          </p>
        </div>

        {roundGroups.length === 0 ? (
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-8 text-center">
            <p className="text-[#555] text-sm">No assignments yet.</p>
            <p className="text-[#444] text-xs mt-1">
              You will be assigned submissions once jury assignment runs.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {roundGroups.map(({ round, count }) => (
              <div
                key={round.id}
                onClick={() => handleNavigateToRound(round.id)}
                className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#2a2a2a] transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium">{round.name}</span>
                  <span className="text-[#555] text-xs">
                    {count} submission{count !== 1 ? 's' : ''} assigned
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={round.status} />
                  <span className="text-[#555] text-xs">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JuryDashboard
