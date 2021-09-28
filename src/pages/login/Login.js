import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import GoogleColor from "../../components/icons/GoogleColor";
import {
  SubmitBtn,
  SpanError,
  SocialBtn,
  SignInMsg,
  MainWrapper,
  Header,
  FormContainer,
  //ErrorMsg,
  Divider,
  Container,
} from "./Login.Styles";

const Login = () => {
  //let history = useHistory();

  const {
    register,
    //handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container>
      <img src="/images/workplace.svg" alt="workplace_logo" />
      <Header>
        <h2>Log in to your account</h2>
      </Header>

      <MainWrapper>
        <SocialBtn
        //onClick={logInGoogle}
        >
          <GoogleColor />
          Log in with Google
        </SocialBtn>
        <Divider>
          <hr />
          <p>or</p>
          <hr />
        </Divider>
        <FormContainer
        //onSubmit={handleSubmit(onSubmit)}
        >
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
        <Link
          to="/"
          //onClick={() => dispatch(setError(null))}
        >
          Sign up
        </Link>
      </SignInMsg>
    </Container>
  );
};

export default Login;
