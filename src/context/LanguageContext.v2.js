import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // Set initial direction and language
    const currentLang = i18n.language || 'en';
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', currentLang);
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const setEnglish = () => changeLanguage('en');
  const setArabic = () => changeLanguage('ar');
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };

  const isRTL = i18n.language === 'ar';
  const language = i18n.language === 'ar' ? 'arabic' : 'english';

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      toggleLanguage,
      setEnglish,
      setArabic,
      t,
      isRTL,
      i18n
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
