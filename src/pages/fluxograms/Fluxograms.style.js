import { styled } from "styled-components";

export const Container = styled.div`
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 30px;
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const NewFluxogramCard = styled.div`
  width: 225px;
  height: 270px;
  background-color: blue;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  cursor: pointer;
`;

export const FluxogramCard = styled.div`
  width: 225px;
  height: 270px;
  background-color: #d9d9d9;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
`;