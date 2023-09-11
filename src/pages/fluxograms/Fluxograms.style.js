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

export const NewFluxogramCard = styled.div`
  width: 225px;
  height: 270px;
  background-color: #14140F;
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
  max-height: 270px;
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 5px;
  box-sizing: border-box;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
  >svg {
    cursor: pointer;
    color: #333;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 90%;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  width: 300px;
  height: 150px;
  background-color: #fff;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: red;
  padding: 2px;
  position: relative;
  top: -10px;
  right: -285px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const EditFlowName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  row-gap: 10px;

  >input {
    height: 25px;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 5px;
    outline: none;

    &:focus {
      border: 1px solid rgba(0,0,0,0.35);
    }
  }
  
  >button {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    background-color: blue;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const DeleteFlow = styled.div`
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