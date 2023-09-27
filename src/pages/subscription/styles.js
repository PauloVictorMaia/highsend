import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 600px;
  height: 550px;
  padding: 20px 40px 40px 20px;
  box-sizing: border-box;
  border: 0.5px solid #F26800;
  border-radius: 5px;

  > input {
    height: 50px;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 4px;
    padding: 0 5px;
    outline: none;

    &:focus {
      outline: 1px solid #F26800;
    }
  }

  > button {
    background: #F26800;
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
    width: 250px;
    margin: 20px auto;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  >button {
    background: #F26800;
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
    width: 100px;

    &:hover {
      filter: contrast(115%);
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
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