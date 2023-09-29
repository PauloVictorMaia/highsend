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

export const Modal = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  width: ${({ width }) => width? `${width}px` : '300px'};
  height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  position: relative;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const DeleteIntegration = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  row-gap: 20px;
  
  >button {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    background-color: red;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 35%;
  }
`;