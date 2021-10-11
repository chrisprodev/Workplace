import React, { useState } from "react";
import { selectUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addMessage } from "../features/chat/chatSlice";

const InputChat = ({ channelID, dmID }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelID) {
      if (input !== "") {
        console.log("files without text");
        dispatch(
          addMessage({
            text: input,
            channelID: channelID,
            user: user,
          })
        );
        setInput("");
      }
    } else {
      //* "DirectMessages"
      if (input !== "") {
        dispatch(
          addMessage({
            text: input,
            dmID: dmID,
            user: user,
          })
        );
        setInput("");
      }
    }
  };

  return (
    <InputWrapper>
      <FormWrapper onSubmit={handleSubmit} focus={focus}>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your reply here..."
        />
        <InputActions>
          <SendButton
            onClick={handleSubmit}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </SendButton>
        </InputActions>
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
