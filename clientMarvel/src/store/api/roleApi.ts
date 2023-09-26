import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL_SERVER } from "../../constants/url"
import { IRole, ICreateRole } from "../../model/roleModel"

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_SERVER}`,
  }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    createRole: builder.mutation<IRole, ICreateRole>({
      query: (dto) => ({
        url: "/roles",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Role"],
    }),
    getAllRole: builder.query<IRole[], void>({
      query: () => ({
        url: `/roles`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getRoleByValue: builder.query<IRole, string>({
      query: (value) => ({
        url: `/roles/${value}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
  }),
})

export const {
  useCreateRoleMutation,
  useGetRoleByValueQuery,
  useGetAllRoleQuery,
} = roleApi
