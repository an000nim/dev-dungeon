import { createSlice } from '@reduxjs/toolkit';

import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

// Redux slice
interface LanguageState {
  currentLanguage: string;
}

const initialState: LanguageState = {
  currentLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

// Hook
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
