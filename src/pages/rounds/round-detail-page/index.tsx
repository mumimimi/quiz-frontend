import { JSX } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import StatusBadge from 'src/components/status-badge'
import { RoundStatusEnum } from 'src/enums'
import { IoArrowBack, IoLinkOutline, IoLockClosedOutline } from 'react-icons/io5'
import { useRoundDetailPage } from './use-round-detail-page'

const inputCls =
  'bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full'

const RoundDetailPage = (): JSX.Element => {
  const {
    round,
    isLoading,
    isError,
    submission,
    isPastDeadline,
    canSubmit,
    showSubmissionForm,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
  } = useRoundDetailPage()
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
        <span className="text-red-400 text-sm">{t('round.failedToLoad')}</span>
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
            {round.tournament ? round.tournament.name : t('round.allTournaments')}
          </button>

          <div className="flex items-center justify-between gap-4">
            <h1 className="text-white text-2xl font-semibold">{round.name}</h1>
            <StatusBadge status={round.status} className="shrink-0" />
          </div>
        </div>

        <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
          {round.description && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('round.description')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">{round.description}</p>
            </div>
          )}

          {round.technologyRequirements && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('round.technologyRequirements')}
              </span>
              <p className="text-[#ccc] text-sm mt-1 whitespace-pre-wrap">
                {round.technologyRequirements}
              </p>
            </div>
          )}

          {round.mustHaveCriteria.length > 0 && (
            <div>
              <span className="text-xs text-[#555] uppercase tracking-wider">
                {t('round.mustHaveCriteria')}
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
                {t('round.referenceLinks')}
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
              <span className="text-xs text-[#555]">{t('round.startTime')}</span>
              <p className="text-[#aaa] text-sm mt-0.5">
                {dayjs(round.startTime).format('DD MMM YYYY, HH:mm')}
              </p>
            </div>
            <div>
              <span className="text-xs text-[#555]">{t('round.submissionDeadline')}</span>
              <p className={`text-sm mt-0.5 ${isPastDeadline ? 'text-red-400' : 'text-[#aaa]'}`}>
                {dayjs(round.submissionDeadline).format('DD MMM YYYY, HH:mm')}
              </p>
            </div>
          </div>
        </div>

        {showSubmissionForm && (
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-white font-medium text-sm">{t('round.yourSubmission')}</h2>

            {submission?.isLocked && (
              <div className="flex items-center gap-2 bg-orange-900/20 border border-orange-900/40 rounded-lg px-3 py-2.5">
                <IoLockClosedOutline size={14} className="text-orange-400 shrink-0" />
                <span className="text-orange-300 text-xs">
                  {t('round.submissionLocked')}
                </span>
              </div>
            )}

            {submission && (
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
                {t('round.savedAt', { date: dayjs(submission.submittedAt).format('DD MMM YYYY, HH:mm') })}
              </div>
            )}

            {!canSubmit && !submission?.isLocked && (
              <p className="text-[#555] text-xs">
                {round.status !== RoundStatusEnum.ACTIVE
                  ? t('round.submissionsOnlyActive')
                  : t('round.deadlinePassed')}
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">{t('round.githubUrlLabel')}</label>
                <input
                  {...register('githubUrl')}
                  placeholder="https://github.com/..."
                  disabled={!canSubmit || submission?.isLocked}
                  className={inputCls}
                />
                {errors.githubUrl && (
                  <span className="text-xs text-red-400">{errors.githubUrl.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">{t('round.videoDemoUrlLabel')}</label>
                <input
                  {...register('videoDemoUrl')}
                  placeholder="https://youtube.com/..."
                  disabled={!canSubmit || submission?.isLocked}
                  className={inputCls}
                />
                {errors.videoDemoUrl && (
                  <span className="text-xs text-red-400">{errors.videoDemoUrl.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">{t('round.liveDemoUrlLabel')}</label>
                <input
                  {...register('liveDemoUrl')}
                  placeholder="https://..."
                  disabled={!canSubmit || submission?.isLocked}
                  className={inputCls}
                />
                {errors.liveDemoUrl && (
                  <span className="text-xs text-red-400">{errors.liveDemoUrl.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">{t('round.descriptionLabel')}</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Brief description of your project…"
                  disabled={!canSubmit || submission?.isLocked}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {canSubmit && !submission?.isLocked && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 bg-white text-black text-sm font-medium py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting
                    ? t('round.saving')
                    : submission
                      ? t('round.updateSubmission')
                      : t('round.submit')}
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoundDetailPage
