import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../interface/bookInterface";

type TInitialState = {
  books: IBook[];
};

const initialState: TInitialState = {
  books: [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, actions: PayloadAction<IBook>) {
      const isExist = state.books.find(
        (book) => book._id === actions.payload._id
      );
      if (isExist) {
        state.books = state.books.filter(
          (book) => book._id !== actions.payload._id
        );
      } else {
        state.books.push(actions.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
