import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 40px;
  display: Flex;
  align-items: center;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #333;
  position: relative;
`;

export const NodePreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > svg {
    color: #9999FF;
  }
`;

export const InputContainer = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 330px;
  min-height: 200px;
  position: absolute;
  left: -355px;
  top: -55px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);

  >span {
    text-align: left;
  }
`;

export const Navigation = styled.nav`
  width: 100%;
`;

export const ListTabs = styled.ul`
  display: flex;
  align-items: center;
  column-gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Tabs = styled.li`
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    border-bottom: 2px solid  ${({ activetab }) => activetab === "false" ? "#555" : "#E67200"};
  }

  ${({ activetab }) =>
    activetab === "true" &&
    `
    text-decoration: none;
    border-bottom: 2px solid #E67200;
  `}
`;

export const Inputs = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 5px 10px;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 150px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  display: block;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f0f0f0; 

  &:focus {
    outline: 2px solid #9999FF;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
`;

export const CloseButton = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const CustomToolbar = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  width: 30px;
  height: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 3px;
  position: absolute;
  top: -35px;
  right: 30px;
`;