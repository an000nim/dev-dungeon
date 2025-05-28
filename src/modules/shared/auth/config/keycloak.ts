import Keycloak from 'keycloak-js';

const keycloakConfig = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  url: process.env.REACT_APP_KEYCLOAK_URL!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  realm: process.env.REACT_APP_KEYCLOAK_REALM!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID!,
  checkLoginIframe: true,
  onLoad: 'check-sso-silent',
};

export const keycloak = new Keycloak(keycloakConfig);
