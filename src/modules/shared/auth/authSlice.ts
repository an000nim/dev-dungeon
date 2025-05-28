// src/app/store/slices/authSlice.ts
import type { RootState } from '@app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/auth/types';

// Добавляем enum для ошибок авторизации
export enum AuthError {
  AUTH_ERROR = 'AUTH_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Расширяем интерфейс состояния
interface AuthState {
  isAuthenticated: boolean;
  error: AuthError | null;
  isErrorOccurred: boolean;
  user: User | null;
  token: string | null;
  // Добавляем новые поля для работы с Keycloak
  keycloakInitialized: boolean;
  redirectPath: string | null;
}

// Получаем начальное состояние из localStorage
const getInitialState = (): AuthState => ({
  isAuthenticated: false,
  error: null,
  isErrorOccurred: localStorage.getItem('isErrorOccurred')
    ? JSON.parse(localStorage.getItem('isErrorOccurred') || '')
    : false,
  user: null,
  token: null,
  keycloakInitialized: false,
  redirectPath: null,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // Обновляем существующие редьюсеры
    setAuth: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        user: User | null;
        token: string | null;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isErrorOccurred = false;
      localStorage.setItem('isErrorOccurred', JSON.stringify(false));
    },

    // Добавляем новые редьюсеры для работы с Keycloak
    setKeycloakInitialized: (state, action: PayloadAction<boolean>) => {
      state.keycloakInitialized = action.payload;
    },

    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload;
      if (action.payload) {
        localStorage.setItem('redirectPath', action.payload);
      } else {
        localStorage.removeItem('redirectPath');
      }
    },

    setError: (state, action: PayloadAction<AuthError>) => {
      state.error = action.payload;
      state.isErrorOccurred = true;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.setItem('isErrorOccurred', JSON.stringify(true));
    },

    clearError: (state) => {
      state.error = null;
      state.isErrorOccurred = false;
      localStorage.setItem('isErrorOccurred', JSON.stringify(false));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.isErrorOccurred = false;
      state.redirectPath = null;
      localStorage.removeItem('isErrorOccurred');
      localStorage.removeItem('redirectPath');
    },
  },
});

// Экспортируем actions
export const { setAuth, setError, clearError, setKeycloakInitialized, setRedirectPath, logout } =
  authSlice.actions;

// Экспортируем селекторы с правильной типизацией
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsErrorOccurred = (state: RootState) => state.auth.isErrorOccurred;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectKeycloakInitialized = (state: RootState) => state.auth.keycloakInitialized;
export const selectRedirectPath = (state: RootState) => state.auth.redirectPath;

export default authSlice.reducer;
