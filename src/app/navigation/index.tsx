import { AppLayout } from '@features/navigation/AppLayout';
import { ProtectedRoute } from '@features/navigation/ProtectedRoute';
import { HomeScreen } from '@features/pages/HomePage';
import { OnboardingPage } from '@features/pages/OnboardingPage';
import { ProfilePage } from '@features/pages/ProfilePage';
import { QuestsPage } from '@features/pages/QuestsPage';
import { SettingsPage } from '@features/pages/SettingsPage';
import { SkillsPage } from '@features/pages/SkillsPage';
import { StorePage } from '@features/pages/StorePage';
import { TeamsPage } from '@features/pages/TeamsPage';
import { AuthCallback } from '@shared/auth/components/AuthCallback';
import { AuthErrorHandler } from '@shared/auth/components/AuthErrorHandler';

import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <>
      <AuthErrorHandler />
      <Routes>
        <Route path="/auth" element={<AuthCallback />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomeScreen />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="quests" element={<QuestsPage />} />
          <Route path="store" element={<StorePage />} />
        </Route>
      </Routes>
    </>
  );
};
