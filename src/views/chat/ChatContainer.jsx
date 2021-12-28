import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import RightBar from "./RightBar";
import SideBar from "./SideBar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser, fetchUser } from "../../features/user/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ChatContainer = () => {
  const user = useSelector(selectUser);
  let history = useHistory();
  const dispatch = useDispatch();
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          dispatch(fetchUser(authUser.email));
          if (authUser.email) {
            localStorage.setItem("uemail", authUser.email);
          }
        } else {
          history.push("/");
        }
      });
    } else {
      setUserExist(true);
    }
  }, [dispatch, history, user]);

  return (
    userExist && (
      <Container>
        <SideBar />
        <Chat />
        <RightBar />
      </Container>
    )
  );
};

export default ChatContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: 22rem auto 24rem;
  height: 100vh;

  @media screen and (max-width: 1280px) {
    grid-template-columns: none;
    height: unset;
  }
`;
