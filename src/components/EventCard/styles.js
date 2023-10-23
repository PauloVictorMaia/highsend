import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%; 
  border-bottom: 0.5px solid rgba(0,0,0,0.15);
  border-right: 0.5px solid rgba(0,0,0,0.15);
  border-left: 0.5px solid rgba(0,0,0,0.15);
  background-color: #fff;
  color: rgba(0,0,0,0.8);

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 120px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const ScheduleTimeContainer = styled.div`
  width: 350px;
`;

export const ScheduledTime = styled.div`
  width: 140px;
  display: flex;
  column-gap: 10px;
`;

export const EventColor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({color}) => color};
`;

export const EventTime = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

export const EventTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventDetails = styled.div`
  width: 400px;
  height: 100%;
  row-gap: 10px;
`;

export const ButtonContainer = styled.div`
  width: 120px;
  height: 100%;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;

  >svg {
    font-size: 2.5rem;
  }

  >span {
    font-size: 1.1rem;
  }
`;

export const DetailsContainer = styled.div`
  width: 100%;
  min-height: 80px;
  background-color: #fff;
  padding: 20px 60px 20px 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const PhoneContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const InviteeEmail = styled.div`
  width: 400px;
`;

export const DeleteButton = styled.div`
  display: flex;
  column-gap: 5px;
  cursor: pointer;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-left: 10px;
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

export const CancelEvent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  row-gap: 20px;
  
  >button {
    width: 120px;
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
    margin-left: 30%;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  >span {
    text-align: center;
  }
`;