import { IAddRole, IDeleteRole, IUser } from "../../model/userModel"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const urls = {
  USER: "/user",
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.userInfo?.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    addRoleToUser: builder.mutation<void, IAddRole>({
      query: (data) => ({
        url: `${urls.USER}/role`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteRoleFromUser: builder.mutation<void, IDeleteRole>({
      query: ({ userId, roleValue }) => ({
        url: `${urls.USER}/role/${userId}/${roleValue}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query<IUser, void>({
      query: () => ({
        url: `${urls.USER}/me`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUser: builder.query<IUser[], void>({
      query: () => ({
        url: `${urls.USER}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useGetAllUserQuery,
  useAddRoleToUserMutation,
  useDeleteRoleFromUserMutation,
} = userApi
