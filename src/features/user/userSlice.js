import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAuth, addUser } from "../../utils/user/signUp";

//* Async Thunk getUserAuth
export const getUserAuth = createAsyncThunk("user/getUserAuth", async () => {
  return await userAuth();
});

//* Async Thunk addNewUser
export const addNewUser = createAsyncThunk("user/addNewUser", async (user) => {
  return await addUser(user);
});

//* User Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //* getUserAuth Status
    builder.addCase(getUserAuth.fulfilled, (state, action) => {
      state.status = "Success";
      state.user = action.payload;
    });
    builder.addCase(getUserAuth.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(getUserAuth.rejected, (state) => {
      state.status = "Failed";
    });
    //* addNewUser Status
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.status = "Success";
      state.user = action.payload;
    });
    builder.addCase(addNewUser.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(addNewUser.rejected, (state) => {
      state.status = "Failed";
    });
  },
});

// Action creators
export const { logout } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
