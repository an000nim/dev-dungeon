import React from 'react';

import { useTranslation } from 'react-i18next';

import { Avatar, Box, Paper, Typography } from '@mui/material';

import { useAppSelector } from '../../../../app/hooks';
import type { User } from '../../../features/auth/types';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user) as User | null;

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">{t('profile.title')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {t('profile.noUser', { defaultValue: 'Please log in to view your profile.' })}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            alt={user.username || ''}
            src={user.avatar || ''}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" gutterBottom>
            {t('profile.title')}
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h6" gutterBottom>
              {t('profile.username')}: {user.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('profile.email')}: {user.email}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
