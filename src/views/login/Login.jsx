import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleColor from "../../components/icons/GoogleColor";
import { setUser } from "../../features/user/userSlice";
import db from "../../firebase";
import { query, getDocs, where, collection } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  SubmitBtn,
  SpanError,
  SocialBtn,
  SignInMsg,
  MainWrapper,
  Header,
  FormContainer,
  ErrorMsg,
  Divider,
  Container,
} from "./Login.Styles";

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/channels");
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch, history]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInGoogle = async () => {
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
        history.push("/channels");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    //* Sign in user with email and pass
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.pass)
      .then(async (userCredential) => {
        //* check if user exist
        const q = query(
          collection(db, "users"),
          where("email", "==", userCredential.email)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          history.push("/channels");
        }
      })
      .catch((error) => {
        console.log(error);
        setError({ code: "wrong-password", message: "Wrong password" });
      });
  };

  return (
    <Container>
      <img src="/images/workplace.svg" alt="workplace_logo" />
      <Header>
        <h2>Log in to your account</h2>
      </Header>
      {error && error.code === "user-not-found" && (
        <ErrorMsg>
          <p>
            Couldn't find your account. Log in with a diferrent account or{" "}
            <Link to="/" onClick={() => setError(null)}>
              Sign up
            </Link>
            .
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
      {error && error.code === "wrong-password" && (
        <ErrorMsg>
          <p>The password is wrong.</p>
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
        <SocialBtn onClick={logInGoogle}>
          <GoogleColor />
          Log in with Google
        </SocialBtn>
        <Divider>
          <hr />
          <p>or</p>
          <hr />
        </Divider>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
          <SubmitBtn type="submit">Log in</SubmitBtn>
        </FormContainer>
      </MainWrapper>
      <SignInMsg>
        Don't have an account?
        <Link to="/" onClick={() => setError(null)}>
          Sign up
        </Link>
      </SignInMsg>
    </Container>
  );
};

export default Login;
