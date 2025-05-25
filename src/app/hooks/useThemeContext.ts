import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: noop,
});

export const useThemeContext = () => useContext(ThemeContext) as ThemeContextType;
