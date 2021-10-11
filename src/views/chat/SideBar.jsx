import React from "react";
import { selectUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { selectChannel, selectDM } from "../../features/chat/chatSlice";
import GroupChat from "../../components/GroupChat";
import DMChat from "../../components/DMChat";
import User from "../../components/User";
import {
  Container,
  Section,
  ChatWrap,
  DMWraper,
  Logo,
  TitleBar,
} from "./SideBar.Style";

const SideBar = () => {
  const user = useSelector(selectUser);
  const idChannel = useSelector(selectChannel);
  const idDM = useSelector(selectDM);

  return (
    <Container>
      <div>
        <Logo src="/images/workplace.svg" alt="workplace_logo" />
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
                />
              ))}
            </>
          )}
        </DMWraper>
      </div>
      <TitleBar>
        <User />
      </TitleBar>
    </Container>
  );
};

export default SideBar;
