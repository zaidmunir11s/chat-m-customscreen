import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ position = 'fixed', style = {} }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('app_language', lang === 'ar' ? 'arabic' : 'english');
  };

  const defaultStyle = {
    position: position,
    top: '40px',
    right: '40px',
    zIndex: 1000,
    display: 'flex',
    gap: '16px',
    ...style
  };

  const buttonStyle = (isActive) => ({
    padding: '16px 32px',
    borderRadius: '24px',
    background: isActive ? '#10b981' : 'rgba(255, 255, 255, 0.9)',
    color: isActive ? 'white' : '#1f2937',
    fontSize: '32px',
    fontWeight: '600',
    border: isActive ? 'none' : '2px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '120px'
  });

  return (
    <div style={defaultStyle}>
      <button
        style={buttonStyle(currentLang === 'en')}
        onClick={() => switchLanguage('en')}
        onMouseOver={(e) => {
          if (currentLang !== 'en') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseOut={(e) => {
          if (currentLang !== 'en') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        English
      </button>
      <button
        style={buttonStyle(currentLang === 'ar')}
        onClick={() => switchLanguage('ar')}
        onMouseOver={(e) => {
          if (currentLang !== 'ar') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseOut={(e) => {
          if (currentLang !== 'ar') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSwitcher;
