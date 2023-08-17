import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: Flex;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #000;
  
`;

export const AddLink = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const LinkInput = styled.input`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  position: absolute;
  width: 350px;
  left: -385px;
  top: 10px;
`;