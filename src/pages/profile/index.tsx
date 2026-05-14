import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useProfilePage } from './use-profile-page'
import { cn } from 'src/utils/cn'

const inputCls =
  'bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full'

const ProfilePage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    isDirty,
    onSubmit,
    roles,
    selectedRoleId,
  } = useProfilePage()
  const { t } = useTranslation()

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <h1 className="text-white text-2xl font-semibold">{t('profile.title')}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('profile.firstName')}</label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="John"
                className={inputCls}
              />
              {errors.firstName && (
                <span className="text-xs text-red-400">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('profile.lastName')}</label>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Doe"
                className={inputCls}
              />
              {errors.lastName && (
                <span className="text-xs text-red-400">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">{t('profile.role')}</label>
              <div className="flex flex-wrap gap-2">
                {roles.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setValue('roleId', r.id, { shouldDirty: true })}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                      selectedRoleId === r.id
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-[#888] border-[#2a2a2a] hover:text-white hover:border-[#444]'
                    }`}
                  >
                    {r.role}
                  </button>
                ))}
              </div>
              {errors.roleId && (
                <span className="text-xs text-red-400">{errors.roleId.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={cn(
              'bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50',
              isDirty && 'cursor-pointer',
            )}
          >
            {isSubmitting ? t('profile.saving') : t('profile.saveChanges')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
