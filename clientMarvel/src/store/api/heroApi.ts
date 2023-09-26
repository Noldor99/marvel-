import { IHero, IHeroes } from "../../model/heroModel"
import { baseHeroApi } from "./baseHeroApi"

export const heroApi = baseHeroApi.injectEndpoints({
  endpoints: (builder) => ({
    createHero: builder.mutation<IHero, FormData>({
      query: (data) => ({
        url: "/hero",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
    getHeroesWithPagination: builder.query<
      IHeroes,
      {
        page?: number
        limit?: number
        brandName?: string | null
        minPrice?: number
        maxPrice?: number | null
      }
    >({
      query: ({ page = 1, limit = 4, brandName, minPrice, maxPrice }) => {
        let url = `/hero/pagination?page=${page}&limit=${limit}`

        if (brandName && brandName !== "All") {
          url += `&brandName=${brandName}`
        }

        if (minPrice) {
          url += `&minPrice=${minPrice}`
        }

        if (maxPrice) {
          url += `&maxPrice=${maxPrice}`
        }

        return {
          url,
          method: "GET",
        }
      },
      providesTags: ["Hero"],
    }),
    getHero: builder.query<IHero, number>({
      query: (id) => ({
        url: `/hero/${id}`,
        method: "GET",
      }),
      providesTags: ["Hero"],
    }),
    getSearchHero: builder.query<IHero[], string>({
      query: (query) => ({
        url: `/hero/search?query=${query}`,
        method: "GET",
      }),
      providesTags: ["Hero"],
    }),
    updateHero: builder.mutation<IHero, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/hero/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
    deleteHero: builder.mutation<void, number>({
      query: (id) => ({
        url: `/hero/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
})

export const {
  useCreateHeroMutation,
  useGetHeroesWithPaginationQuery,
  useLazyGetHeroesWithPaginationQuery,
  useLazyGetSearchHeroQuery,
  useGetSearchHeroQuery,
  useGetHeroQuery,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApi
