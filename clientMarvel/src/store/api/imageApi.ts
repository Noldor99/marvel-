import { baseHeroApi } from './baseHeroApi';


export const imageApi = baseHeroApi.injectEndpoints({
  endpoints: (builder) => ({
    createImage: builder.mutation<void, FormData>({
      query: (data) => ({
        url: '/image',
        method: 'POST',
        body: data,
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
  }),
});

export const {
  useCreateImageMutation,
  useDeleteImageMutation,
} = imageApi;
