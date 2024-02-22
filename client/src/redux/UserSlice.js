
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser:null,
  isLoggedIn: false,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCurrentUser, logoutUser } = UserSlice.actions;
const UserReducer =  UserSlice.reducer;
export default UserReducer;




