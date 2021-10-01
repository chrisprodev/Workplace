import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { googlePopUp, addNewUser } from "../../features/user/userSlice";
import GoogleColor from "../../components/icons/GoogleColor";
import {
  Container,
  Divider,
  ErrorMsg,
  FormContainer,
  Header,
  HeaderSVG,
  MainWrapper,
  SignInMsg,
  SocialBtn,
  SpanError,
  SubmitBtn,
} from "./SignUp.Style";
import db from "../../firebase";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  addDoc,
  query,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import { setUser, fetchUser } from "../../features/user/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/channels");
      } else {
        setLoad(true);
        dispatch(setUser(null));
      }
    });
  }, [dispatch, history]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signUpEmail, setSignUpEmail] = useState(false);

  const handleSignUpEmail = () => {
    setSignUpEmail(true);
  };

  const handleReturnSignUp = () => {
    setSignUpEmail(false);
  };

  const popUpGoogle = async () => {
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
      if (querySnapshot.docs.length === 0) {
        //* User not exist
        addDoc(collection(db, "users"), {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: "Guest",
          directMessages: [],
        }).then(() => {
          dispatch(
            setUser({
              name: result.user.displayName,
              email: result.user.email,
              photoURL: result.user.photoURL,
              role: "Guest",
              directMessages: [],
            })
          );
          history.push("/channels");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (userData) => {
    //* check if user exist
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs.length);
    if (querySnapshot.docs.length === 0) {
      //* Create user with email and pass
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userData.email, userData.pass)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const docRef = await addDoc(collection(db, "users"), {
            name: userData.name,
            email: user.email,
            photoURL: null,
            role: "Guest",
            directMessages: [],
          });

          dispatch(
            setUser({
              id: docRef.id,
              name: userData.name,
              email: user.email,
              photoURL: null,
              role: "Guest",
              directMessages: [],
            })
          );
          history.push("/channels");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Email already in use. Try to Login");
    }
  };

  return (
    <Container>
      {load && (
        <>
          <img src="/images/workplace.svg" alt="workplace_logo" />
          {signUpEmail ? (
            <>
              <HeaderSVG onClick={signUpEmail && handleReturnSignUp}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ marginTop: "0.1rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <h2>Create account</h2>
              </HeaderSVG>
              {error && (
                <ErrorMsg>
                  <p>
                    {`${error} `}
                    <Link to="/login" onClick={() => setError(null)}>
                      Log in.
                    </Link>
                  </p>
                  <svg
                    onClick={() => setError(null)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </ErrorMsg>
              )}
              <MainWrapper>
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="name">First name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your first name"
                    {...register("name", {
                      required: true,
                      minLength: 3,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors.name && errors.name.type === "minLength" && (
                    <SpanError>Minimun length 3 characters</SpanError>
                  )}
                  {errors.name && errors.name.type === "pattern" && (
                    <SpanError>Enter a name without space or numbers</SpanError>
                  )}
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email here."
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.email && errors.email.type === "pattern" && (
                    <SpanError>Invalid email</SpanError>
                  )}
                  <label htmlFor="pass">Password</label>
                  <input
                    type="password"
                    id="pass"
                    {...register("pass", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors.pass && errors.pass.type === "minLength" && (
                    <SpanError>Minimun length 6 characters</SpanError>
                  )}
                  <SubmitBtn type="submit" margin={signUpEmail}>
                    Get started
                  </SubmitBtn>
                </FormContainer>
              </MainWrapper>
              <SignInMsg>
                I already have an account
                <Link to="/login">Log in</Link>
              </SignInMsg>
            </>
          ) : (
            <>
              <Header>
                <h2>Sign up to Workplace</h2>
              </Header>
              <MainWrapper>
                <SocialBtn onClick={popUpGoogle}>
                  <GoogleColor />
                  Sign up with Google
                </SocialBtn>
                <Divider>
                  <hr />
                  <p>or</p>
                  <hr />
                </Divider>
                <FormContainer>
                  <SubmitBtn onClick={handleSignUpEmail} margin={signUpEmail}>
                    Create account
                  </SubmitBtn>
                </FormContainer>
              </MainWrapper>
              <SignInMsg>
                I already have an account
                <Link to="/login">Log in</Link>
              </SignInMsg>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SignUp;
