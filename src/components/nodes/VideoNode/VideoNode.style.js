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

export const VideoPreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > svg {
    color: #0042DA;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 165px;
  height: auto;
`;

export const InputContainer = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 330px;
  height: 90px;
  position: absolute;
  left: -355px;
  top: 25px;
  border-radius: 5px;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
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
    border-bottom: 2px solid  ${({ activetab }) => activetab === "true" ? "#000" : "transparent"};
  }

  ${({ activetab }) =>
    activetab === "true" &&
    `
    text-decoration: none;
    border-bottom: 2px solid #000;
  `}
`;

export const Inputs = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const LinkInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
`;