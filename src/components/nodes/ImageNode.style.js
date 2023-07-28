import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.div`
  min-width: 210px;
  max-width: 210px;
  min-height: 75px;
  width: 100%;
  height: 100%;
  display: Flex;
  flex-direction: column;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: ${({selected}) => selected ? '2px solid #000' : '1px solid #000'};
  border-radius: 8px;
  color: #000;
  font-size: 12px;
  
  > input {
    margin-bottom: 10px;
  }
`;

export const TopHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  top: -9px;
`;

export const BottomHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  bottom: -9px;
`;

export const Label = styled.input`
  font-size: 16px;
  border: none;
  width: 80%;
`;

export const ImagePreview = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 30px;
  background-color: #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-bottom: 10px;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 170px;
  height: auto;
`;

export const ImageNodeMenu = styled.div`
  visibility: ${({isvisible}) => isvisible === "true" ? "visible" : "hidden"};
  width: 300px;
  height: 90px;
  position: absolute;
  left: -305px;
  top: -1px;
  border-radius: 5px;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
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

export const SendImages = styled.div`
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