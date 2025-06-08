import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import ruCommon from './locales/ru/common.json';

export const resources = {
  en: {
    translation: enCommon,
  },
  ru: {
    translation: ruCommon,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
