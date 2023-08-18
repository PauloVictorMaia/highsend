import { styled } from "styled-components";

export const Container = styled.div`
  width: 50px;
  height: 150px;
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
`;

export const SaveButton = styled.button`
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: pointer;
`;