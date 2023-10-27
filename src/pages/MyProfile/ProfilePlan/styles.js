import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  color: #333;
`;

export const ProfilePlanContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const ContentContainer = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 max-width: 100%;
 row-gap: 20px;
`;

export const AccountTypeContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
  }
`;

export const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
  }
`;

export const PlansContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

export const PlanCard = styled.div`
  width: 260px;
  background-color: white;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  opacity: ${({disabled}) => disabled ? "0.5" : "1"};
`;

export const Button = styled.button`
  min-width: 200px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 12%;
  background: #F26800;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
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
  z-index: 5000;
`;

export const ModalContent = styled.div`
  width: ${({ width }) => width? `${width}px` : '300px'};
  height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  p {
    text-align: center;
    font-size: 1.1rem;
  }

  span {
    text-align: justify;
    font-size: 13px;
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

export const ModalButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  margin-top: 50px;
`;

export const ModalButton = styled.button`
  width: 150px;
  display: flex;
  justify-content: center;
  background-color: ${({ background }) => background};
  color: #ffffff;
  border-radius: 4px;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CurrentCard = styled.div`
  width: 60%;
  height: 60px;
  border: 2px solid #9999FF;
  box-shadow: 0 5px 12px 0 rgba(0,0,0,0.15);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

export const FakeNumbers = styled.div`
  display: flex;
  width: 15%;
  height: 30px;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.15);

  >svg {
    color: #555;
    font-size: 0.5rem;
  }
`;