import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: Flex;
  align-items: center;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #333;
  
`;

export const AddLink = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > svg {
    color: #0042DA;
  }
`;

export const LinkInputContainer = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  position: absolute;
  width: 350px;
  height: 90px;
  left: -375px;
  top: -35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 15px 10px 15px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
`;

export const LinkInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  color: #333;
  padding-left: 10px;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid #9999FF;
  }
`;