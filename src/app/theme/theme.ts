import { ThemeOptions } from '@mui/material/styles';

export const createAppTheme = (isDarkMode: boolean): ThemeOptions => ({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: isDarkMode ? '#9c27b0' : '#1976d2', // Фиолетовый для темной темы, синий для светлой
    },
    secondary: {
      main: isDarkMode ? '#f48fb1' : '#dc004e',
    },
    background: {
      default: isDarkMode ? '#121212' : '#f5f5f5',
      paper: isDarkMode ? '#1e1e1e' : '#ffffff',
    },
  },
});
