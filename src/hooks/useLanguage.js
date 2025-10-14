// src/hooks/useLanguage.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLang);
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  const t = (key) => {
    // Primary: exact key in current language
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      return translations[currentLanguage][key];
    }
    // Secondary: check for suffixed key patterns created earlier (e.g., key_hi, key_te)
    const suffixedKey = `${key}_${currentLanguage}`;
    if (translations[currentLanguage] && translations[currentLanguage][suffixedKey]) {
      return translations[currentLanguage][suffixedKey];
    }
    // Also check English object for suffixed keys (we sometimes added translations there with _hi/_te)
    if (translations.en && translations.en[suffixedKey]) {
      return translations.en[suffixedKey];
    }
    // Fallback to English original key, then the key itself
    return translations.en[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: value },
    children
  );
};
