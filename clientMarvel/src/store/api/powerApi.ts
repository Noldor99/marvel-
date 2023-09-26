import { ICreatePower, IPower } from "../../model/powerModel";
import { baseHeroApi } from './baseHeroApi';

export const powerApi = baseHeroApi.injectEndpoints({
  endpoints: (builder) => ({
    addPower: builder.mutation<IPower, ICreatePower>({
      query: (data) => ({
        url: 'power',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hero'],
    }),
    removePower: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `power/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),
  }),
});

export const {
  useAddPowerMutation,
  useRemovePowerMutation
} = powerApi;
