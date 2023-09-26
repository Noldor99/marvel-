import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_SERVER } from "../../constants/url";


export const baseHeroApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_SERVER}`
  }),
  tagTypes: ["Hero"],
  endpoints: () => ({}),
}); 