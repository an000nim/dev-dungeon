import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import './modules/shared/i18n/config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
