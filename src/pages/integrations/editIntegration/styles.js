import { TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: #000;
`;

export const InputItem = styled(TextField)`
 border: 1.5px solid red;
 border: none;
 width: 400px;

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

export const EditInputsContent = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  padding-top: 40px;
  box-sizing: border-box;

  >input { 
    width: 350px;
    height: 30px;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 4px;
    
    &:focus {
      outline: 1.5px solid #4339F2;
    }
  }

  >button {
    width: 150px;
    height: 55px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #4339F2;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;