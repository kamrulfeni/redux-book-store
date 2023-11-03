import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //baseUrl: "https://book-librery.vercel.app/api/v1",  https://book-store-server-omega.vercel.app/api/v1/
    baseUrl: "https://book-store-server-omega.vercel.appnpm /api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["books", "user"],

  endpoints: () => ({}),
});
