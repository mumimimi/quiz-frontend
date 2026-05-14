import { JSX, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IoChevronDownOutline } from 'react-icons/io5'
import GB from 'country-flag-icons/react/3x2/GB'
import UA from 'country-flag-icons/react/3x2/UA'

const LANGUAGES = [
  { code: 'en', label: 'EN', fullLabel: 'English', Flag: GB },
  { code: 'uk', label: 'UA', fullLabel: 'Українська', Flag: UA },
]

const LanguageSwitcher = (): JSX.Element => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find(l => l.code === i18n.language) ?? LANGUAGES[0]

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('i18n-language', code)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#888] hover:text-white border border-[#2a2a2a] rounded-lg transition-colors cursor-pointer"
      >
        <current.Flag className="w-4 h-auto rounded-sm" />
        <span>{current.label}</span>
        <IoChevronDownOutline
          size={12}
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-[#181818] border border-[#2a2a2a] rounded-lg overflow-hidden z-50 min-w-[110px]">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer flex items-center gap-2 ${
                lang.code === i18n.language
                  ? 'text-white bg-[#232323]'
                  : 'text-[#888] hover:text-white hover:bg-[#232323]'
              }`}
            >
              <lang.Flag className="w-4 h-auto rounded-sm" />
              <span className="font-medium">{lang.label}</span>
              <span className="text-[#555]">{lang.fullLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
