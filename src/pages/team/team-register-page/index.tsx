import { JSX } from 'react'
import { TournamentStatusEnum } from 'src/enums'
import { IoArrowBack, IoAddOutline, IoTrashOutline } from 'react-icons/io5'
import { useTeamRegisterPage } from './use-team-register-page'

const inputCls =
  'bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full'

const TeamRegisterPage = (): JSX.Element => {
  const {
    tournament,
    isLoading,
    isError,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    fields,
    append,
    remove,
    handleBack,
    onSubmit,
  } = useTeamRegisterPage()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[#555] text-sm">Loading…</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-3">
        <span className="text-red-400 text-sm">Failed to load tournament.</span>
        <button
          onClick={handleBack}
          className="text-xs text-[#555] hover:text-white transition-colors cursor-pointer"
        >
          Back to tournament
        </button>
      </div>
    )
  }

  if (tournament?.status !== TournamentStatusEnum.REGISTRATION) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-3">
        <span className="text-red-400 text-sm">Team registration is closed for this tournament.</span>
        <button
          onClick={handleBack}
          className="text-xs text-[#555] hover:text-white transition-colors cursor-pointer"
        >
          Back to tournament
        </button>
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
          {tournament.name}
        </button>

        <h1 className="text-white text-2xl font-semibold mb-6">Register Team</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-white text-sm font-medium">Team info</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Team name *</label>
              <input {...register('name')} placeholder="Team Rocket" className={inputCls} />
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
          </div>

          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-sm font-medium">
                Members{' '}
                <span className="text-[#555] font-normal">({fields.length})</span>
              </h2>
              <button
                type="button"
                onClick={() => append({ firstName: '', lastName: '', email: '' })}
                className="flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors cursor-pointer"
              >
                <IoAddOutline size={16} />
                Add member
              </button>
            </div>

            {errors.members?.root && (
              <span className="text-xs text-red-400">{errors.members.root.message}</span>
            )}

            <div className="flex flex-col gap-3">
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="border border-[#2a2a2a] rounded-xl p-3 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#555]">Member {idx + 1}</span>
                    {fields.length > 2 && (
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="text-[#555] hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <IoTrashOutline size={14} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-[#888]">First name *</label>
                      <input
                        {...register(`members.${idx}.firstName`)}
                        placeholder="John"
                        className={inputCls}
                      />
                      {errors.members?.[idx]?.firstName && (
                        <span className="text-xs text-red-400">
                          {errors.members[idx]?.firstName?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-[#888]">Last name *</label>
                      <input
                        {...register(`members.${idx}.lastName`)}
                        placeholder="Doe"
                        className={inputCls}
                      />
                      {errors.members?.[idx]?.lastName && (
                        <span className="text-xs text-red-400">
                          {errors.members[idx]?.lastName?.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#888]">Email *</label>
                    <input
                      {...register(`members.${idx}.email`)}
                      type="email"
                      placeholder="member@example.com"
                      className={inputCls}
                    />
                    {errors.members?.[idx]?.email && (
                      <span className="text-xs text-red-400">
                        {errors.members[idx]?.email?.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Registering…' : 'Register Team'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TeamRegisterPage
