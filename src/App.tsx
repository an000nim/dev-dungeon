import { AppRoutes } from '@app/navigation';
import { store } from '@app/store';
import { KeycloakInitializer } from '@shared/auth/KeycloakInitializer';
import '@shared/i18n/config';
import { ThemeProvider } from '@shared/theme/ThemeProvider';
import { checkEnv } from '@shared/utils';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

checkEnv();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <KeycloakInitializer>
            <AppRoutes />
          </KeycloakInitializer>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
