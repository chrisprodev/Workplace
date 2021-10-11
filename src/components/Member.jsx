import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createDM, selectUser } from "../features/user/userSlice";

const Member = ({ id, name, role, profile_pic, idDM }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleAddDirectMessage = () => {
    if (user) {
      dispatch(
        createDM([
          {
            idUser: user.id,
            profile_pic: user.profile_pic ? user.profile_pic : null,
            name: user.name,
            role: user.role,
          },
          {
            idUser: id,
            profile_pic: profile_pic ? profile_pic : null,
            name: name,
            role: role,
          },
        ])
      );
    }
  };

  return (
    <MainContainer>
      <Container>
        {profile_pic ? (
          <UserImg
            src={
              role === "Guest"
                ? profile_pic
                : role === "Front-end Developer"
                ? profile_pic
                : `/images/${profile_pic}`
            }
          />
        ) : (
          <UserNamePic>
            {name.charAt(0).toUpperCase() + name.substring(1, 2)}
          </UserNamePic>
        )}

        <UserDetailsWrap>
          <Wraper>
            <h4>{name}</h4>
            <Members>{role}</Members>
          </Wraper>
        </UserDetailsWrap>
      </Container>
      {!idDM && user && user.id !== id ? (
        <CircleIcon onClick={handleAddDirectMessage}>
          <MessageIcon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </MessageIcon>
        </CircleIcon>
      ) : null}
    </MainContainer>
  );
};

export default Member;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const UserDetailsWrap = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

const Wraper = styled.div`
  margin-left: 1rem;
`;

const Members = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
`;

const CircleIcon = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  //padding: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;
  background: #f3f3f5;
  transition: all 250ms cubic-bezier(0.075, 0.85, 0.15, 1);
  :hover {
    background: var(--main-blue);
    color: #fff;
  }
`;

const MessageIcon = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
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
