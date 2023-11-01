import { configureStore } from "@reduxjs/toolkit";

import { api } from "./features/api";
import wishListReducer from "./features/wishList/wishListSlice";
import userReducer from "./features/user/userSlice";
import booksReducer from "./features/books/booksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishListReducer,
    books: booksReducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
