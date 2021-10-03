import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { channels } from "../../constants/mockData";

//* Async Thunk fetchChannel
export const fetchChannel = createAsyncThunk(
  "user/fetchChannel",
  async (channelID, { rejectWithValue }) => {
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      //fetch channels
    } catch (e) {
      console.log("Error getting document:", e);
    }
  }
);

//* chatSlice Slice
export const chatSlice = createSlice({
  name: "channel",
  initialState: {
    selectedChannel: channels[0].idChannel,
    channelName: channels[0].name,
    directMessageId: null,
    directMessageUser: null,
    status: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.selectedChannel = action.payload.selectedChannel;
      state.channelName = action.payload.channelName;
      state.directMessageId = null;
      state.directMessageUser = null;
    },
    setDirectMessage: (state, action) => {
      state.selectedChannel = null;
      state.channelName = null;
      state.directMessageId = action.payload.directMessageId;
      state.directMessageUser = action.payload.directMessageUser;
    },
  },
  extraReducers: (builder) => {
    //* fetchChannel Status
    builder.addCase(fetchChannel.fulfilled, (state, action) => {
      state.status = "Success";
      state.selectedChannel = action.payload;
    });
    builder.addCase(fetchChannel.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(fetchChannel.rejected, (state) => {
      state.status = "Failed";
    });
  },
});

// Action creators
export const { setChannel } = chatSlice.actions;

// Selectors
export const selectChannel = (state) => state.chat.selectedChannel;

export default chatSlice.reducer;
