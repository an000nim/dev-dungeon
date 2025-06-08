import { useAppDispatch, useAppSelector } from '@shared/reduxTools/reduxHooks';
import { toggleTheme } from '@shared/theme/themeSlice';

import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, FormControlLabel, Paper, Switch, Typography, styled } from '@mui/material';

export const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <RootBox>
      <SettingsPaper>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
        <SettingsContent>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={handleThemeToggle} />}
            label={isDarkMode ? t('settings.theme.dark') : t('settings.theme.light')}
          />
        </SettingsContent>
      </SettingsPaper>
    </RootBox>
  );
};

// Styles
const RootBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const SettingsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const SettingsContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
