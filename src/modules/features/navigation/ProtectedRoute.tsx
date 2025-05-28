import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  selectIsAuthenticated,
  selectKeycloakInitialized,
  setError,
  setRedirectPath,
} from '@app/store/slices/authSlice';
import { AuthError } from '@shared/auth/types';

import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const keycloakInitialized = useAppSelector(selectKeycloakInitialized);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setRedirectPath(location.pathname));
      dispatch(setError(AuthError.AUTH_ERROR));
    }
  }, [isAuthenticated, location.pathname, dispatch]);

  if (!keycloakInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
