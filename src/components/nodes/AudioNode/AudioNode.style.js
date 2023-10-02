import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #333;
  display: Flex;
  align-items: center;
  border: 0.5px solid rgba(0,0,0,0.15);
  background-color: #fAFAFA;
  border-radius: 8px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
`;

export const AudioPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > audio {
    height: 100%;
  }

  > svg {
    color: #0042DA;
  }
`;

export const AudioNodeMenu = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 300px;
  height: 90px;
  position: absolute;
  left: -325px;
  top: -45px;
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

export const SendAudio = styled.div`
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
  border: 1px solid black;
  border-radius: 5px;
  color: #000;
`;

export const ChooseFileButton = styled.label`
  display: inline-block;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: blue;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`;


export const FileInput = styled.input`
  display: none;
`;