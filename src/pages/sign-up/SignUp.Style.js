import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f9fb;

  img {
    height: 2.4rem;
    margin-bottom: 1.6rem;
  }

  @media screen and (max-width: 1023px) {
    background: white;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
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

export const SocialBtn = styled.div`
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
  }

  :hover {
    border: solid 0.2rem var(--main-blue);
  }

  @media screen and (max-width: 1023px) {
    width: 18rem;
  }
`;

export const Divider = styled.div`
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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 22.4rem;
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

export const SubmitBtn = styled.button`
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

export const SignInMsg = styled.div`
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

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: var(--dark-gray);
    font-weight: 500;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export const HeaderSVG = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: var(--dark-gray);
    font-weight: 500;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  :hover {
    h2 {
      color: var(--main-blue);
    }
    color: var(--main-blue);
  }
`;

export const ErrorMsg = styled.div`
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

export const SpanError = styled.span`
  color: var(--main-red);
  font-size: 0.9rem;
  display: block;
  margin-top: 0.5rem;
`;
