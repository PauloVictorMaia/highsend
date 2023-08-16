import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #000;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 0.5px solid rgba(0,0,0,0.15);
  background-color: #fff;
  >svg {
    color: #000;
    cursor: pointer;
  }
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
  padding: 70px 20px 0 20px;
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