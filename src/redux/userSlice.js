import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    //states for user
    user: {},
    token: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeUser: (state) => {
      state.user = [];
      state.token = "";
    },
  },
});
export const userReducer = userSlice.reducer;
export const { addUser, removeUser, addToken } = userSlice.actions;
