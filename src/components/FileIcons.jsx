import React from "react";
import styled from "styled-components";
import { getTypeFile, formatBytes } from "../utils/convertions";

const FileIcons = ({ file }) => {
  return (
    <FileWrapper>
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
            ? file.name.length > 16
              ? `${file.name.substring(0, 16)}...${file.name.split(".").pop()}`
              : file.name
            : null}
        </a>
        <span>{file.size && formatBytes(file.size)}</span>
      </FileData>
    </FileWrapper>
  );
};

export default FileIcons;

const FileWrapper = styled.div`
  margin-top: 1rem;
  padding-right: 4rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const FileData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
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
