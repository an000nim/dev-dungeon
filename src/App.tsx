import AppRoutes from '@app/navigation';
import { store } from '@app/store';
import '@shared/i18n/config';
import ThemeProvider from '@shared/theme/ThemeProvider';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
