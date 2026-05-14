import { JSX } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useTournamentFormPage } from './use-tournament-form-page'

const inputCls =
  'bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full [color-scheme:dark]'

const TournamentFormPage = (): JSX.Element => {
  const {
    isEdit,
    isLoadingData,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
  } = useTournamentFormPage()
  const { t } = useTranslation()

  if (isEdit && isLoadingData) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">{t('common.loading')}</span>
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
          {t('common.back')}
        </button>

        <h1 className="text-white text-2xl font-semibold mb-6">
          {isEdit ? t('tournamentForm.editTitle') : t('tournamentForm.createTitle')}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('tournamentForm.nameLabel')}</label>
              <input
                {...register('name')}
                placeholder="Cyber Quiz 2025"
                className={inputCls}
              />
              {errors.name && (
                <span className="text-xs text-red-400">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('tournamentForm.descriptionLabel')}</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder={t('tournamentForm.descriptionPlaceholder')}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('tournamentForm.rulesLabel')}</label>
              <textarea
                {...register('rules')}
                rows={5}
                placeholder={t('tournamentForm.rulesPlaceholder')}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('tournamentForm.maxCapacityLabel')}</label>
              <input
                {...register('maxTeamCapacity')}
                type="number"
                min={1}
                placeholder={t('tournamentForm.noLimit')}
                className={inputCls}
              />
            </div>
          </div>

          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-white text-sm font-medium">{t('tournamentForm.datesSection')}</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">{t('tournamentForm.registrationStart')}</label>
                <input {...register('registrationStartDate')} type="date" className={inputCls} />
                {errors.registrationStartDate && (
                  <span className="text-xs text-red-400">
                    {errors.registrationStartDate.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">{t('tournamentForm.registrationEnd')}</label>
                <input {...register('registrationEndDate')} type="date" className={inputCls} />
                {errors.registrationEndDate && (
                  <span className="text-xs text-red-400">
                    {errors.registrationEndDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('tournamentForm.startDateLabel')}</label>
              <input {...register('startDate')} type="date" className={inputCls} />
              {errors.startDate && (
                <span className="text-xs text-red-400">{errors.startDate.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting
              ? t('tournamentForm.saving')
              : isEdit
                ? t('tournamentForm.saveChanges')
                : t('tournamentForm.createButton')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TournamentFormPage
