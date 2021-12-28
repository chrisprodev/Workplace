import React from "react";
import styled from "styled-components";
import { setDirectMessage } from "../features/chat/chatSlice";
import { useDispatch } from "react-redux";

const DMChat = ({ idDM, profile_pic, userName, role, dmChat, onShowMenu }) => {
  const dispatch = useDispatch();

  const handleSetDm = () => {
    dispatch(
      setDirectMessage({ directMessageId: idDM, directMessageUser: userName })
    );
  };

  return (
    <Container
      selected={dmChat && true}
      onClick={() => {
        handleSetDm();
        onShowMenu();
      }}
    >
      {profile_pic ? (
        <UserImg
          src={
            profile_pic.includes("http")
              ? profile_pic
              : `/images/${profile_pic}`
          }
        />
      ) : (
        <UserNamePic>
          {userName.charAt(0).toUpperCase() + userName.substring(1, 2)}
        </UserNamePic>
      )}
      <UserDetailsWrap>
        <Wraper>
          <h4>{userName}</h4>
          <Role>{role.length > 24 ? `${role.substring(0, 24)}...` : role}</Role>
        </Wraper>
      </UserDetailsWrap>
    </Container>
  );
};

export default DMChat;

const Container = styled.div`
  padding: 1rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  color: ${(props) => (props.selected ? "#fff" : "var(--main-black)")};
  background: ${(props) => props.selected && "var(--main-blue)"};
  transition: all 250ms cubic-bezier(0.075, 0.85, 0.15, 1);

  :hover {
    color: ${(props) => (props.selected ? "#fff" : "var(--main-blue)")};
    background: ${(props) =>
      props.selected ? "var(--main-blue)" : "rgba(78,115,248,0.15)"};
  }
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

const Role = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
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
