import { useThemeMode } from '@shared/theme/ThemeProvider';

import { useTranslation } from 'react-i18next';

import { FormControlLabel, Paper as MuiPaper, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const { t } = useTranslation();

  return (
    <PaddedBox>
      <StyledPaper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
        <MarginTopBox>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
            label={isDarkMode ? t('settings.theme.dark') : t('settings.theme.light')}
          />
        </MarginTopBox>
      </StyledPaper>
    </PaddedBox>
  );
};

const PaddedBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

const MarginTopBox = styled('div')(() => ({
  marginTop: 16,
}));

const StyledPaper = styled(MuiPaper)({});

export default SettingsPage;
