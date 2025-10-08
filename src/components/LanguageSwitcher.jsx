import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-gray-800/50 border border-gray-700">
            <Button
                onClick={() => setLanguage('en')}
                variant="ghost"
                size="sm"
                className={`rounded-full px-3 py-1 text-sm transition-colors duration-300 ${
                    language === 'en' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
            >
                EN
            </Button>
            <Button
                onClick={() => setLanguage('fr')}
                variant="ghost"
                size="sm"
                className={`rounded-full px-3 py-1 text-sm transition-colors duration-300 ${
                    language === 'fr' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
            >
                FR
            </Button>
        </div>
    );
};

export default LanguageSwitcher;