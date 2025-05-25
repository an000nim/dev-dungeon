import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './app/navigation';
import { store } from './app/store';
import { ThemeProvider } from './app/theme/ThemeProvider';
import './modules/shared/i18n/config';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
