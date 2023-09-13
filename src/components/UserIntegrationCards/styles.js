import styled from "styled-components";

export const Container = styled.div`
  width: 150px;
  height: 110px;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px; 
  color: rgba(0,0,0,0.75);
  /* background-color: blue; */

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0 0;
  /* background: pink; */
`;

export const IntegrationImg = styled.img`
  width: 100px;
  height: auto;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-size: 0.95rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Número de linhas a serem exibidas */
  -webkit-box-orient: vertical;
  white-space: normal;
  /* background-color: yellow; */
`;

export const IconContainer = styled.div`
  width: 100%;
  height: 20%;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
  /* background-color: green; */

  >svg {
    font-size: large;
    &:hover {
      cursor: pointer;
    }
  }
`;