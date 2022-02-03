import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../../firebase";
import {
  doc,
  query,
  getDocs,
  where,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { channels, myData } from "../../constants/mockData";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";

//* Async Thunk fetchUser
export const fetchUser = createAsyncThunk("user/fetchUser", async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  }
});

//* Async Thunk createUserGoogle
export const createUserGoogle = createAsyncThunk(
  "user/createUserGoogle",
  async (signUpProvider, { rejectWithValue }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //* check if user exist
    const q = query(
      collection(db, "users"),
      where("email", "==", result.user.email)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      //* creating user
      const userDoc = await addDoc(collection(db, "users"), {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        provider: "Google",
        role: "Guest",
        directMessages: [],
      });

      const docDMRef = await addDoc(collection(db, "directMessages"), {
        members: [
          {
            idUser: userDoc.id,
            name: result.user.displayName,
            profile_pic: result.user.photoURL,
            role: "Guest",
          },
          { ...myData },
        ],
      });

      const tempUserRef = doc(db, "users", userDoc.id);
      await updateDoc(tempUserRef, {
        directMessages: [
          {
            idDM: docDMRef.id,
            userName: myData.name,
            profile_pic: myData.profile_pic,
            role: myData.role,
          },
        ],
      });

      const querySnapshot = await getDocs(collection(db, "channels"));
      querySnapshot.forEach(async (channel) => {
        const tempRef = doc(db, "channels", channel.id);
        await updateDoc(tempRef, {
          members: arrayUnion({
            idUser: userDoc.id,
            name: result.user.displayName,
            profile_pic: result.user.photoURL,
            role: "Guest",
          }),
        });
      });

      return true;
    } else {
      return rejectWithValue("Email already in use");
    }
  }
);

//* Async Thunk createUserEmail
export const createUserEmail = createAsyncThunk(
  "user/createUserEmail",
  async (userData, { rejectWithValue }) => {
    //* check if user exist
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email),
      where("provider", "==", "Google")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      //* Create user with email and pass
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.pass
      );

      const user = userCredential.user;

      const userDoc = await addDoc(collection(db, "users"), {
        name: userData.name,
        email: user.email,
        photoURL: null,
        provider: "Email",
        role: "Guest",
        directMessages: [],
      });

      const docDMRef = await addDoc(collection(db, "directMessages"), {
        members: [
          {
            idUser: userDoc.id,
            name: userData.name,
            profile_pic: null,
            role: "Guest",
          },
          { ...myData },
        ],
      });

      const tempUserRef = doc(db, "users", userDoc.id);
      await updateDoc(tempUserRef, {
        directMessages: [
          {
            idDM: docDMRef.id,
            userName: myData.name,
            profile_pic: myData.profile_pic,
            role: myData.role,
          },
        ],
      });

      const querySnapshot = await getDocs(collection(db, "channels"));
      querySnapshot.forEach(async (channel) => {
        const tempRef = doc(db, "channels", channel.id);
        await updateDoc(tempRef, {
          members: arrayUnion({
            idUser: userDoc.id,
            name: userData.name,
            profile_pic: null,
            role: "Guest",
          }),
        });
      });

      return true;
    } else {
      return rejectWithValue("Email already in use");
    }
  }
);

//* Async Thunk loginUserGoogle
export const loginUserGoogle = createAsyncThunk(
  "user/loginUserGoogle",
  async (user, { rejectWithValue }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    //* check if user exist
    const q = query(
      collection(db, "users"),
      where("email", "==", result.user.email),
      where("provider", "==", "Google")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      return true;
    } else {
      return rejectWithValue("not user found");
    }
  }
);

//* Async Thunk loginUserEmail
export const loginUserEmail = createAsyncThunk(
  "user/loginUserEmail",
  async (data, { rejectWithValue }) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.pass
    );

    //* check if user exist
    const q = query(
      collection(db, "users"),
      where("email", "==", userCredential.user.email),
      where("provider", "==", "Email")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      return true;
    } else {
      return rejectWithValue("not user found");
    }
  }
);

//* Async Thunk createDM
export const createDM = createAsyncThunk(
  "user/createDM",
  async (dataMembers, { dispatch, getState }) => {
    const docDMRef = await addDoc(collection(db, "directMessages"), {
      members: [...dataMembers],
    });

    const tempUserRef = doc(db, "users", dataMembers[0].idUser);
    await updateDoc(tempUserRef, {
      directMessages: arrayUnion({
        idDM: docDMRef.id,
        userName: dataMembers[1].name,
        profile_pic: dataMembers[1].profile_pic,
        role: dataMembers[1].role,
      }),
    });

    const state = getState();
    return dispatch(fetchUser(state.user.user.email));
  }
);

//* User Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    createUserStatus: null,
    fetchStatus: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetStatus: (state) => {
      state.fetchStatus = null;
      state.createUserStatus = null;
    },
  },
  extraReducers: {
    //* fetchUser Status
    [fetchUser.fulfilled]: (state, action) => {
      state.fetchStatus = "Success";
      state.user = action.payload;
    },
    [fetchUser.pending]: (state) => {
      state.fetchStatus = "Pending";
    },
    [fetchUser.rejected]: (state) => {
      state.fetchStatus = "Failed";
    },
    //* createUserGoogle Status
    [createUserGoogle.fulfilled]: (state) => {
      state.createUserStatus = "Success";
    },
    [createUserGoogle.pending]: (state) => {
      state.createUserStatus = "Pending";
    },
    [createUserGoogle.rejected]: (state) => {
      state.createUserStatus = "Failed";
    },
    //* createUserEmail Status
    [createUserEmail.fulfilled]: (state) => {
      state.createUserStatus = "Success";
    },
    [createUserEmail.pending]: (state) => {
      state.createUserStatus = "Pending";
    },
    [createUserEmail.rejected]: (state) => {
      state.createUserStatus = "Failed";
    },
    //* loginUserGoogle Status
    [loginUserGoogle.fulfilled]: (state) => {
      state.fetchStatus = "Success";
    },
    [loginUserGoogle.pending]: (state) => {
      state.fetchStatus = "Pending";
    },
    [loginUserGoogle.rejected]: (state) => {
      state.fetchStatus = "Failed";
    },
    //* loginUserEmail Status
    [loginUserEmail.fulfilled]: (state) => {
      state.fetchStatus = "Success";
    },
    [loginUserEmail.pending]: (state) => {
      state.fetchStatus = "Pending";
    },
    [loginUserEmail.rejected]: (state) => {
      state.fetchStatus = "Failed";
    },
    //* createDM Status
    [createDM.fulfilled]: (state) => {
      state.fetchStatus = "Success";
    },
    [createDM.pending]: (state) => {
      state.fetchStatus = "Pending";
    },
    [createDM.rejected]: (state) => {
      state.fetchStatus = "Failed";
    },
  },
});

// Action creators
export const { setUser, resetStatus } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectCreateUserStatus = (state) => state.user.createUserStatus;
export const selectFecthUserStatus = (state) => state.user.fetchStatus;

export default userSlice.reducer;
