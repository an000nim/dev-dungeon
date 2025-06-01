import { RootState } from '@app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User, UserState } from './types';

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const { setProfile, setLoading, setError, clearProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Селектор для получения профиля пользователя
export const selectUser = (state: RootState) => state.user.profile;
