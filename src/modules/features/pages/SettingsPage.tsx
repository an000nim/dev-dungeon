import { useAppDispatch, useAppSelector } from '@shared/reduxTools/reduxHooks';
import { toggleTheme } from '@shared/theme/theme';

import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { FormControlLabel, Paper, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const PaddedBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

const MarginTopBox = styled('div')(() => ({
  marginTop: 16,
}));

const SettingsPage = () => {
  const isDarkMode = Boolean(useAppSelector((state) => state.theme.isDarkMode));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleThemeChange = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <PaddedBox>
      <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
        <MarginTopBox>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
            label={isDarkMode ? t('settings.theme.dark') : t('settings.theme.light')}
          />
        </MarginTopBox>
      </Paper>
    </PaddedBox>
  );
};

export default SettingsPage;
