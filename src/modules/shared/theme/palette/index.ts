import { PaletteOptions, ThemeOptions } from '@mui/material';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#9C27FF',
    light: '#B388FF',
    dark: '#6A0080',
  },
  secondary: {
    main: '#B388FF',
    light: '#EDE7F6',
    dark: '#7C43BD',
  },
  background: {
    default: '#f3f3f7',
    paper: '#faf9fd',
  },
  text: {
    primary: '#2d2d34',
    secondary: '#6e6e7a',
  },
  action: {
    active: '#9C27FF',
    hover: 'rgba(156, 39, 255, 0.08)',
    selected: 'rgba(156, 39, 255, 0.16)',
    disabled: 'rgba(44, 44, 52, 0.3)',
    disabledBackground: 'rgba(44, 44, 52, 0.12)',
  },
  divider: 'rgba(156, 39, 255, 0.12)',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#B388FF',
    light: '#EDE7F6',
    dark: '#7C43BD',
  },
  secondary: {
    main: '#9C27FF',
    light: '#B388FF',
    dark: '#6A0080',
  },
  background: {
    default: '#181828',
    paper: '#23233a',
  },
  text: {
    primary: '#f3f3f7',
    secondary: '#B388FF',
  },
  action: {
    active: '#B388FF',
    hover: 'rgba(179, 136, 255, 0.08)',
    selected: 'rgba(179, 136, 255, 0.16)',
    disabled: 'rgba(243, 243, 247, 0.3)',
    disabledBackground: 'rgba(243, 243, 247, 0.12)',
  },
  divider: 'rgba(179, 136, 255, 0.12)',
};

export const palette = {
  light: lightPalette,
  dark: darkPalette,
};

export const createTheme = (isDarkMode: boolean): ThemeOptions => ({
  palette: isDarkMode ? darkPalette : lightPalette,
});
