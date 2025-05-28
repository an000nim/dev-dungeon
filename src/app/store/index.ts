import { authApi } from '@app/api/authApi';
import { usersApi } from '@app/api/usersApi';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@shared/auth/authSlice';
import languageReducer from '@shared/i18n/languageSlice';
import themeReducer from '@shared/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
