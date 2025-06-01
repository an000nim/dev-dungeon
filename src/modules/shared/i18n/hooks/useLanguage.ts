import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return {
    currentLanguage: i18n.language,
    changeLanguage,
  };
};
