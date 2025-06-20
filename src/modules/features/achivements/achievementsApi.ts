import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Achievement = {
  id: number;
  key: string;
  iconType: string;
};

export const achievementsApi = createApi({
  reducerPath: 'achievementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getAchievements: builder.query<Achievement[], void>({
      query: () => 'achievements',
    }),
  }),
});

export const { useGetAchievementsQuery } = achievementsApi;
