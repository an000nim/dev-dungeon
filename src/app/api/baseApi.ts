import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { httpClient } from '../httpclient';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || '/api',
    prepareHeaders: (headers) => {
      // Здесь можно добавить общие заголовки, например, токен авторизации
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: () => ({}),
});
