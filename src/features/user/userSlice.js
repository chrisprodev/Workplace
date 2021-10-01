import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../../firebase";
import {
  doc,
  getDoc,
  addDoc,
  query,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//* Async Thunk fetchUser
export const fetchUser = createAsyncThunk("user/fetchUser", async (uid) => {
  const docRef = doc(db, "users", uid);
  console.log(uid);
  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
    const docSnap = await getDoc(docRef);
    console.log(docSnap, docSnap.exists());
    if (docSnap.exists()) {
      return {
        name: docSnap.data().name,
        email: docSnap.data().email,
        photoURL: docSnap.data().photoURL,
        uid: docSnap.id,
      };
    }
  } catch (e) {
    console.log("Error getting document:", e);
  }
});

//* Async Thunk googlePopUp
export const googlePopUp = createAsyncThunk("user/googlePopUp", async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    //* check if user exist
    const q = query(
      collection(db, "users"),
      where("email", "==", result.user.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      return {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "Guest",
        directMessages: [],
      };
    } else {
      //* User not exist
      const tempDocRef = await addDoc(collection(db, "users"), {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "Guest",
        directMessages: [],
      });
      return {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "Guest",
        directMessages: [],
      };
    }
  } catch (error) {
    console.log(error);
  }
});

//* Async Thunk addNewUser
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (userData, { rejectWithValue }) => {
    //* get Auth by email and pass
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.pass
    );

    //* User not exist
    const docRef = await addDoc(collection(db, "users"), {
      name: userData.name,
      email: result.user.email,
      photoURL: null,
      role: "Guest",
      directMessages: [],
    });

    return {
      uid: docRef.id,
      name: userData.name,
      email: result.user.email,
      photoURL: null,
      role: "Guest",
      directMessages: [],
    };
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
    //* googlePopUp Status
    builder.addCase(googlePopUp.fulfilled, (state, action) => {
      state.status = "Success";
      state.user = action.payload;
    });
    builder.addCase(googlePopUp.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(googlePopUp.rejected, (state, action) => {
      state.status = "Failed";
      state.error = action.payload;
    });
    //* addNewUser Status
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.status = "Success";
      state.user = action.payload;
    });
    builder.addCase(addNewUser.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.status = "Failed";
      state.error = action.payload;
    });
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
