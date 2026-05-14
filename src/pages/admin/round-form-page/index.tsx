import { JSX, KeyboardEvent, useState } from 'react'
import { IoArrowBack, IoCloseOutline } from 'react-icons/io5'
import type { TagsInputProps } from './types'
import { useRoundFormPage } from './use-round-form-page'

const inputCls =
  'bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] w-full [color-scheme:dark]'

const TagsInput = ({ tags, onChange, placeholder }: TagsInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('')

  const addTag = () => {
    const val = inputValue.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
      setInputValue('')
    }
  }

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1 bg-[#252525] text-[#ccc] text-xs px-2 py-1 rounded-md"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="text-[#555] hover:text-red-400 cursor-pointer leading-none"
              >
                <IoCloseOutline size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? 'Type and press Enter…'}
          className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555] flex-1"
        />
        <button
          type="button"
          onClick={addTag}
          className="text-xs border border-[#2a2a2a] px-3 py-2 rounded-lg text-[#888] hover:text-white hover:border-[#444] transition-colors cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  )
}

const RoundFormPage = (): JSX.Element => {
  const {
    isEdit,
    isLoadingData,
    mustHaveCriteria,
    setMustHaveCriteria,
    referenceLinks,
    setReferenceLinks,
    criteriaError,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
  } = useRoundFormPage()

  if (isEdit && isLoadingData) {
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

        <h1 className="text-white text-2xl font-semibold mb-6">
          {isEdit ? 'Edit Round' : 'Create Round'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Round name *</label>
              <input {...register('name')} placeholder="Round 1" className={inputCls} />
              {errors.name && (
                <span className="text-xs text-red-400">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Round overview…"
                className={`${inputCls} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Technology requirements</label>
              <textarea
                {...register('technologyRequirements')}
                rows={3}
                placeholder="Required technologies and stack…"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Must-have criteria *</label>
              <TagsInput
                tags={mustHaveCriteria}
                onChange={setMustHaveCriteria}
                placeholder="Add criterion and press Enter…"
              />
              {criteriaError && (
                <span className="text-xs text-red-400">{criteriaError}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#888]">Reference links</label>
              <TagsInput
                tags={referenceLinks}
                onChange={setReferenceLinks}
                placeholder="https://… and press Enter"
              />
            </div>
          </div>

          <div className="bg-[#181818] border border-[#1d1d1d] rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-white text-sm font-medium">Timing</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">Start time *</label>
                <input {...register('startTime')} type="datetime-local" className={inputCls} />
                {errors.startTime && (
                  <span className="text-xs text-red-400">{errors.startTime.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#888]">Submission deadline *</label>
                <input
                  {...register('submissionDeadline')}
                  type="datetime-local"
                  className={inputCls}
                />
                {errors.submissionDeadline && (
                  <span className="text-xs text-red-400">
                    {errors.submissionDeadline.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Round'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RoundFormPage
