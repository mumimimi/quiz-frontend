import { JSX } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import StatusBadge from 'src/components/status-badge'
import {
  IoArrowBack,
  IoPencilOutline,
  IoTrashOutline,
  IoLinkOutline,
  IoLockClosedOutline,
  IoAddCircleOutline,
} from 'react-icons/io5'
import { useAdminRoundDetailPage } from './use-admin-round-detail-page'

const AdminRoundDetailPage = (): JSX.Element => {
  const {
    round,
    submissions,
    isLoading,
    isError,
    actionResult,
    nextStatus,
    statusLabel,
    isSubmissionClosed,
    isEvaluated,
    handleBack,
    handleEdit,
    handleCreateNextRound,
    handleNavigateToSubmission,
    handleChangeStatus,
    handleAssignJury,
    handleFinalizeRound,
    handleDelete,
  } = useAdminRoundDetailPage()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">{t('common.loading')}</span>
      </div>
    )
  }

  if (isError || !round) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-400 text-sm">{t('admin.roundDetail.roundNotFound')}</span>
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
            {round.tournament ? round.tournament.name : t('tournaments.title')}
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-white text-2xl font-semibold">{round.name}</h1>

              <StatusBadge status={round.status} className="shrink-0" />
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

              {nextStatus && statusLabel && (
                <button
                  onClick={handleChangeStatus}
                  className="text-xs bg-white text-black font-medium px-4 py-1.5 rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer"
                >
                  {statusLabel}
                </button>
              )}

              {isEvaluated && (
                <button
                  onClick={handleCreateNextRound}
                  className="flex items-center gap-1.5 text-xs text-white bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <IoAddCircleOutline size={14} />
                  {t('admin.roundDetail.createNextRound')}
                </button>
              )}

              {isSubmissionClosed && (
                <>
                  <button
                    onClick={handleAssignJury}
                    className="text-xs border border-[#2a2a2a] text-[#888] px-4 py-1.5 rounded-lg hover:text-white hover:border-[#444] transition-colors cursor-pointer"
                  >
                    {t('admin.roundDetail.assignJury')}
                  </button>

                  <button
                    onClick={handleFinalizeRound}
                    className="text-xs border border-orange-900/50 text-orange-400 px-4 py-1.5 rounded-lg hover:bg-orange-900/20 transition-colors cursor-pointer"
                  >
                    {t('admin.roundDetail.finalizeRound')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {actionResult && (
          <div className="bg-green-900/20 border border-green-900/40 rounded-lg px-4 py-3">
            <p className="text-green-400 text-sm">{actionResult}</p>
          </div>
        )}

        <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
          {round.description && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('admin.roundDetail.description')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {round.description}
              </p>
            </div>
          )}

          {round.technologyRequirements && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('admin.roundDetail.technologyRequirements')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {round.technologyRequirements}
              </p>
            </div>
          )}

          {round.mustHaveCriteria.length > 0 && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('admin.roundDetail.mustHaveCriteria')}
              </span>
              <ul className="mt-2 flex flex-col gap-1">
                {round.mustHaveCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#ccc]">
                    <span className="text-[#555] mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {round.referenceLinks && round.referenceLinks.length > 0 && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('admin.roundDetail.referenceLinks')}
              </span>
              <ul className="mt-2 flex flex-col gap-1.5">
                {round.referenceLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <IoLinkOutline size={14} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#1d1d1d]">
            <div>
              <span className="text-xs text-[#555]">{t('admin.roundDetail.startTime')}</span>

              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(round.startTime).format('DD MMM YYYY, HH:mm')}
              </p>
            </div>

            <div>
              <span className="text-xs text-[#555]">{t('admin.roundDetail.submissionDeadline')}</span>

              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(round.submissionDeadline).format('DD MMM YYYY, HH:mm')}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-medium mb-3">
            {t('admin.roundDetail.submissions')}{' '}
            <span className="text-[#555] font-normal text-sm">
              ({submissions.length})
            </span>
          </h2>

          {submissions.length === 0 ? (
            <p className="text-[#555] text-sm">{t('admin.roundDetail.noSubmissionsYet')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {submissions.map(s => (
                <div
                  key={s.id}
                  onClick={() => handleNavigateToSubmission(s.id)}
                  className="bg-[#181818] border border-[#1d1d1d] rounded-xl px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:border-[#2a2a2a] transition-colors"
                >
                  <div>
                    <span className="text-white text-sm">
                      {s.team?.name ?? `Submission #${s.id}`}
                    </span>

                    <p className="text-[#555] text-xs mt-0.5">
                      {t('admin.roundDetail.submitted')}{' '}
                      {dayjs(s.submittedAt).format('DD MMM YYYY, HH:mm')}
                    </p>
                  </div>

                  {s.isLocked && (
                    <div className="flex items-center gap-1.5 text-orange-400 text-xs shrink-0">
                      <IoLockClosedOutline size={12} />
                      {t('admin.roundDetail.locked')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminRoundDetailPage
