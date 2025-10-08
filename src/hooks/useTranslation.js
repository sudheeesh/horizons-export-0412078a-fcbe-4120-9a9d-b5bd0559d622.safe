import { useLanguage } from '@/context/LanguageContext';
import translations from '@/locales/translations';

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key) => {
        const keys = key.split('.');
        let result = translations[language];
        for (const k of keys) {
            result = result[k];
            if (!result) {
                return key;
            }
        }
        return result;
    };

    return { t, language };
};