import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useUpdateAvatarMutation } =
  userApi;

// Селектор для получения профиля пользователя
export const selectUser = (state: { userApi: { queries: Record<string, { data: User }> } }) =>
  state.userApi.queries['getUserProfile(undefined)']?.data;
