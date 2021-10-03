import styled from "styled-components";

export const Container = styled.div`
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
`;

export const Logo = styled.img`
  margin-left: 2rem;
  height: 1.8rem;
  margin-top: 0.5rem;
`;

export const ChatWrap = styled.div`
  padding: 0 2rem;
`;

export const Section = styled.div`
  margin-top: 0.8rem;
  padding: 1.9rem 0;

  h4 {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const DMWraper = styled.div`
  padding: 0 2rem;
`;

export const TitleBar = styled.div`
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
`;
