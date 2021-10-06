import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoogleColor from "../../components/icons/GoogleColor";
import {
  loginUserEmail,
  loginUserGoogle,
  resetStatus,
  selectFecthUserStatus,
} from "../../features/user/userSlice";
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
  let history = useHistory();
  const dispatch = useDispatch();
  const loginUserStatus = useSelector(selectFecthUserStatus);

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (loginUserStatus === "Success") {
      history.push("/channels");
    } else {
      const userEmail = localStorage.getItem("uemail");
      if (userEmail) {
        history.push("/channels");
      }
      setLoad(true);
      if (loginUserStatus === "Failed") {
        setError("user-not-found");
      }
    }
  }, [loginUserStatus, history]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInGoogle = async () => {
    dispatch(loginUserGoogle());
  };

  const resetError = () => {
    setError(null);
    dispatch(resetStatus());
  };

  const onSubmit = async (data) => {
    dispatch(loginUserEmail(data));
  };

  return (
    <Container>
      {load && (
        <>
          <img src="/images/workplace.svg" alt="workplace_logo" />
          <Header>
            <h2>Log in to your account</h2>
          </Header>
          {error && (
            <ErrorMsg>
              <p>
                Couldn't find your account. Log in with a diferrent account or{" "}
                <Link to="/" onClick={() => resetError()}>
                  Sign up
                </Link>
                .
              </p>
              <svg
                onClick={() => resetError()}
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
            <Link to="/" onClick={() => error && resetError()}>
              Sign up
            </Link>
          </SignInMsg>
        </>
      )}
    </Container>
  );
};

export default Login;
