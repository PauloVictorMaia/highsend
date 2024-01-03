import { styled } from "styled-components";
import { TextField } from "@mui/material";

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
  position: relative;
`;

export const ExportButton = styled.button`
  min-width: 150px;
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

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const FilterButton = styled.button`
  width: 35px; 
  height: 35px;
  border-radius: 50%;
  background-color: #4339F2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 2001;
`;

export const ExportMenuButton = styled.button`
  width: 35px; 
  height: 35px;
  border-radius: 50%;
  background-color: #4339F2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 2001;

  svg {
    font-size: 1.3rem;
  }
`;

export const FilterMenu = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  flex-direction: column;
  row-gap: 10px;
  width: 250px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  top: 10px;
  left: 40px;
  z-index: 2001;
`;

export const ExportMenu = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  flex-direction: column;
  row-gap: 10px;
  width: 250px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  top: 10px;
  left: 110px;
  z-index: 2001;
`;

export const FilterInput = styled(TextField)`
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

export const FilterLeadsButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0 15px;
  color: #fff;
  background-color: ${({ background }) => background};

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FilterButtonWrapper = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  width: 100vw;
  height: 110vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
`;

export const ExportButtonWrapper = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  width: 100vw;
  height: 110vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
`;