import { styled } from "styled-components";

export const Container = styled.div`
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

export const LeadStatusContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 15px;
  align-items: center;
  position: relative;

  > svg {
    cursor: pointer;
  }
`;

export const LeadStatus = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${props => {
    switch (props.leadcolor) {
      case "Em aberto":
        return "#ddd";
      case "Comprou":
        return "#66ff66";
      case "Não comprou":
        return "#ff4d4d";
      case "Não compareceu":
        return " #ffff66";
      default:
        return "#ddd"; 
    }
  }};
`;

export const DropMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 160px;
  height: 150px;
  background-color: #fff;
  border-radius: 8px;
  left: 0px;
  top: 40px;
  padding: 10px;
  z-index: 1000;
  border: 1px solid rgba(26, 26, 26, 0.61);
  row-gap: 5px;
`;

export const MenuCardButtons = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;

  >svg {
    color: #333;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const StatusColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({color}) => color};
`;