import React from "react";
import styled from "styled-components";
import FileIcons from "./FileIcons";

const ChatMessages = ({ messages }) => {
  return (
    <>
      <ChatWrapper>
        {messages &&
          messages.map((message, i, initArray) =>
            i !== 0 &&
            message.userName === initArray[i - 1 > 0 ? i - 1 : 0].userName ? (
              <OnlyText key={message.id}>
                <TextMsg>{message?.message}</TextMsg>
                {message.attachments && (
                  <FileIconsWraper>
                    {message.attachments.map((file, i) => (
                      <FileIcons file={file} key={i} />
                    ))}
                  </FileIconsWraper>
                )}
              </OnlyText>
            ) : (
              <MessageContainer key={message.id}>
                <UserDetails>
                  {message.profile_pic ? (
                    <UserImg
                      src={
                        message.profile_pic.includes("avatar")
                          ? `/images/${message.profile_pic}`
                          : message.profile_pic
                      }
                    />
                  ) : (
                    <UserNamePic>
                      {message.userName.charAt(0).toUpperCase() +
                        message.userName.substring(1, 2)}
                    </UserNamePic>
                  )}
                  <TitleWrapper>
                    {message.userName}
                    <DateMessage>
                      {message.timestamp &&
                        `${new Date(
                          message.timestamp.seconds * 1000
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                        })} ${new Date(
                          message.timestamp.seconds * 1000
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                    </DateMessage>
                  </TitleWrapper>
                </UserDetails>
                <Message>
                  <p>{message?.message}</p>
                </Message>
                {message.attachments && (
                  <FileIconsWraper>
                    {message.attachments.map((file, i) => (
                      <FileIcons file={file} key={i} />
                    ))}
                  </FileIconsWraper>
                )}
              </MessageContainer>
            )
          )}
      </ChatWrapper>
    </>
  );
};

export default ChatMessages;

const ChatWrapper = styled.div`
  padding: 1rem 2rem;
  max-height: calc(100vh - 377px);
  overflow-y: auto;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Message = styled.div`
  p {
    margin-top: 0.5rem;
    font-weight: 400;
    line-height: 1.5rem;
    width: 80%;
  }
`;

const UserImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const DateMessage = styled.div`
  opacity: 0.5;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 1.1rem;
  margin-left: 0.7rem;
`;

const TextMsg = styled.p`
  margin-top: 0.5rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 80%;
`;

const OnlyText = styled.div``;

const FileIconsWraper = styled.div`
  display: flex;
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
