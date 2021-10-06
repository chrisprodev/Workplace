import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchChannel,
  fetchDM,
  selectChannel,
  selectChannelName,
  selectDM,
  selectDMName,
  selectMessages,
} from "../../features/chat/chatSlice";
import InputChat from "../../components/InputChat";
import ChatMessages from "../../components/ChatMessages";

const Chat = () => {
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  const channelName = useSelector(selectChannelName);
  const channelID = useSelector(selectChannel);
  const directMessageUser = useSelector(selectDMName);
  const dmID = useSelector(selectDM);
  const messages = useSelector(selectMessages);

  useEffect(() => {
    if (channelName) {
      setTitle(channelName);
      dispatch(fetchChannel(channelID));
    } else {
      setTitle(directMessageUser);
      dispatch(fetchDM(dmID));
    }
  }, [channelName, directMessageUser, dispatch, channelID, dmID]);

  return (
    <Container>
      <Header>
        <HeaderWraper>
          <Hastag
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.4}
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </Hastag>
          <h3>{title && title}</h3>
        </HeaderWraper>
      </Header>
      <div>
        <ChatMessages messages={messages} />
        <InputChat />
      </div>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  border-bottom: solid 0.1rem #edf0f4;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Hastag = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
`;

const HeaderWraper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 4;
  height: 100%;

  h3 {
    font-size: 1.4rem;
    margin-left: 0.5rem;
    font-weight: 600;
  }
`;
