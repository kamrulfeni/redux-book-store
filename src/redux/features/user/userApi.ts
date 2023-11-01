import { TLogin, TRegister, TUser } from "../../../interface/authInterface";
import { TApiResponse } from "../../../interface/globalInterface";
import { api } from "../api";

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyData: builder.query<TApiResponse<TUser>, undefined>({
      query: () => `/users/me`,
      transformErrorResponse: (response) => response.data,
      providesTags: ["user"],
    }),
    postRegister: builder.mutation({
      query: (data: TRegister) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    postLogin: builder.mutation({
      query: (data: TLogin) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    postLogout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["user"],
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetMyDataQuery,
  usePostRegisterMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
} = registerApi;
