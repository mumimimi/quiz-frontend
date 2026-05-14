import { JSX } from 'react'
import StatusBadge from 'src/components/status-badge'
import { IoArrowBack, IoLinkOutline } from 'react-icons/io5'
import type { AssignmentCardProps } from './types'
import { useJuryRoundPage } from './use-jury-round-page'

const AssignmentCard = ({
  assignment,
  onEvaluate,
}: AssignmentCardProps): JSX.Element => {
  const isEvaluated = assignment.evaluation != null

  return (
    <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-white font-medium">
            {assignment.submission.team.name}
          </span>

          {isEvaluated && assignment.evaluation && (
            <p className="text-green-400 text-xs mt-0.5">
              Evaluated · score {assignment.evaluation.totalScore.toFixed(1)}
            </p>
          )}

          {!isEvaluated && (
            <p className="text-[#555] text-xs mt-0.5">Pending evaluation</p>
          )}
        </div>
        <button
          onClick={onEvaluate}
          className="text-xs bg-white text-black font-medium px-4 py-1.5 rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer shrink-0"
        >
          {isEvaluated ? 'Edit Evaluation' : 'Evaluate'}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 pt-3 border-t border-[#1d1d1d]">
        {[
          { label: 'GitHub', url: assignment.submission.githubUrl },
          { label: 'Video', url: assignment.submission.videoDemoUrl },
        ].map(({ label, url }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-[#555] w-12 shrink-0">{label}</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors truncate"
            >
              <IoLinkOutline size={12} className="shrink-0" />
              {url}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

const JuryRoundPage = (): JSX.Element => {
  const {
    assignments,
    isLoading,
    isError,
    round,
    evaluatedCount,
    handleBack,
    handleEvaluate,
  } = useJuryRoundPage()

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
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[#555] hover:text-white text-sm mb-4 transition-colors cursor-pointer"
          >
            <IoArrowBack size={16} />
            All rounds
          </button>

          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-white text-2xl font-semibold">
                {round?.name ?? 'Round'}
              </h1>
              <p className="text-[#555] text-sm mt-0.5">
                {evaluatedCount} / {assignments.length} evaluated
              </p>
            </div>
            {round && <StatusBadge status={round.status} />}
          </div>
        </div>

        {assignments.length === 0 ? (
          <p className="text-[#555] text-sm">No assignments for this round.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {assignments.map(a => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                onEvaluate={() => handleEvaluate(a.id, a)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JuryRoundPage
