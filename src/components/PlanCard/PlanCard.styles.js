import styled from "styled-components";

export const Container = styled.div`
  width: 340px;
  height: 400px;
  border: 2px solid #4339F2;
  border-bottom: 4px solid #4339F2;
  border-radius: 8px;
  padding: 10px 20px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #222F43;
  text-align: center;
`;

export const Type = styled.span`
  font-size: 36px;
  font-weight: 500;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  min-height: 64px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
`;

export const Description = styled.span`
  font-size: 17px;
  font-weight: 400;
  line-height: normal;
`;

export const PlanPriceContent = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const PerMonth = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #526B92;
`;

export const ActionButton = styled.button`
  outline: none;
  border: none;
  border-radius: 200px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: #4339F2;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ResourcesContent = styled.div`
  width: 100%;
  display: flex; 
  justify-content: space-between;
  color: #4339F2;
  font-size: 0.8rem;
`;