import { useCallback, useMemo, useState } from 'react';

import { createTheme } from '@mui/material/styles';

import { palette } from '../../modules/shared/theme/palette';
import { typography } from '../../modules/shared/theme/typography';

export const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: isDarkMode ? palette.dark : palette.light,
        typography,
      }),
    [isDarkMode]
  );

  return { isDarkMode, toggleTheme, theme };
};
