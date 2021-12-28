import React, { useState } from "react";
import styled from "styled-components";
import { selectUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { selectChannel, selectDM } from "../../features/chat/chatSlice";
import GroupChat from "../../components/GroupChat";
import DMChat from "../../components/DMChat";
import User from "../../components/User";

const SideBar = () => {
  const user = useSelector(selectUser);
  const idChannel = useSelector(selectChannel);
  const idDM = useSelector(selectDM);
  const [menu, showMenu] = useState(false);

  return (
    <Container>
      <div>
        <MenuHeader>
          <Logo src="/images/workplace.svg" alt="workplace_logo" />
          <Hamburger onClick={() => showMenu(!menu)}>
            <span />
            <span />
            <span />
          </Hamburger>
        </MenuHeader>
        <Menu displayMenu={menu}>
          <ChatWrap>
            <Section>
              <h4>Channels</h4>
            </Section>
            {user &&
              user.channels &&
              user.channels.map((channel) => (
                <GroupChat
                  key={channel.idChannel}
                  idChannel={channel.idChannel}
                  title={channel.name}
                  channel={idChannel === channel.idChannel && idChannel}
                  onShowMenu={() => showMenu(!menu)}
                />
              ))}
          </ChatWrap>
          <DMWraper>
            {user && user.directMessages && (
              <>
                <Section>
                  <h4>Direct Messages</h4>
                </Section>
                {user.directMessages.map((message) => (
                  <DMChat
                    key={message.idDM}
                    idDM={message.idDM}
                    profile_pic={message.profile_pic}
                    userName={message.userName}
                    role={message.role}
                    dmChat={idDM === message.idDM && idDM}
                    onShowMenu={() => showMenu(!menu)}
                  />
                ))}
              </>
            )}
          </DMWraper>
        </Menu>
      </div>
      <TitleBar>
        <User />
      </TitleBar>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  border-right: solid 0.1rem #edf0f4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fafafa;
  padding: 1rem 0;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media screen and (max-width: 1280px) {
    border-right: none;
    border-bottom: solid 0.1rem #edf0f4;
  }
`;

const MenuHeader = styled.div`
  @media screen and (max-width: 1280px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Menu = styled.div`
  @media screen and (max-width: 1280px) {
    position: fixed;
    top: 71px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: #fafafa;
    display: ${({ displayMenu }) => (displayMenu ? "block" : "none")};
  }
`;

const Logo = styled.img`
  margin-left: 2rem;
  height: 1.8rem;
  margin-top: 0.5rem;
`;

const ChatWrap = styled.div`
  padding: 0 2rem;
`;

const Section = styled.div`
  margin-top: 0.8rem;
  padding: 1.9rem 0;

  h4 {
    font-size: 1.4rem;
    font-weight: 600;
  }

  @media screen and (max-width: 1280px) {
    margin-top: 0;
    padding: 1.4rem 0;
  }
`;

const DMWraper = styled.div`
  padding: 0 2rem;
`;

const TitleBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 1rem 2rem;

  h3 {
    background: white;
    border: solid 1.2px #e4e4e4;
    border-radius: 10px;
    padding: 1.2rem 2rem;
    width: 100%;
  }

  @media screen and (max-width: 1280px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-right: 32px;
  cursor: pointer;

  span {
    margin: 2.6px 0;
    height: 3.8px;
    width: 2rem;
    border-radius: 4px;
    background: var(--dark-gray);
  }

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;
