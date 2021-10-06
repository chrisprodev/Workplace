import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import GoogleColor from "../../components/icons/GoogleColor";
import {
  createUserEmail,
  createUserGoogle,
  resetStatus,
  selectCreateUserStatus,
} from "../../features/user/userSlice";
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

const SignUp = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const createUserStatus = useSelector(selectCreateUserStatus);

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (createUserStatus === "Success") {
      history.push("/channels");
    } else {
      const userEmail = localStorage.getItem("uemail");
      if (userEmail) {
        history.push("/channels");
      }
      setLoad(true);
      if (createUserStatus === "Failed") {
        setError("Email already in use. Try to ");
      }
    }
  }, [createUserStatus, history]);

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

  const popUpGoogle = () => {
    dispatch(createUserGoogle());
  };

  const onSubmit = async (userData) => {
    dispatch(createUserEmail(userData));
  };

  const resetError = () => {
    setError(null);
    dispatch(resetStatus());
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
                    <Link to="/login" onClick={() => resetError()}>
                      Log in.
                    </Link>
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
                  <SubmitBtn
                    type="submit"
                    margin={signUpEmail}
                    disabled={createUserStatus === "Pending"}
                  >
                    Get started
                  </SubmitBtn>
                </FormContainer>
              </MainWrapper>
              <SignInMsg>
                I already have an account
                <Link to="/login" onClick={() => error && resetError()}>
                  Log in
                </Link>
              </SignInMsg>
            </>
          ) : (
            <>
              <Header>
                <h2>Sign up to Workplace</h2>
              </Header>
              <MainWrapper>
                <SocialBtn
                  onClick={popUpGoogle}
                  loading={createUserStatus === "Pending" ? "true" : "false"}
                >
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
                <Link to="/login" onClick={() => error && resetError()}>
                  Log in
                </Link>
              </SignInMsg>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SignUp;
