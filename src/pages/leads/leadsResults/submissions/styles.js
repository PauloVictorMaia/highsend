import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Options = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  column-gap: 30px;
`;

export const ExportButton = styled.button`
  min-width: 70px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 0 15px;
  color: #fff;
  background-color: #4339F2;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Container = styled.div`  
  width: 100%;
  max-width: 90vw;
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: scroll;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  cursor: grab;
  margin-bottom: 160px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    min-width: 220px;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;