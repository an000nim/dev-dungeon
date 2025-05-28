import { keycloak } from '@shared/auth/config/keycloak';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak.authenticated) {
      navigate('/');
    } else {
      keycloak.login();
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};
