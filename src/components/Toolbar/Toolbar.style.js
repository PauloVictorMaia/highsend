import { styled } from "styled-components";

export const ToolbarContainer = styled.div`
  visibility: ${({isvisible}) => isvisible === "true" ? "visible" : "hidden"};
  width: 60px;
  height: 20px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
  border-radius: 5px;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -25px;
  right: 0px;
  background-color: #fff;

  > svg {
    cursor: pointer;
  }
`;