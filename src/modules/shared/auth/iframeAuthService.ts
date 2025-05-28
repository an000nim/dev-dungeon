import { store } from '@app/store';
import { AuthError } from '@shared/auth/types';
import { theme } from '@shared/theme';

import { setError } from './authSlice';
import { keycloak } from './config/keycloak';

export const createAuthIframe = async () => {
  const old = document.querySelector('#login');
  if (old) {
    old.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'login';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  iframe.style.backgroundColor = theme.palette.background.default;

  document.body.appendChild(iframe);

  try {
    await keycloak.login();
  } catch (error) {
    store.dispatch(setError(AuthError.AUTH_ERROR));
  }
};
