import styled from "styled-components";

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
  background-color: #4339F2;
  display: flex;
  align-items: center;
  justify-content: center;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;