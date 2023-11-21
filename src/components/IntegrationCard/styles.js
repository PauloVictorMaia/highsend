import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  height: 320px;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px; 
  color: rgba(0,0,0,0.75);
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;

  span {
    font-size: 21px;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  padding: ${({padding}) => padding};
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  /* background: pink; */
`;

export const IntegrationImg = styled.img`
  width: 70px;
  height: auto;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  color: #666666;
  line-height: 1.3;
  margin-bottom: 40px;
  /* background-color: yellow; */
`;

export const IconContainer = styled.div`
  width: 100%;
  height: 20%;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  /* background-color: green; */

  >svg {
    font-size: 30px;
  }
`;