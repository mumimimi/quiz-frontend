import { JSX } from 'react'
import dayjs from 'dayjs'
import { IoArrowBack, IoLinkOutline, IoLockClosedOutline } from 'react-icons/io5'
import { EvaluationT } from 'src/types'
import { useAdminSubmissionDetailPage } from './use-admin-submission-detail-page'

const ScoreCell = ({
  label,
  value,
}: {
  label: string
  value: number
}): JSX.Element => (
  <div>
    <span className="text-xs text-[#555]">{label}</span>
    <p className="text-[#aaa] text-sm mt-0.5">{value}</p>
  </div>
)

const AdminSubmissionDetailPage = (): JSX.Element => {
  const { submission, evaluations, isLoading, isError, handleBack } =
    useAdminSubmissionDetailPage()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">Loading…</span>
      </div>
    )
  }

  if (isError || !submission) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-400 text-sm">Failed to load submission</span>
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
            {submission.round?.name ?? 'Round'}
          </button>

          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-white text-2xl font-semibold">
                {submission.team?.name ?? `Submission #${submission.id}`}
              </h1>

              <p className="text-[#555] text-xs mt-1">
                Submitted{' '}
                {dayjs(submission.submittedAt).format('DD MMM YYYY, HH:mm')}
              </p>
            </div>

            {submission.isLocked && (
              <div className="flex items-center gap-2 bg-orange-900/20 border border-orange-900/40 rounded-lg px-3 py-1.5 shrink-0">
                <IoLockClosedOutline size={14} className="text-orange-400" />
                <span className="text-orange-300 text-xs">Locked</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-white text-sm font-medium">Submission data</h2>

          <div className="flex flex-col gap-2">
            {[
              { label: 'GitHub', url: submission.githubUrl },
              { label: 'Video demo', url: submission.videoDemoUrl },
              ...(submission.liveDemoUrl
                ? [{ label: 'Live demo', url: submission.liveDemoUrl }]
                : []),
            ].map(({ label, url }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-xs text-[#555] w-20 shrink-0">{label}</span>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
                >
                  <IoLinkOutline size={14} className="shrink-0" />
                  {url}
                </a>
              </div>
            ))}
          </div>

          {submission.description && (
            <div className="pt-3 border-t border-[#1d1d1d]">
              <span className="text-xs text-[#555] uppercase tracking-wider">
                Description
              </span>

              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {submission.description}
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-white font-medium mb-3">
            Evaluations{' '}
            <span className="text-[#555] font-normal text-sm">
              ({evaluations.length})
            </span>
          </h2>

          {evaluations.length === 0 ? (
            <p className="text-[#555] text-sm">No evaluations yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {evaluations.map((ev: EvaluationT) => (
                <div
                  key={ev.id}
                  className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white text-sm font-medium">
                        {ev.assignment?.juryMember.firstName}{' '}
                        {ev.assignment?.juryMember.lastName}
                      </span>

                      <p className="text-[#555] text-xs mt-0.5">
                        {ev.assignment?.juryMember.email}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-bold text-lg">
                        {ev.totalScore.toFixed(1)}
                      </p>

                      <p className="text-[#555] text-xs">total score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#1d1d1d]">
                    <ScoreCell label="Backend quality" value={ev.backendQuality} />
                    <ScoreCell
                      label="Database structure"
                      value={ev.databaseStructure}
                    />
                    <ScoreCell label="Frontend quality" value={ev.frontendQuality} />
                    <ScoreCell
                      label="Requirements"
                      value={ev.requirementsCompletion}
                    />
                    <ScoreCell label="Functionality" value={ev.functionality} />
                    <ScoreCell label="Usability" value={ev.usability} />
                  </div>

                  {ev.comment && (
                    <div className="pt-2 border-t border-[#1d1d1d]">
                      <span className="text-xs text-[#555]">Comment</span>
                      <p className="text-[#ccc] text-sm mt-0.5 whitespace-pre-wrap">
                        {ev.comment}
                      </p>
                    </div>
                  )}

                  <p className="text-[#555] text-xs">
                    Evaluated {dayjs(ev.evaluatedAt).format('DD MMM YYYY, HH:mm')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSubmissionDetailPage
