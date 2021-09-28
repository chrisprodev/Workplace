import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuth,
  addNewUser,
  selectUser,
} from "../../features/user/userSlice";
import GoogleColor from "../../components/icons/GoogleColor";
import {
  Container,
  Divider,
  //ErrorMsg,
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let history = useHistory();

  useEffect(() => {
    if (user && user.querySize > 0) {
      //* User exist on DB
      history.push("/channels");
    } else {
      //* User not exist on DB
      if (user) {
        //* Add New User
        dispatch(addNewUser(user.user));
      }

      //   // await addMember(userData);
      //   // await addMemberToDM(userData);
      //   // dispatch(setUser({ id: userData.docId, ...userData }));
      //   // history.push("/channels");
      // }
    }
  }, [user, history, dispatch]);

  const {
    register,
    //handleSubmit,
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
    dispatch(getUserAuth());
  };

  return (
    <Container>
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

          <MainWrapper>
            <FormContainer
            //onSubmit={handleSubmit(onSubmit)}
            >
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
    </Container>
  );
};

export default SignUp;
