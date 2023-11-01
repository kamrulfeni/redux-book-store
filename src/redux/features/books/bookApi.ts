import { IBook, TCreateBook } from "../../../interface/bookInterface";
import { TApiResponse } from "../../../interface/globalInterface";
import { api } from "../api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<TApiResponse<IBook[]>, string>({
      query: (params: string) => `/books?${params}`,
      providesTags: ["books"],
    }),
    getSingleBooks: builder.query<TApiResponse<IBook>, string>({
      query: (id: string) => `/books/${id}`,
      providesTags: ["books"],
    }),
    getYears: builder.query<TApiResponse<string[]>, string>({
      query: (params: string) => `/books/year?${params}`,
    }),
    postBooks: builder.mutation<TApiResponse<IBook>, Partial<TCreateBook>>({
      query: (data: TCreateBook) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => response,
      invalidatesTags: ["books"],
    }),
    updateBooks: builder.mutation({
      query: ({ id, data }: { id: string; data: IBook }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["books"],
    }),
    removeBooks: builder.mutation<TApiResponse<IBook>, string>({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetYearsQuery,
  useUpdateBooksMutation,
  useGetSingleBooksQuery,
  usePostBooksMutation,
  useRemoveBooksMutation,
} = productApi;
