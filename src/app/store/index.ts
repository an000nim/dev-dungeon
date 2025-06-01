import { userReducer } from '@features/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@shared/auth/authSlice';
import { themeReducer } from '@shared/theme/theme';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
