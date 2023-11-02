import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 150px;
  color: #333;
  display: Flex;
  align-items: center;
  border: 0.5px solid rgba(0,0,0,0.15);
  background-color: #fff;
  border-radius: 8px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  position: relative;
`;

export const ImagePreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > svg {
    color: #0042DA;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 165px;
  height: auto;
`;

export const ImageNodeMenu = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 300px;
  height: 90px;
  position: absolute;
  left: -320px;
  top: 30px;
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
    border-bottom: 2px solid  ${({ activetab }) => activetab === "false" ? "#555" : "#E67200"};
  }

  ${({ activetab }) =>
    activetab === "true" &&
    `
    text-decoration: none;
    border-bottom: 2px solid #E67200;
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
  height: 40px;
  border-radius: 3px;
  color: #333;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid #9999FF;
  }
`;

export const ChooseFileButton = styled.label`
  display: flex;
  height: 40px;
  width: 130px;
  border-radius: 5px;
  background-color: #E67200;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  cursor: pointer;
`;


export const FileInput = styled.input`
  display: none;
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