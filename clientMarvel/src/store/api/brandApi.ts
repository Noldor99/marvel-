import { IBrand, ICreateBrand } from "../../model/brandModel"
import { baseHeroApi } from "./baseHeroApi"

export const brandApi = baseHeroApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation<void, ICreateBrand>({
      query: (name) => ({
        url: "/brand",
        method: "POST",
        body: name,
      }),
      invalidatesTags: ["Hero"],
    }),
    getBrands: builder.query<string[], void>({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
      transformResponse: (response: IBrand[]) => {
        return response.map((item) => item.name)
      },
      providesTags: ["Hero"],
    }),
    getBrandById: builder.query<IBrand, number>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["Hero"],
    }),
    deleteBrand: builder.mutation<void, string>({
      query: (name) => ({
        url: `/brand/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
})

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useDeleteBrandMutation,
} = brandApi
