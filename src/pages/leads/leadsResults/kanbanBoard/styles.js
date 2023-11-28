import styled from "styled-components";
import { TextField } from "@mui/material";

export const Board = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 90vw;
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: scroll;
  gap: 20px;
`;

export const ButtonContainer = styled.div`
  width: 50px;
`;

export const AddColumnButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ background }) => background ? "#ff4d4d" : "#4339F2"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 13px;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const NewListInputContainer = styled.div`
  flex: 0 0 280px;
`;

export const NewListContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NewListInput = styled(TextField)`
  border: 1.5px solid red;
  border: none;
  width: 70%;

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

export const NewListButton = styled.button`
  width: 25%;
  height: 35px;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #4339F2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;