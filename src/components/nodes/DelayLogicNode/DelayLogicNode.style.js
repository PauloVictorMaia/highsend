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

export const Delay = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  >svg {
    color: #9999FF;
  }
`;

export const InputContainer = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  position: absolute;
  width: 350px;
  height: 70px;
  left: -375px;
  top: -35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 15px 5px 5px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
`;