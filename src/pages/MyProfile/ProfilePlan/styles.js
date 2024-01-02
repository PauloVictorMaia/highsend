import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 100px;
  color: #1B192E;
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  row-gap: 30px;
  position: relative;
`;

export const PlanDetailsContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 150px;
  padding: 25px 15px;
  border-radius: 8px;
  border: 2px solid #4339F2;
  border-bottom: 4px solid #4339F2;
  background-color: #E0EAFF;
`;

export const PlanDetailsContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const PlanTypeContent = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlanTitle = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
`;

export const PlanDescription = styled.span`
  font-weight: 600;
  margin-top: 20px;
`;

export const PlanPriceContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  column-gap: 5px;
`;

export const Currency = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  position: relative;
  top: -15px;
`;

export const Price = styled.span`
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const PerMonth = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #526B92;
`;

export const PlanItemsContent = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  column-gap: 50px;
`;

export const FirstBlock = styled.div`
  width: 30%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);

  svg {
    color: #4339F2;
  }
`;

export const SecondBlock = styled.div`
  width: 55%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);

  svg {
    color: #4339F2;
  }
`;

export const PlanItemDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlanItemText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #4339F2;
`;

export const PaymentMethodContainer = styled.div`
  width: 600px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PaymentTitle = styled.span`
  font-weight: 600;
`;

export const CurrentPaymentMethod = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px 40px 20px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid #4339F2;
  border-bottom: 4px solid #4339F2;
  background-color: #E0EAFF;
`;

export const CardDetailsContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CardNumber = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Last4 = styled.span`
  font-size: 24px;
  font-weight: 400;
`;

export const CardName = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
`;

export const UserNameDiv = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 20px;
`;

export const ValidityDiv = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: flex-end; 
  justify-content: flex-end;
`;

export const ChangePaymentMethodButton = styled.button`
  border: 1px solid #4339F2;
  outline: none;
  background-color: #fff;
  border-radius: 200px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center; 
  align-items: center;
  color: #4339F2;
  font-weight: 600;
  cursor: pointer;
`;

export const ChangePlanButton = styled.button`
  outline: none;
  border: none;
  border-radius: 200px;
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: #4339F2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  top: -55px;
  right: 14vh;
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
  height:${({ height }) => height? `${height}px` : '150px'};
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const PlansContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PlansTitle = styled.span`
  font-size: 25px;
  font-weight: 500;
  color: #4339F2;
  margin-bottom: 10px;
`;

export const Plans = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 10px;
`;

export const Notification = styled.span`
  font-size: 0.7rem;
  margin-top: 20px;
`;