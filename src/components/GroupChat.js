import React from "react";
import styled from "styled-components";
import { setChannel } from "../features/chat/chatSlice";
import { useDispatch } from "react-redux";

const GroupChat = ({ title, channel, idChannel }) => {
  const dispatch = useDispatch();

  const handleSetChannel = () => {
    dispatch(setChannel({ selectedChannel: idChannel, channelName: title }));
  };

  return (
    <Container selected={channel && true} onClick={handleSetChannel}>
      <Hastag
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </Hastag>

      <UserDetailsWrap>
        <Wraper>
          <h4>{title}</h4>
        </Wraper>
      </UserDetailsWrap>
    </Container>
  );
};

export default GroupChat;

const Container = styled.div`
  cursor: pointer;
  margin-bottom: 0.3rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  background: ${(props) => (props.selected ? "var(--main-blue)" : "none")};
  color: ${(props) => props.selected && "#fff"};
  border-radius: 0.5rem;
  transition: all 250ms cubic-bezier(0.075, 0.85, 0.15, 1);

  :hover {
    color: ${(props) => (props.selected ? "#fff" : "var(--main-blue)")};
    background: ${(props) =>
      props.selected ? "var(--main-blue)" : "rgba(78,115,248,0.15)"};
  }
`;

const Hastag = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
`;

const UserDetailsWrap = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

const Wraper = styled.div`
  margin-left: 0.5rem;
  h4 {
    font-weight: 600;
  }
`;
