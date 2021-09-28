import db from "../../firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  collection,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const checkUserAuth = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user.uid;
    }
  });
};

export const userAuth = () => {
  return new Promise(async (resolve) => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const userObj = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        token: token,
      };

      //Email Query
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", userObj.email)
      );

      const querySnapshot = await getDocs(emailQuery);
      resolve({ user: userObj, querySize: querySnapshot.size });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const addUser = (user) => {
  return new Promise(async (resolve) => {
    try {
      //* New User
      const newUserData = await addNewUser(user);
      await addMember(newUserData);
      resolve();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
};

const addNewUser = async (user) => {
  //* New User
  let userDefaultData = {
    name: user.displayName,
    profile_pic: user.photoURL,
    email: user.email,
    role: "Guest",
    directMessages: [],
  };

  // const docRef = await addDoc(collection(db, "directMessages"), {
  //   members: [
  //     {
  //       idUser: "K0I1jB4W8lARIOKprNLb",
  //       name: "Christian L",
  //       profile_pic:
  //         "https://lh3.googleusercontent.com/a-/AOh14GhR5yAlfwNLgwRJwTnr-Z4egi3I-23bnr22soD07A=s96-c",
  //       role: "Front-end Developer",
  //     },
  //   ],
  // });

  // userDefaultData.directMessages.push({
  //   idDM: docRef.id,
  //   profile_pic:
  //     "https://lh3.googleusercontent.com/a-/AOh14GhR5yAlfwNLgwRJwTnr-Z4egi3I-23bnr22soD07A=s96-c",
  //   role: "Front-End Developer",
  //   unreadMessages: 1,
  //   userName: "Christian L",
  // });

  const newUserData = await addDoc(collection(db, "users"), userDefaultData);
  return { docId: newUserData.id, ...userDefaultData };
};

const addMember = async (userData) => {
  try {
    const querySnapshot = await getDocs(collection(db, "channels"));
    querySnapshot.forEach(async (tempDoc) => {
      const docRef = doc(db, "channels", tempDoc.id);
      await updateDoc(docRef, {
        members: arrayUnion({
          idUser: userData.docId,
          name: userData.name,
          profile_pic: userData.profile_pic,
          role: userData.role,
        }),
      });
    });
  } catch (error) {
    console.log(error);
  }
};
