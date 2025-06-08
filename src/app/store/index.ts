import { userApi } from '@features/user/userApi';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@shared/auth/authSlice';
import languageReducer from '@shared/i18n/hooks/useLanguage';
import themeReducer from '@shared/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
