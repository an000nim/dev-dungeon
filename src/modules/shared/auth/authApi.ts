import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../features/user/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
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

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } = authApi;
