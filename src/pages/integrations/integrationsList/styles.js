import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  color: rgba(0,0,0,0.75);
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
`;

export const Integrations = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
  padding-left: 60px;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const UserIntegrations = styled.div`
  width: 80vw;
  min-height: 120px;
  padding-left: 60px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
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
  z-index: 5000;
`;

export const ModalContent = styled.div`
  width: ${({ width }) => width? `${width}px` : '300px'};
  min-height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  position: relative;

  >input {
    width: 55%;
    height: 40px;
    border-radius: 3px;
    color: #333;
    border: 0.5px solid rgba(0,0,0,0.15);
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;

    &:focus {
      outline: 2px solid #9999FF;
    }
  }

  >img {
    width: 55%;
    height: auto;
  }
`;

export const ModalButton = styled.button`
  display: flex;
  height: 30px;
  width: 55%;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #E67200;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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