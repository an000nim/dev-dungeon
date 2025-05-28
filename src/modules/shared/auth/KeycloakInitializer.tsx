import { setAuth, setKeycloakInitialized } from '@shared/auth/authSlice';
import { keycloak } from '@shared/auth/config/keycloak';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Box, CircularProgress, styled } from '@mui/material';

interface KeycloakInitializerProps {
  children: React.ReactNode;
}

export const KeycloakInitializer = ({ children }: KeycloakInitializerProps) => {
  const [isKeycloakReady, setKeycloakReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      if (keycloak.authenticated) {
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: keycloak.tokenParsed
              ? {
                  id: keycloak.tokenParsed.sub || '',
                  username: keycloak.tokenParsed.preferred_username || '',
                  email: keycloak.tokenParsed.email || '',
                  avatar: '',
                }
              : null,
            token: keycloak.token ?? null,
          })
        );
      } else {
        dispatch(
          setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
          })
        );
      }
      dispatch(setKeycloakInitialized(true));
      setKeycloakReady(true);
    });
  }, [dispatch]);

  if (!isKeycloakReady) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return <>{children}</>;
};

// Styles
const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});
