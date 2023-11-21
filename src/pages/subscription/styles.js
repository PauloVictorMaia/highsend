import styled from "styled-components";
import { TextField } from "@mui/material";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F8F8F8;
  padding: 20px;
  box-sizing: border-box;

  @media(min-width: 768px){
    height: auto;
    min-heigth: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icons {
    margin-bottom: 30px;
  }

  .icon-container {
    display: flex;
    column-gap: 10px;
  }
`;

export const Content = styled.div`
 background-color: transparent;
 width: 100%;
 max-width: 700px;
 display: flex;
 flex-direction: column;
`;

export const InputItem = styled(TextField)`
 border: 1.5px solid red;
 color: red;
 border: none;

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

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  height: 550px;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: #fff;

  .show-password {
    color: #1B192E;
    font-size: 17px;
  }

  .pass-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    width: 100%;
  }

  .info-content {
    color: #526B92;
    font-weight: 600;
    font-size: 16px;
    margin: 5px 0;
  }

  /* > input {
    height: 60px;
    border: 1.5px solid #E0EAFF;
    border-radius: 4px;
    padding: 0 5px;
    outline: none;
    width: 100%;

    &:focus {
      outline: 1px solid #4339F2;
    }
  } */

  > button {
    background: #4339F2;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 320px;
    border-radius: 40px;
    height: 60px;
    margin: 20px auto;
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