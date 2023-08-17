import { styled } from "styled-components";

export const Container = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
`;

export const CheckboxContainer = styled.div`
  width: 120px;
  height: 35px;
  padding-left: 5px;
  margin: 0px 4px;
  border-radius: 5px;
  
  background-color: ${props => props.checked ? '#97C160' : '#E5E5E5'};
  
  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const StyledCheckbox = styled.label`
  width: 23px;
  height: 23px;
  margin-right: 6px;
  border-radius: 50%;
  background: #F6F6F6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Text = styled.label`
  color: ${props => props.checked ? '#FFF' : '#555'};
  cursor: pointer;
`;

export const DaysContainer = styled.div`
 display: flex;
 margin: 10px 0;
 align-items: center;
`;

