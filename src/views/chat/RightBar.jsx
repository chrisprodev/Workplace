import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTypeFile, formatBytes } from "../../utils/convertions";
import { selectChannel, selectDM } from "../../features/chat/chatSlice";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
import Member from "../../components/Member";

const RightBar = () => {
  const [members, setMembers] = useState(null);
  const [sharedFiles, setSharedFiles] = useState(null);
  const idChannel = useSelector(selectChannel);
  const idDM = useSelector(selectDM);

  useEffect(() => {
    if (idChannel) {
      const docRef = doc(db, "channels", idChannel);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setMembers(docSnap.data().members && [...docSnap.data().members]);
          setSharedFiles(docSnap.data().files && [...docSnap.data().files]);
        } else {
          console.log("No such document!");
        }
      });
    } else {
      if (idDM) {
        const docRef = doc(db, "directMessages", idDM);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setMembers(docSnap.data().members && [...docSnap.data().members]);
            setSharedFiles(docSnap.data().files && [...docSnap.data().files]);
          } else {
            console.log("No such document!");
          }
        });
      }
    }
  }, [idChannel, idDM]);

  return (
    <Container>
      <TitleBar>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        <h3>Group info</h3>
      </TitleBar>
      <ChannelsWraper>
        <Section>
          <h4>Members</h4>
        </Section>
        {members &&
          members
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((member) => (
              <Member
                key={member.idUser}
                id={member.idUser}
                profile_pic={member.profile_pic}
                name={member.name}
                role={member.role}
              />
            ))}
        {/* {sharedFiles && (
          <React.Fragment>
            <Section style={{ paddingTop: "1.6rem" }}>
              <h4>Shared files</h4>
            </Section>
            {sharedFiles.map((file) => (
              <FileWrapper key={file.dir}>
                {getTypeFile(file.name) === "file" ? (
                  <IconWrapper type={getTypeFile(file.name)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                ) : getTypeFile(file.name) === "doc" ? (
                  <IconWrapper type={getTypeFile(file.name)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                ) : (
                  <IconWrapper type={getTypeFile(file.name)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </IconWrapper>
                )}
                <FileData>
                  <a href={file.url} download target="_blank" rel="noreferrer">
                    {file.name
                      ? file.name.length > 20
                        ? `${file.name.substring(0, 20)}...${file.name
                            .split(".")
                            .pop()}`
                        : file.name
                      : null}
                  </a>
                  <span>{file.size && formatBytes(file.size)}</span>
                </FileData>
              </FileWrapper>
            ))}
          </React.Fragment>
        )} */}
      </ChannelsWraper>
    </Container>
  );
};

export default RightBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-left: solid 0.1rem #edf0f4;
`;

const Section = styled.div`
  margin: 1.6rem 0;

  h4 {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const ChannelsWraper = styled.div`
  padding: 0 2rem;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 0.1rem #edf0f4;
  height: 4.5rem;
  padding-left: 2rem;

  h3 {
    margin-left: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  padding: 0 0.5rem;
`;

const FileData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  font-weight: 600;

  a {
    cursor: pointer;
    font-weight: 700;
    :hover {
      color: var(--main-blue);
    }
  }
  span {
    font-size: 0.8rem;
  }
`;

const IconWrapper = styled.div`
  padding: 0.5rem;
  background: ${(props) =>
    props.type === "file"
      ? "#f3f3f5"
      : props.type === "doc"
      ? "#ecf6f0"
      : "#e7e3fc"};
  color: ${(props) =>
    props.type === "file"
      ? "var(--main-black)"
      : props.type === "doc"
      ? "#6dc592"
      : "#6648e8"};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
