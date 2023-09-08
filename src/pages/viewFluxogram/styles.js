import { styled } from "styled-components";

export const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  max-width: 800px;
  width: 100%;
  overflow-y: scroll;
  padding: 20px 0;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-bottom: 30px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
      width: 0;
      background: transparent;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

`

export const Content = styled.div`
  width: 85%;
  box-sizing: border-box;
  height: auto;
`;

export const AvatarContainer = styled.div`
 width: 10%;
 box-sizing: border-box;
 display: flex;
 justify-content: center;
 position: relative;
`;

export const Avatar = styled.div`
  position: absolute;
  top: ${({ height }) => `${height - 35}px`};
  min-width: 35px;
  height: 35px;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  transition: top 0.6s ease-in-out;
`
