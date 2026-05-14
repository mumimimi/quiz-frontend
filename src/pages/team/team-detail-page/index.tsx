import { JSX } from 'react'
import { IoArrowBack, IoPencilOutline, IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5'
import { useTeamDetailPage } from './use-team-detail-page'

const inputCls =
  'bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full'

const TeamDetailPage = (): JSX.Element => {
  const {
    team,
    isLoading,
    isError,
    isEditing,
    setIsEditing,
    canEdit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
    cancelEdit,
  } = useTeamDetailPage()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">Loading…</span>
      </div>
    )
  }

  if (isError || !team) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-red-400 text-sm">Failed to load team</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[#555] hover:text-white text-sm mb-4 transition-colors cursor-pointer"
          >
            <IoArrowBack size={16} />
            {team.tournament?.name ?? 'Tournaments'}
          </button>

          <div className="flex items-center justify-between gap-4">
            <h1 className="text-white text-2xl font-semibold">{team.name}</h1>
            {canEdit && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-xs text-[#888] hover:text-white border border-[#2a2a2a] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <IoPencilOutline size={14} />
                Edit
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4"
          >
            <h2 className="text-white text-sm font-medium">Edit team</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Team name *</label>
              <input {...register('name')} className={inputCls} />
              {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">City</label>
                <input {...register('city')} placeholder="Kyiv" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">School</label>
                <input {...register('school')} placeholder="School №1" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">Telegram</label>
                <input {...register('telegramHandle')} placeholder="@handle" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">Discord</label>
                <input
                  {...register('discordHandle')}
                  placeholder="username#0000"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 bg-white text-black text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <IoCheckmarkOutline size={14} />
                {isSubmitting ? 'Saving…' : 'Save'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-1.5 text-xs text-[#666] border border-[#2a2a2a] px-4 py-2 rounded-lg hover:text-white hover:border-[#444] transition-colors cursor-pointer"
              >
                <IoCloseOutline size={14} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'City', value: team.city },
                { label: 'School', value: team.school },
                { label: 'Telegram', value: team.telegramHandle },
                { label: 'Discord', value: team.discordHandle },
              ].map(
                ({ label, value }) =>
                  value && (
                    <div key={label}>
                      <span className="text-xs text-[#555]">{label}</span>
                      <p className="text-[#aaa] text-sm mt-0.5">{value}</p>
                    </div>
                  ),
              )}
              <div>
                <span className="text-xs text-[#555]">Captain</span>
                <p className="text-[#aaa] text-sm mt-0.5">
                  {team.captain.firstName} {team.captain.lastName}
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-white font-medium mb-3">
            Members{' '}
            <span className="text-[#555] font-normal text-sm">({team.members.length})</span>
          </h2>
          <div className="flex flex-col gap-2">
            {team.members.map(member => (
              <div
                key={member.id}
                className="bg-[#181818] border border-[#1d1d1d] rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <span className="text-white text-sm">
                    {member.firstName} {member.lastName}
                  </span>
                  <p className="text-[#555] text-xs mt-0.5">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamDetailPage
