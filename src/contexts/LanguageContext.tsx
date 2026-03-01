import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

// Define supported languages
export type Language = 'en' | 'vi';

// Translation data type
type TranslationData = typeof en;

// Map of translations
const translations: Record<Language, TranslationData> = { en, vi };

// Context type
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper: get nested value from object by dot-notation key
function getNestedValue(obj: any, path: string): string {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
        if (current === undefined || current === null) return path;
        current = current[key];
    }
    return typeof current === 'string' ? current : path;
}

// Provider component
interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // Try to get saved language from localStorage, default to 'en'
    const [language, setLanguageState] = useState<Language>(() => {
        try {
            const saved = localStorage.getItem('portfolio-lang');
            if (saved === 'en' || saved === 'vi') return saved;
        } catch {
            // localStorage not available
        }
        return 'en';
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('portfolio-lang', lang);
        } catch {
            // localStorage not available
        }
        // Update HTML lang attribute for accessibility
        document.documentElement.lang = lang;
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'en' ? 'vi' : 'en');
    }, [language, setLanguage]);

    // Translation function: t('hero.role') => "Business Analyst / ..."
    const t = useCallback((key: string): string => {
        return getNestedValue(translations[language], key);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook
export const useTranslation = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;
