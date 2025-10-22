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
  const { i18n, t: i18nT } = useTranslation();

  useEffect(() => {
    // Set initial direction and language
    const currentLang = i18n.language || 'en';
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', currentLang);
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    const langCode = lang === 'arabic' || lang === 'ar' ? 'ar' : 'en';
    i18n.changeLanguage(langCode);
    localStorage.setItem('app_language', lang === 'arabic' || lang === 'ar' ? 'arabic' : 'english');
  };

  const setEnglish = () => changeLanguage('en');
  const setArabic = () => changeLanguage('ar');
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };

  const isRTL = i18n.language === 'ar';
  const language = i18n.language === 'ar' ? 'arabic' : 'english';

  // Wrapper for t() to maintain backward compatibility with old keys
  const t = (key) => {
    // Map old keys to new i18n keys
    const keyMap = {
      // Home Screen
      welcomeTitle: 'home.title',
      welcomeSubtitle: 'home.subtitle',
      englishButton: 'English',
      arabicButton: 'انجليزي',
      contactSpecialist: 'home.contactSpecialist',
      startScreening: 'home.startScreening',

      // Age Selection
      ageSelectionTitle: 'ageSelection.title',
      ageSelectionSubtitle: 'ageSelection.subtitle',
      selectChildAge: 'ageSelection.selectChildAge',
      ageInMonths: 'ageSelection.ageInMonths',

      // Introduction
      introTitle1: 'introduction.title1',
      introTitle2: 'introduction.title2',
      introSubtitle: 'introduction.subtitle',
      introCard1Title: 'introduction.card1Title',
      introCard1Text: 'introduction.card1Text',
      introCard2Title: 'introduction.card2Title',
      introCard2Text: 'introduction.card2Text',
      introCard3Title: 'introduction.card3Title',
      introCard3Text: 'introduction.card3Text',
      introCard4Title: 'introduction.card4Title',
      introCard4Text: 'introduction.card4Text',
      welcomeMessage: 'introduction.welcomeMessage',

      // Patient Info
      patientInfoTitle: 'patientInfo.title',
      patientInfoSubtitle: 'patientInfo.subtitle',
      parentGuardianName: 'patientInfo.parentGuardianName',
      enterParentName: 'patientInfo.enterParentName',
      childName: 'patientInfo.childName',
      enterChildName: 'patientInfo.enterChildName',
      childAge: 'patientInfo.childAge',
      enterChildAge: 'patientInfo.enterChildAge',
      medicalRecordNumber: 'patientInfo.medicalRecordNumber',
      enterMRN: 'patientInfo.enterMRN',
      dateOfBirth: 'patientInfo.dateOfBirth',

      // Chat
      chatTitle: 'chat.title',
      monthsOld: 'chat.monthsOld',
      screeningComplete: 'chat.screeningComplete',
      thinking: 'chat.thinking',
      watchButton: 'chat.watchButton',
      listenButton: 'chat.listenButton',
      playingButton: 'chat.playingButton',
      writeMessage: 'chat.writeMessage',
      recording: 'chat.recording',
      transcribing: 'chat.transcribing',
      voiceButton: 'chat.voiceButton',
      stopButton: 'chat.stopButton',
      finishScreening: 'chat.finishScreening',

      // Video Modal
      firstExample: 'videoModal.firstExample',
      secondExample: 'videoModal.secondExample',
      thirdExample: 'videoModal.thirdExample',
      fourthExample: 'videoModal.fourthExample',
      exampleDescription: 'videoModal.exampleDescription',

      // Thank You
      thankYouTitle: 'thankYou.title',
      thankYouMessage: 'thankYou.message',
      viewResults: 'thankYou.viewResults',

      // Common
      backButton: 'common.back',
      continueButton: 'common.continue',
      nextButton: 'common.next',
      loading: 'common.loading',
      yes: 'common.yes',
      no: 'common.no'
    };

    const mappedKey = keyMap[key] || key;
    return i18nT(mappedKey);
  };

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
