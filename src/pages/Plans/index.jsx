import styled from "styled-components";
import { plans } from "../../data/plans";
import { NavLink } from "react-router-dom";

const PlanSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 50px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlanCard = styled.div`
  width: 30%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  > a {
    background: #F26800;
    text-decoration: none;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 150px;
  }
`;

function Plans() {
  return (
    <PlanSection>
      {
        plans.map((plan) => (
          <PlanCard key={plan.id}>
            <h3>{plan.type}</h3>
            <p>{plan.description}</p>
            <ul>
              {
                plan.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))
              }
            </ul>
            <h4>{`R$${plan.price}/mês`}</h4>
            <ButtonContainer>
              <NavLink to={`/subscription/${plan.type}/${plan.id}`}>Vamos lá</NavLink>
            </ButtonContainer>
          </PlanCard>
        ))
      }
    </PlanSection>
  )
}

export default Plans;