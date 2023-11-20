import { styled } from "styled-components";

export const Container = styled.div`
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${({ openmenu }) => openmenu ? "repeat(4, 1fr)" : "repeat(5, 1fr)"};
  column-gap: 30px;
  row-gap: 30px;
`;