import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../../interface/authInterface";

interface TInitState {
  isLogging: boolean;
  data: {
    name: string;
    email: string;
    _id: string;
  } | null;
}

const initialState: TInitState = {
  isLogging: false,
  data: {
    name: "",
    email: "",
    _id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<TUser | null>) => {
      state.data = action.payload;
      state.isLogging = Boolean(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
