import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../../firebase";
import { query, getDocs, where, collection } from "firebase/firestore";
import { channels } from "../../constants/mockData";

//* Async Thunk fetchUser
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (email, { rejectWithValue }) => {
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        return {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
          channels: [...channels],
        };
      } else {
        rejectWithValue("Fetch user failed");
      }
    } catch (e) {
      console.log("Error getting document:", e);
    }
  }
);

//* User Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //* fetchUser Status
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "Success";
      state.user = action.payload;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "Failed";
    });
  },
});

// Action creators
export const { setUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
