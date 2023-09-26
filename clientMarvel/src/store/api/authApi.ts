import { ILogin, ILoginRes, IRegister, IUserInfo } from "../../model/userModel"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const urls = {
  AUTH: "/auth",
}

export const authApi = createApi({
  reducerPath: "authApi",
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
  endpoints: (builder) => ({
    login: builder.mutation<IUserInfo, ILogin>({
      query: (data) => ({
        url: `${urls.AUTH}/login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ILoginRes) => {
        return {
          id: response.id,
          email: response.email,
          roles: response.roles?.map((role) => role.value) || [],
          token: response.token,
        }
      },
    }),
    register: builder.mutation<IUserInfo, IRegister>({
      query: (data) => ({
        url: `${urls.AUTH}/registration`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
