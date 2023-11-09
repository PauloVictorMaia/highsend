import { TextField } from "@mui/material";
import { styled } from "styled-components";

export const Container = styled.div`
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;
  row-gap: 30px;
`;

export const NewFluxogramCard = styled.div`
  width: 225px;
  height: 270px;
  background-color: #14140F;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  cursor: pointer;
`;

export const FluxogramCard = styled.div`
  width: 225px;
  max-height: 270px;
  min-height: 270px;
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
`;

export const ActiveComponent = styled.div`
 background-color: #91D6AC;
 padding: 5px 8px;
 border-radius: 10px;
 font-size: 12px;
 color: #fff;
`;

export const IconContainer = styled.div`
 display: flex;
 width: 100%;
 justify-content: flex-end;
 >svg {
    cursor: pointer;
    color: #333;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  >svg {
    cursor: pointer;
    color: #333;
  }
`;

export const Content = styled.div`
  width: 100%;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
`;

export const ModalContent = styled.div`
  width: ${({ width }) => width? `${width}px` : '300px'};
  height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
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

export const EditFlowName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  row-gap: 10px;

  >input {
    height: 25px;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 5px;
    outline: none;

    &:focus {
      border: 1px solid rgba(0,0,0,0.35);
    }
  }

  .modal-edit-content {
    width: 100%;
    display: flex;
    column-gap: 10px;

    button {
      background-color: #4339F2;
      outline: none;
      border: none;
      width: 100px;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

export const DeleteFlow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  box-sizing: border-box;
  row-gap: 20px;
  
  >button {
    width: 150px;
    height: 35px;
    border-radius: 5px;
    background-color: #ff4d4d;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
`;

export const CreationOptions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const FlowNameInput = styled.div`
  margin-top: 25px;
`;

export const CreationOptionsTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  >h2 {
    margin: 0;
    color: #333;
  }
`;

export const FlowOption = styled.label`
  width: 100%;
  height: 60px;
  border: 2px solid #E0EAFF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 30px;

  >svg {
    color: #4339F2;
  }

  &:hover {
    border: 2px solid #4339F2;
    cursor: pointer;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const TemplatesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TemplateCard = styled.button`
  width: 140px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid #4339F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: none;

  >h2 {
    margin: 0;
    color: #333;
  }

  /* &:hover {
    cursor: pointer;
    border: 2px solid #4339F2;
  } */

  &:disabled {
    opacity: 0.5;
  }
`;