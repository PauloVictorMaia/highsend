import { TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F8F8;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;

  @media(min-width: 768px){
    height: auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

export const Content = styled.div`
 background-color: transparent;
 width: 100%;
 max-width: 500px;
 display: flex;
 flex-direction: column;

 .info-content {
    color: #526B92;
    font-weight: 600;
    font-size: 16px;
    width: 100%;
  }

  .icon-container {
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 10px;
    margin-bottom: 30px;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 20px;
    font-weight: 400;
  }
`;

export const EditInputsContent = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  box-sizing: border-box;
  align-items: center;
  margin-top: 30px;

  >input { 
    width: 350px;
    height: 30px;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 4px;
    padding-left: 10px;
    
    &:focus {
      outline: 1.5px solid #4339F2;
    }
  }

  >button {
    background: ${({ outlined }) => outlined ? 'transparent' : '#4339F2'};
    font-family: Arial, sans-serif;
    color: ${({ outlined }) => outlined ? '#4339F2' : '#fff'};
    border-radius: 4px;
    border: ${({ outlined }) => outlined ? '1px solid #4339F2' : 'none'};
    padding: 12px 16px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    width: 100%;
    border-radius: 40px;
    height: 60px;
    margin-top: 30px;
  }
`;

export const CheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-top: 5px;

  > input:checked {
    background-color: red;
  }
`;