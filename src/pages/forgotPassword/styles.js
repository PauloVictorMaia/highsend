import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: #000;
`;

export const EditInputsContent = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

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
    width: 120px;
    height: 35px;
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

export const CheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  margin-top: 5px;

  > input:checked {
    background-color: red;
  }
`;