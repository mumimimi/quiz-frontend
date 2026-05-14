import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useAdminDashboard } from './use-admin-dashboard'

const AdminDashboard = (): JSX.Element => {
  const { isLoading, stats, handleManage } = useAdminDashboard()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">{t('common.loading')}</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">{t('admin.dashboard.title')}</h1>
          <p className="text-[#555] text-sm mt-1">{t('admin.dashboard.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5"
            >
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-[#555] text-xs mt-1">
                {label} {t('admin.dashboard.tournamentsSuffix')}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleManage}
          className="self-start bg-white text-black text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer"
        >
          {t('admin.dashboard.manageTournaments')}
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
