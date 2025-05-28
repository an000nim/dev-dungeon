// src/modules/shared/utils/index.ts
declare global {
  interface ImportMetaEnv {
    readonly VITE_KEYCLOAK_URL: string;
    readonly VITE_KEYCLOAK_REALM: string;
    readonly VITE_KEYCLOAK_CLIENT_ID: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Common utility functions
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const requiredEnvVars = [
  'REACT_APP_KEYCLOAK_URL',
  'REACT_APP_KEYCLOAK_REALM',
  'REACT_APP_KEYCLOAK_CLIENT_ID',
] as const;

export const checkEnv = () => {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('Please check your .env file and make sure all required variables are set.');
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};
