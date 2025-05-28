import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
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
