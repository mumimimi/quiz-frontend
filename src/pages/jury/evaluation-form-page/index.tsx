import { JSX } from 'react'
import { IoArrowBack, IoLinkOutline } from 'react-icons/io5'
import { useEvaluationFormPage } from './use-evaluation-form-page'
import type { ScoreKey } from './types'

const SCORE_FIELDS: { key: ScoreKey; label: string }[] = [
  { key: 'backendQuality', label: 'Backend Quality' },
  { key: 'databaseStructure', label: 'Database Structure' },
  { key: 'frontendQuality', label: 'Frontend Quality' },
  { key: 'requirementsCompletion', label: 'Requirements Completion' },
  { key: 'functionality', label: 'Functionality' },
  { key: 'usability', label: 'Usability' },
]

const EvaluationFormPage = (): JSX.Element => {
  const {
    assignment,
    isLoadingContext,
    stateAssignment,
    scores,
    comment,
    setComment,
    totalScore,
    isSubmitting,
    isEditMode,
    handleBack,
    handleSubmit,
    handleNumberInput,
    updateScore,
  } = useEvaluationFormPage()

  if (!stateAssignment && isLoadingContext) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">Loading…</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-[#555] hover:text-white text-sm mb-6 transition-colors cursor-pointer"
        >
          <IoArrowBack size={16} />
          Back
        </button>

        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-white text-2xl font-semibold">Evaluate Submission</h1>
          {assignment && (
            <p className="text-[#555] text-sm">{assignment.submission.team.name}</p>
          )}
        </div>

        {assignment && (
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-4 flex flex-col gap-2 mb-4">
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
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-5">
            <h2 className="text-white text-sm font-medium">Scores (0 – 100)</h2>

            {SCORE_FIELDS.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#888]">{label}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={scores[key]}
                    onChange={e => handleNumberInput(key, e)}
                    onBlur={e => updateScore(key, Number(e.target.value))}
                    className="w-16 bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-2 py-1 text-sm text-white text-center outline-none focus:border-[#444] [color-scheme:dark]"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={scores[key]}
                  onChange={e => updateScore(key, Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-white"
                  style={{
                    background: `linear-gradient(to right, white ${scores[key]}%, #333 ${scores[key]}%)`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex items-center justify-between">
            <span className="text-[#888] text-sm">Total score (average)</span>
            <span
              className={`text-2xl font-bold ${
                totalScore > 70
                  ? 'text-green-400'
                  : totalScore > 40
                    ? 'text-yellow-400'
                    : 'text-red-400'
              }`}
            >
              {totalScore.toFixed(1)}
            </span>
          </div>

          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-2">
            <label className="text-xs text-[#888]">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
              placeholder="General feedback on the submission…"
              className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating…'
                : 'Submitting…'
              : isEditMode
                ? 'Update Evaluation'
                : 'Submit Evaluation'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EvaluationFormPage
