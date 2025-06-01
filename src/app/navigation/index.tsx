import HomePage from '@features/pages/HomePage';
import LoginPage from '@features/pages/LoginPage';
import ProfilePage from '@features/pages/ProfilePage';
import SettingsPage from '@features/pages/SettingsPage';
import AppLayout from '@shared/navigation/AppLayout';

import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
