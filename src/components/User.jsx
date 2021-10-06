import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { resetStatus, selectUser, setUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let history = useHistory();
  const [openLogoutMenu, setOpenLogoutMenu] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("uemail");
        dispatch(setUser(null));
        dispatch(resetStatus());
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MainContainer>
      {openLogoutMenu && (
        <LogoutMenu onClick={handleLogout}>Log out</LogoutMenu>
      )}
      <Container onClick={() => setOpenLogoutMenu(true)}>
        {user && user.photoURL ? (
          <UserImg src={user.photoURL} />
        ) : (
          <UserNamePic>
            {user &&
              user.name.charAt(0).toUpperCase() + user.name.substring(1, 2)}
          </UserNamePic>
        )}
        <UserDetailsWrap>
          {user && (
            <Wraper>
              <h4>{user.name}</h4>
              <Role>
                {user.role && user.role.length > 24
                  ? `${user.role.substring(0, 24)}...`
                  : user.role}
              </Role>
            </Wraper>
          )}
        </UserDetailsWrap>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </Container>
      {openLogoutMenu && (
        <PopupMenu onClick={() => setOpenLogoutMenu(false)}></PopupMenu>
      )}
    </MainContainer>
  );
};

export default User;

const MainContainer = styled.div`
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #fff;
  border: solid 0.2rem var(--light-gray);
  padding: 1rem;
  border-radius: 0.5rem;

  :hover {
    border: solid 0.2rem var(--main-blue);
  }

  svg {
    color: var(--dark-gray);
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const UserImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
`;

const UserDetailsWrap = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

const UserNamePic = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: var(--main-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
`;

const Wraper = styled.div`
  margin-left: 1rem;
`;

const Role = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
`;

const PopupMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`;

const LogoutMenu = styled.div`
  background: var(--main-black);
  border: solid 0.2rem var(--main-black);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  position: absolute;
  bottom: 120%;
  width: 87%;
  z-index: 999;
  font-weight: 600;

  ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 45%;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: var(--main-black) transparent transparent transparent;
  }

  :hover {
    //color: var(--main-blue);
    background: var(--main-blue);
    border-color: var(--main-blue);
    cursor: pointer;

    ::after {
      border-color: var(--main-blue) transparent transparent transparent;
    }
  }
`;
