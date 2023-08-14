import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 0.5px solid rgba(0,0,0,0.15);
  position: fixed;
  top: 0;
  >svg {
    color: #000;
    cursor: pointer;
  }
`;