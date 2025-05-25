import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { HomeScreen } from '../../modules/features/pages/view/HomeScreen';
import { LoginPage } from '../../modules/features/pages/view/LoginPage';
import { ProfilePage } from '../../modules/features/pages/view/ProfilePage';
import { SettingsPage } from '../../modules/features/pages/view/SettingsPage';
import { AppLayout } from '../../modules/shared/navigation/components/AppLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};
