import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  height: 350px;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px; 
  color: rgba(0,0,0,0.75);
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 35%;
  padding: ${({padding}) => padding};
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  /* background: pink; */
`;

export const IntegrationImg = styled.img`
  width: 100%;
  height: auto;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  height: 45%;
  padding: 5px;
  box-sizing: border-box;
  font-size: 0.95rem;
  line-height: 1.3;
  /* background-color: yellow; */
`;

export const IconContainer = styled.div`
  width: 100%;
  height: 20%;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */

  >svg {
    
  }
`;