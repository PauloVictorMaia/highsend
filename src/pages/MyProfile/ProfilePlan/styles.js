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
  padding: 15px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid #4339F2;
  border-bottom: 4px solid #4339F2;
  background-color: #E0EAFF;
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