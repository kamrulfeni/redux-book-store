import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IFilter {
  searchTerm: string;
  genreFilter: string;
  yearFilter: string;
}
interface TInitState {
  filter: IFilter;
}

const initialState: TInitState = {
  filter: {
    searchTerm: "",
    genreFilter: "",
    yearFilter: "",
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<IFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setFilter } = bookSlice.actions;
export default bookSlice.reducer;
