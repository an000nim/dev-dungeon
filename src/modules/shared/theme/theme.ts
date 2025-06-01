import { RootState } from '@app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTheme as useMuiTheme } from '@mui/material';

import { palette } from './palette';
import { typography } from './typography';

// Slice
interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

// Hook
export const useTheme = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state: RootState) => state.theme.isDarkMode);
  const muiTheme = useMuiTheme();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return {
    isDarkMode,
    handleThemeToggle,
    palette: isDarkMode ? palette.dark : palette.light,
    typography,
    theme: muiTheme,
  };
};
