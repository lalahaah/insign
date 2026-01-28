import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language, translations } from '@/lib/translations'

interface LanguageState {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => any
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'ko',
            setLanguage: (lang: Language) => set({ language: lang }),
            t: (path: string) => {
                const lang = get().language
                const keys = path.split('.')
                let result: any = translations[lang]

                for (const key of keys) {
                    if (result && result[key] !== undefined) {
                        result = result[key]
                    } else {
                        // Fallback to Korean if key is missing
                        let fallback: any = translations['ko']
                        for (const fKey of keys) {
                            if (fallback && fallback[fKey] !== undefined) {
                                fallback = fallback[fKey]
                            } else {
                                return path // Return the path if both fail
                            }
                        }
                        return fallback
                    }
                }
                return result
            },
        }),
        {
            name: 'language-storage',
        }
    )
)
