import { userApi } from '@features/user/userApi';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@shared/auth/authSlice';

// import { themeReducer } from '@shared/theme/theme';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // theme: themeReducer, // больше не нужен
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
