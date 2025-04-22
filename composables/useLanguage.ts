import { ref } from 'vue'

type LanguageCode = 'en' | 'ua'

const language = ref<LanguageCode>('en')

export const useLanguage = () => {
  const setLanguage = (lang: LanguageCode) => {
    language.value = lang
    localStorage.setItem('language', lang)
  }

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as LanguageCode | null
    if (stored === 'en' || stored === 'ua') {
      language.value = stored
    }
  }

  return {
    language,
    setLanguage
  }
}