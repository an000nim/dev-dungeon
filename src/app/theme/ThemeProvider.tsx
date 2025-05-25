import React from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

import { palette } from '../../modules/shared/theme/palette';
import { typography } from '../../modules/shared/theme/typography';
import { useAppSelector } from '../hooks';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = !!useAppSelector((state) => state.theme.isDarkMode);
  const theme = createTheme({
    palette: isDarkMode ? palette.dark : palette.light,
    typography,
  });
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
