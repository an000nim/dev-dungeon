import type { User } from '@features/user/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, void>({
      query: () => 'users/profile',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: 'users/profile',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    updateAvatar: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: 'users/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<{ user: User; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<
      { user: User; token: string },
      { email: string; password: string; username: string }
    >({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => 'auth/me',
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateAvatarMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = userApi;

// Селектор для получения профиля пользователя
export const selectUser = (state: { userApi: { queries: Record<string, { data: User }> } }) =>
  state.userApi.queries['getUserProfile(undefined)']?.data;
