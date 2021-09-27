import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import GoogleColor from "./icons/GoogleColor";
import styled from "styled-components";

const Login = () => {
  let history = useHistory();

  const {
    register,
    handleSubmit,
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

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f9fb;

  h1 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  img {
    height: 2.4rem;
    margin-bottom: 1.6rem;
  }

  @media screen and (max-width: 1023px) {
    background: white;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 0.5rem;
  padding: 3rem;
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 26px;
  transition: all 500ms cubic-bezier(0.075, 0.85, 0.15, 1);
  @media screen and (max-width: 1023px) {
    padding: 0;
    box-shadow: none;
  }
`;

const SocialBtn = styled.div`
  cursor: pointer;
  background-color: white;
  border: solid 0.2rem var(--light-gray);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 20rem;
  height: 2.4rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 400ms cubic-bezier(0.075, 0.85, 0.15, 1);

  svg {
    margin-right: 1rem;
    path {
      fill: var(--main-black);
    }
  }

  :hover {
    border: solid 0.2rem var(--main-blue);
  }

  @media screen and (max-width: 1023px) {
    width: 18rem;
  }
`;

const Divider = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 22rem;
  transition: width 500ms cubic-bezier(0.075, 0.85, 0.15, 1);

  hr {
    flex-grow: 1;
    margin-top: auto;
    margin-bottom: auto;
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-top: solid 0.2rem #edf0f4;
  }

  p {
    padding: 0 1rem;
    margin: 0;
    font-weight: 600;
  }

  @media screen and (max-width: 1023px) {
    width: 20rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 22rem;
  transition: width 500ms cubic-bezier(0.075, 0.85, 0.15, 1);

  label {
    font-weight: 600;
    margin-top: 1.7rem;
  }

  label:nth-child(1) {
    margin-top: 0;
  }

  input {
    margin-top: 0.7rem;
    border: solid 0.2rem #edf0f4;
    height: 3.4rem;
    border-radius: 0.5rem;
    padding: 0 1rem;
    font-weight: 500;
    font-size: 1rem;

    transition: all 500ms cubic-bezier(0.075, 0.85, 0.15, 1);

    ::placeholder {
      color: #838d94;
    }
    :focus {
      outline: none;
      border-color: var(--main-blue);
    }
  }

  @media screen and (max-width: 1023px) {
    width: 20rem;
  }
`;

const SubmitBtn = styled.button`
  white-space: nowrap;
  border: none;
  font: inherit;
  box-sizing: content-box;
  cursor: pointer;
  height: 2.4rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: var(--main-blue);
  color: #fff;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 400ms cubic-bezier(0.075, 0.85, 0.15, 1);

  :hover {
    background: var(--dark-blue);
  }
`;

const SignInMsg = styled.div`
  margin-top: 2rem;
  font-weight: 500;

  a {
    font-weight: 700;
    cursor: pointer;
    margin-left: 0.3rem;
    color: var(--main-blue);
    transition: all 250ms cubic-bezier(0.075, 0.85, 0.15, 1);
    :hover {
      color: var(--dark-blue);
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  h2 {
    color: var(--dark-gray);
    font-weight: 500;
  }
`;

const ErrorMsg = styled.div`
  background: #ffe9ed;
  color: #ff5574;
  line-height: 1.6rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 26.5rem;
  display: flex;
  justify-content: space-between;

  a {
    font-weight: 700;
  }

  svg {
    flex-shrink: 0;
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 1rem;
    cursor: pointer;
  }

  @media screen and (max-width: 1023px) {
    width: unset;
    margin: 0 1.6rem 1rem 1.6rem;
    max-width: 18.5rem;
  }
`;

const SpanError = styled.span`
  color: var(--main-red);
  font-size: 0.9rem;
  display: block;
  margin-top: 0.7rem;
`;
