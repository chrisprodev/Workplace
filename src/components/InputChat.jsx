import React, { useState, useEffect } from "react";
import { selectUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
// import db from "../firebase";
// import firebase from "firebase";
// import UploadFile from "./UploadFile";

const InputChat = () => {
  const user = useSelector(selectUser);
  // const idChannel = useSelector(selectChannelId);
  // const unSave = useSelector(selectUnSave);
  // const reset = useSelector(selectReset);
  // const uploadedFiles = useSelector(selectFiles);
  // const IdDirectMessage = useSelector(selectDirectMessageId);

  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);
  const [focus, setFocus] = useState(false);

  // const handleDeleteFile = (file) => {
  //   let tempFiles2 = files;
  //   const index = tempFiles2.indexOf(file);
  //   tempFiles2.splice(index, 1);
  //   setFiles(tempFiles2);

  //   if (uploadedFiles.length > 0) {
  //     let newUploadedFiles = uploadedFiles;
  //     newUploadedFiles = uploadedFiles.filter((item) => {
  //       return item.name !== file.name;
  //     });
  //     dispatch(setUploadedFiles(newUploadedFiles));
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (idChannel) {
  //     if (uploadedFiles.length > 0) {
  //       if (input === "") {
  //         db.collection("channels")
  //           .doc(idChannel)
  //           .update({
  //             files: firebase.firestore.FieldValue.arrayUnion(...uploadedFiles),
  //           })
  //           .then(() => {
  //             db.collection("channels")
  //               .doc(idChannel)
  //               .collection("messages")
  //               .add({
  //                 profile_pic: user.profile_pic,
  //                 userName: user.name,
  //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //                 attachments: uploadedFiles,
  //               })
  //               .then(() => {
  //                 setInput("");
  //                 setFiles([]);
  //                 dispatch(setUploadedFiles([]));
  //                 dispatch(setUnSave(false));
  //                 setUpdate(!update);
  //               });
  //           });
  //       } else {
  //         db.collection("channels")
  //           .doc(idChannel)
  //           .update({
  //             files: firebase.firestore.FieldValue.arrayUnion(...uploadedFiles),
  //           })
  //           .then(() => {
  //             db.collection("channels")
  //               .doc(idChannel)
  //               .collection("messages")
  //               .add({
  //                 message: input,
  //                 profile_pic: user.profile_pic,
  //                 userName: user.name,
  //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //                 attachments: uploadedFiles,
  //               })
  //               .then(() => {
  //                 setInput("");
  //                 setFiles([]);
  //                 dispatch(setUploadedFiles([]));
  //                 dispatch(setUnSave(false));
  //                 setUpdate(!update);
  //               });
  //           });
  //       }
  //     } else {
  //       if (input !== "") {
  //         db.collection("channels")
  //           .doc(idChannel)
  //           .update({
  //             files: firebase.firestore.FieldValue.arrayUnion(...uploadedFiles),
  //           })
  //           .then(() => {
  //             db.collection("channels")
  //               .doc(idChannel)
  //               .collection("messages")
  //               .add({
  //                 message: input,
  //                 profile_pic: user.profile_pic,
  //                 userName: user.name,
  //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //               })
  //               .then(() => {
  //                 setInput("");
  //                 setFiles([]);
  //                 dispatch(setUploadedFiles([]));
  //                 dispatch(setUnSave(false));
  //                 setUpdate(!update);
  //               });
  //           });
  //       }
  //     }
  //   } else {
  //     if (IdDirectMessage) {
  //       if (uploadedFiles.length > 0) {
  //         db.collection("directMessages")
  //           .doc(IdDirectMessage)
  //           .update({
  //             files: firebase.firestore.FieldValue.arrayUnion(...uploadedFiles),
  //           })
  //           .then(() => {
  //             db.collection("directMessages")
  //               .doc(IdDirectMessage)
  //               .collection("messages")
  //               .add({
  //                 message: input,
  //                 profile_pic: user.profile_pic,
  //                 userName: user.name,
  //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //                 attachments: uploadedFiles,
  //               })
  //               .then(() => {
  //                 setInput("");
  //                 setFiles([]);
  //                 dispatch(setUploadedFiles([]));
  //                 dispatch(setUnSave(false));
  //                 setUpdate(!update);
  //               });
  //           });
  //       } else {
  //         db.collection("directMessages")
  //           .doc(IdDirectMessage)
  //           .update({
  //             files: firebase.firestore.FieldValue.arrayUnion(...uploadedFiles),
  //           })
  //           .then(() => {
  //             db.collection("directMessages")
  //               .doc(IdDirectMessage)
  //               .collection("messages")
  //               .add({
  //                 message: input,
  //                 profile_pic: user.profile_pic,
  //                 userName: user.name,
  //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //               })
  //               .then(() => {
  //                 setInput("");
  //                 setFiles([]);
  //                 dispatch(setUploadedFiles([]));
  //                 dispatch(setUnSave(false));
  //                 setUpdate(!update);
  //               });
  //           });
  //       }
  //     }
  //   }
  // };

  // const handleFileChange = (e) => {
  //   if (e.target.files[0]) {
  //     setFiles((preFiles) => [...preFiles, e.target.files[0]]);
  //   }
  // };

  // const handleRegistFiles = (newItem) => {
  //   dispatch(setUploadedFiles([...uploadedFiles, newItem]));
  //   dispatch(setUnSave(true));
  // };

  // useEffect(() => {
  //   if (uploadedFiles && unSave && uploadedFiles.length === 0) {
  //     dispatch(setUnSave(false));
  //   }
  //   if (reset) {
  //     setFiles([]);
  //     dispatch(setReset(false));
  //   }
  // }, [reset, uploadedFiles, unSave, dispatch]);

  return (
    <InputWrapper>
      <FormWrapper
        //onSubmit={handleSubmit}
        focus={focus}
      >
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your reply here..."
        />
        <InputActions>
          <div style={{ marginTop: "0.2rem" }}>
            <label htmlFor="file-input">
              <AttachIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </AttachIcon>
            </label>
            <InputFile
              type="file"
              id="file-input"
              //onChange={handleFileChange}
            />
          </div>
          <SendButton
            //onClick={handleSubmit}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </SendButton>
        </InputActions>
        {/* <UploadindFile>
          {files &&
            files.map((file) => (
              <UploadFile
                key={file.name}
                file={file}
                onDelete={() => {
                  handleDeleteFile(file);
                  setUpdate(!update);
                }}
                onUploadSuccess={handleRegistFiles}
              />
            ))}
        </UploadindFile> */}
      </FormWrapper>
    </InputWrapper>
  );
};

export default InputChat;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-top: solid 0.1rem #edf0f4;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: solid 0.2rem #edf0f4;
  border-radius: 0.5rem;
  padding: 1rem;
  border-color: ${(props) => props.focus && "var(--main-blue)"};

  transition: all 400ms cubic-bezier(0.075, 0.85, 0.15, 1);

  input[type="text"] {
    border: none;
    font-weight: 600;
    font-size: 0.9rem;

    :focus {
      outline: none;
    }
    ::placeholder {
      color: #838d94;
    }
  }
`;

const InputActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
`;

const AttachIcon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
  color: #98a8b3;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 150ms ease-out;
  :hover {
    color: var(--main-blue);
  }
`;

const InputFile = styled.input`
  display: none;
`;

const UploadindFile = styled.div`
  display: flex;
  align-items: center;
`;

const SendButton = styled.svg`
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
  color: #98a8b3;
  transform: rotate(90deg);

  transition: all 150ms ease-out;
  :hover {
    color: var(--main-blue);
  }
`;
