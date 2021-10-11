import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { channels } from "../../constants/mockData";
import db from "../../firebase";

//* Async Thunk fetchChannel
export const fetchChannel = createAsyncThunk(
  "user/fetchChannel",
  async (channelID) => {
    const subColRef = query(
      collection(db, "channels", channelID, "messages"),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(subColRef);
    let messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return messages;
  }
);

//* Async Thunk fetchDM
export const fetchDM = createAsyncThunk("user/fetchDM", async (dmID) => {
  const subColRef = query(
    collection(db, "directMessages", dmID, "messages"),
    orderBy("timestamp", "asc")
  );

  const querySnapshot = await getDocs(subColRef);
  let messages = [];
  querySnapshot.forEach((doc) => {
    messages.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return messages;
});

//* Async Thunk addMessage
export const addMessage = createAsyncThunk(
  "chat/addMessage",
  async (data, { dispatch }) => {
    if (data.channelID) {
      // Add a new document with a generated id.
      await addDoc(collection(db, "channels", data.channelID, "messages"), {
        profile_pic: data.user.profile_pic ? data.user.profile_pic : null,
        userName: data.user.name,
        timestamp: serverTimestamp(),
        message: data.text ? data.text : null,
      });
      return dispatch(fetchChannel(data.channelID));
    } else {
      await addDoc(collection(db, "directMessages", data.dmID, "messages"), {
        profile_pic: data.user.profile_pic ? data.user.profile_pic : null,
        userName: data.user.name,
        timestamp: serverTimestamp(),
        message: data.text ? data.text : null,
      });
      return dispatch(fetchDM(data.dmID));
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
    messages: [],
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
  extraReducers: {
    //* fetchChannel Status
    [fetchChannel.fulfilled]: (state, action) => {
      state.status = "Success";
      state.messages = action.payload;
    },
    [fetchChannel.pending]: (state) => {
      state.status = "Pending";
    },
    [fetchChannel.rejected]: (state) => {
      state.status = "Failed";
    },
    //* fetchDM Status
    [fetchDM.fulfilled]: (state, action) => {
      state.status = "Success";
      state.messages = action.payload;
    },
    [fetchDM.pending]: (state) => {
      state.status = "Pending";
    },
    [fetchDM.rejected]: (state) => {
      state.status = "Failed";
    },
  },
});

// Action creators
export const { setChannel, setDirectMessage } = chatSlice.actions;

// Selectors
export const selectChannel = (state) => state.chat.selectedChannel;
export const selectChannelName = (state) => state.chat.channelName;
export const selectDM = (state) => state.chat.directMessageId;
export const selectDMName = (state) => state.chat.directMessageUser;
export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
