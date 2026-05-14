import { JSX } from 'react'
import dayjs from 'dayjs'
import StatusBadge from 'src/components/status-badge'
import { IoArrowBack } from 'react-icons/io5'
import { useAdminTournamentListPage } from './use-admin-tournament-list-page'

const AdminTournamentListPage = (): JSX.Element => {
  const { tournaments, isLoading, handleBack, handleCreate, handleView, handleEdit } =
    useAdminTournamentListPage()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">Loading…</span>
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
            Dashboard
          </button>

          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-semibold">Tournaments</h1>
            <button
              onClick={handleCreate}
              className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer"
            >
              + Create
            </button>
          </div>
        </div>

        {tournaments.length === 0 ? (
          <p className="text-[#555] text-sm">No tournaments yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tournaments.map(t => (
              <div
                key={t.id}
                onClick={() => handleView(t.id)}
                className="bg-[#181818] border border-[#1d1d1d] rounded-xl px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#202020] transition-colors"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-white text-sm font-medium truncate">{t.name}</span>
                  <span className="text-[#555] text-xs">
                    Starts {dayjs(t.startDate).format('DD MMM YYYY')}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={t.status} />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(t.id); }}
                    className="text-xs text-[#888] border border-[#2a2a2a] px-3 py-1.5 rounded-lg hover:text-white hover:border-[#444] transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTournamentListPage
