import { styled } from "styled-components";
import { Img } from 'react-image';
import { TextField } from '@mui/material';

export const Container = styled.div`
  width: 60px;
  border-radius: 8px;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: 0 5px 7px 0 (rgba(0,0,0,0.15));
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 5px 3px;
  box-sizing: border-box;
  padding: 5px;
  position: relative;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;

  &:disabled {
    opacity: 0.5;
  }

  >svg {
    color: ${({color}) => color ? "#E67200" : "#333"};
    width: 70%;
    height: auto;
    font-size: small;
  }
`;

export const Label = styled.span`
  font-size: 10px;
  color: #333;
  color: ${({color}) => color ? "#E67200" : "#333"};
`;

export const DropDownMenu = styled.div`
  position: absolute;
  top: -10px;
  left: ${({ isvisible }) => isvisible ? "-250px" : "200px"};
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  background-color: #fff;
  transition: 0.5s ease-out;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  text-align: center;
  width: 220px;
  max-height: 475px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileImageContainer = styled.div`
  max-width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: 0.5px dashed #9999FF;
  border-radius: 5px;
  cursor: pointer;
`;

export const ProfileImage = styled(Img)`
  width: 100%;
  height: 70px;
  border-radius: 8px;
`;

export const TemplateContainer = styled.div`
  max-width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  font-size: 0.8rem;
  border: 0.5px dashed #9999FF;
  border-radius: 5px;

  >select {
    height: 30px;
    width: 100%;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 3px;
    outline: none;
    font-family: 'Oswald', sans-serif;
    font-size: 16px;
    color: #333;

    &:focus {
      outline: 2px solid #9999FF;
    }
  }
`;

export const Modal = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 5000;
`;

export const ModalContent = styled.div`
  width: ${({ width }) => width? `${width}px` : '300px'};
  min-height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const ProfileNameInput = styled.input`
  height: 30px;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 3px;
  outline: none;
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  color: #333;

  &:focus {
    outline: 2px solid #9999FF;
  }
`;

export const SwitchContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  >span {
    color: #333;
    font-size: 0.9rem;
  }
`;

export const IntegrationsEmptyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  span {
    font-size: 0.7rem;
  }
`;

export const AddTagsButton = styled.button`
  display: flex;
  min-height: 40px;
  width: 100%;
  border-radius: 5px;
  background-color: #4339F2;
  color: #fff;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const TagsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const TagsExibitionContainer = styled.div`
  width: 100%;
  min-height: 60px;
  border: 2px solid #4339F2;
  border-radius: 10px;
  background-color: #E0EAFF;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;


  span {
    color: #1B192E;
  }
`;

export const Tag = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #4339F2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
`;

export const InputTagsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
`;

export const InputItem = styled(TextField)`
 border: 1.5px solid red;
 border: none;
 width: 100%;

 div {
  border-radius: 8px;
 }

 label {
  color: #526B92;
 }

 fieldset {
  border: 2px solid #E0EAFF;
 }

 input:focus {
  fieldset {
    border: 2px solid #4339F2;
  }

  label {
    color: #4339F2;
  }
 }
`;

export const DeleteTagButton = styled.button`
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