import { styled } from "styled-components";
import { TextField } from '@mui/material';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  color: rgba(0,0,0,0.75);
  padding: 20px 20px 80px 20px;
  box-sizing: border-box;
`;

export const Integrations = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const UserIntegrations = styled.div`
  min-height: 120px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
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
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  position: relative;

  >input {
    width: 55%;
    height: 40px;
    border-radius: 3px;
    color: #333;
    border: 0.5px solid rgba(0,0,0,0.15);
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;

    &:focus {
      outline: 2px solid #9999FF;
    }
  }

  >img {
    width: 55%;
    height: auto;
  }
`;

export const ModalButton = styled.button`
  display: flex;
  height: 45px;
  margin: 10px 0;
  width: 55%;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #4339F2;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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

export const FormContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  box-sizing: border-box;
  align-items: center;

  .forgot-pass {
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    width: 200px;
    color: #4339F2;
    font-weight:600;
  }

  .privacy-text {
    color: #526B92;
    font-size: 17px;
    padding: 5px;
    box-sizing: border-box;
    margin-top: 25px;
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

export const Button = styled.button`
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
`;