import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import GroupChat from "../../components/GroupChat";
// import DMChat from "./DMChat";
// import { storage } from "../firebase";
import User from "../../components/User";
// import {
//   selectChannelId,
//   selectUnSave,
//   selectFiles,
//   selectDirectMessageId,
//   setUnSave,
//   setUploadedFiles,
//   setReset,
// } from "../features/app/appSlice";
import {
  Container,
  Section,
  ChatWrap,
  DMWraper,
  Logo,
  TitleBar,
} from "./SideBar.Style";
import { selectChannel } from "../../features/chat/chatSlice";

const SideBar = () => {
  const user = useSelector(selectUser);
  const idChannel = useSelector(selectChannel);
  // const IdDirectMessage = useSelector(selectDirectMessageId);

  // const unSave = useSelector(selectUnSave);
  // const uploadedFiles = useSelector(selectFiles);

  // const dispatch = useDispatch();

  // let history = useHistory();

  // const deleteAllFiles = async () => {
  //   await Promise.all(
  //     uploadedFiles.map(async (file) => {
  //       // Create a storage reference from our storage service
  //       const storageRef = storage.ref();
  //       // Create a reference to the file to delete
  //       const desertRef = storageRef.child(file.dir + file.name);
  //       // Delete the file
  //       await desertRef.delete().catch((error) => {
  //         // Uh-oh, an error occurred!
  //         console.log(error);
  //       });

  //       return file;
  //     })
  //   ).then(() => {
  //     dispatch(setUploadedFiles([]));
  //     dispatch(setUnSave(false));
  //     dispatch(setReset(true));
  //   });
  // };

  // useEffect(() => {
  //   if (!user) {
  //     history.push("/");
  //   }

  //   if (unSave && uploadedFiles.length > 0) {
  //     deleteAllFiles();
  //   }
  // }, [idChannel, IdDirectMessage]);

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
          {/* {user && user.channels && user.directMessages && (
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
                  unreadMessages={message.unreadMessages}
                />
              ))}
            </>
          )} */}
        </DMWraper>
      </div>
      <TitleBar>
        <User />
      </TitleBar>
    </Container>
  );
};

export default SideBar;
