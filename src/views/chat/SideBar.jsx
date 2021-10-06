import React, { useEffect } from "react";
import { selectUser } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
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
