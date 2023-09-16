import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_SERVER } from '../../constants/url';
import { IHero, IHeroes, IImage } from '../../model';

export const heroApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_SERVER}`,
  }),
  tagTypes: ['Hero'],
  endpoints: (builder) => ({
    // Hero Endpoints
    createHero: builder.mutation<IHero, FormData>({
      query: (formDataObj) => ({
        url: '/hero',
        method: 'POST',
        body: formDataObj,
      }),
      invalidatesTags: ['Hero'],
    }),
    getHeroesWithPagination: builder.query<IHeroes, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 4 }) => ({
        url: `/hero/pagination?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Hero'],
    }),
    getHero: builder.query<IHero, string>({
      query: (id) => ({
        url: `/hero/${id}`,
        method: 'GET',
      }),
      providesTags: ['Hero'],
    }),
    updateHero: builder.mutation<IHero, { id: string; formDataObj: FormData }>({
      query: ({ id, formDataObj }) => ({
        url: `/hero/${id}`,
        method: 'PUT',
        body: formDataObj,
      }),
      invalidatesTags: ['Hero'],
    }),
    deleteHero: builder.mutation<void, number>({
      query: (id) => ({
        url: `/hero/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),

    // Image Endpoints
    createImage: builder.mutation<IImage, FormData>({
      query: (createImageDto) => ({
        url: '/image',
        method: 'POST',
        body: createImageDto,
      }),
      invalidatesTags: ['Hero'],
    }),
    deleteImage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/image/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),
    // Power Endpoints
    addPower: builder.mutation({
      query: (createPowerDto) => ({
        url: 'power',
        method: 'POST',
        body: createPowerDto,
      }),
      invalidatesTags: ['Hero'],
    }),
    removePower: builder.mutation({
      query: (id: number) => ({
        url: `power/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),
  }),
});

export const {
  useCreateHeroMutation,
  useGetHeroesWithPaginationQuery,
  useLazyGetHeroesWithPaginationQuery,
  useGetHeroQuery,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
  useCreateImageMutation,
  useDeleteImageMutation,
  useAddPowerMutation,
  useRemovePowerMutation
} = heroApi;