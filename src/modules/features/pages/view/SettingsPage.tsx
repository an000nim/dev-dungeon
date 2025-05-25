import React from 'react';

import { useTranslation } from 'react-i18next';

import { Box, FormControlLabel, Paper, Switch, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { toggleTheme } from '../../../../app/store/slices/themeSlice';

export const SettingsPage = () => {
  const isDarkMode = Boolean(useAppSelector((state) => state.theme.isDarkMode));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={() => dispatch(toggleTheme())} />}
            label={isDarkMode ? t('settings.theme.dark') : t('settings.theme.light')}
          />
        </Box>
      </Paper>
    </Box>
  );
};
