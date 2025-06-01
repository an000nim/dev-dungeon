import { useAppSelector } from '@shared/reduxTools/reduxHooks';
import { palette } from '@shared/theme/palette';
import { typography } from '@shared/theme/typography';

import { ReactNode } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

export default ThemeProvider;
