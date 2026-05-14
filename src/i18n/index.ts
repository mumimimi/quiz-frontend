import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import enTranslation from './locales/en/translation.json'
import ukTranslation from './locales/uk/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    uk: { translation: ukTranslation },
  },
  lng: localStorage.getItem('i18n-language') ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

dayjs.locale(i18n.language === 'uk' ? 'uk' : 'en')

i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng === 'uk' ? 'uk' : 'en')
})

export default i18n
