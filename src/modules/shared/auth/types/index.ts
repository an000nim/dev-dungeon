// Существующие типы
export interface User {
  avatar?: string;
  id: string;
  username: string;
  email: string;
  // ... другие поля пользователя
}

export interface AuthState {
  isAuthenticated: boolean;
  error: AuthError | null;
  isErrorOccurred: boolean;
  user: User | null;
  token: string | null;
  keycloakInitialized: boolean;
  redirectPath: string | null;
}

export enum AuthError {
  AUTH_ERROR = 'AUTH_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Типы для Keycloak
export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
  checkLoginIframe: boolean;
  onLoad: 'check-sso-silent' | 'check-sso' | 'login-required';
}

// Типы для ответов API
export interface AuthResponse {
  token: string;
  user: User;
}

// Типы для параметров авторизации
export interface LoginParams {
  username: string;
  password: string;
}

// Типы для ошибок авторизации
export interface AuthErrorResponse {
  error: AuthError;
  message: string;
}
