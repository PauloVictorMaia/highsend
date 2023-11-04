import styled from "styled-components";
import { plans } from "../../data/plans";
import { NavLink } from "react-router-dom";
import IconLogo from '../../assets/SVGComponents/iconLogo';
import TextLogo from '../../assets/SVGComponents/textLogo';
import CheckIcon from '../../assets/SVGComponents/check';

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #F8F8F8;
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: #222F43;

  @media (max-width: 768px) {
    height: auto;
    padding: 30px;
  }

  .icon-container {
    display: flex;
    column-gap: 10px ;
    margin-bottom: 30px;
  }
`;

const PlanSection = styled.section`
  display: flex;
  justify-content: space-around;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;

const PlanCard = styled.div`
  width: 360px;
  height: ${({ height }) => height ? '670px' : '570px'};
  background-color: ${({ height }) => height ? '#E0EAFF' : '#fff'};
  border: ${({ height }) => height ? '2px solid #4339F2' : '2px solid #A0B4D1'};
  border-bottom: ${({ height }) => height ? '4px solid #4339F2' : '4px solid #A0B4D1'};
  padding: 25px 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }


  .badge {
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
}

.badge::before,
.badge::after {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border: 5px solid #2980b9;
}

.badge span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0px;
  background-color: #4339F2;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  font: 700 18px/1 "Lato", sans-serif;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}

/* in alto a destra */
.badge-top-right {
  top: -10px;
  right: -10px;
}

.badge-top-right::before,
.badge-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}

.badge-top-right::before {
  top: 0;
  left: 0;
}

.badge-top-right::after {
  bottom: 0;
  right: 0;
}

.badge-top-right span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}


  .plan-type {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 25px;
  }

  .plan-description {
    font-size: 20px;
    text-align: center;
    margin-bottom: 25px;
    height: 40px;
  }

  .past-value {
    color: #E22A4B;
    font-weight: bold;
    text-decoration: line-through;
  }

  .price-block {
    height: 60px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 20px;
  }

  .price-value {
    font-size: 50px;
  }

  .price-cifrao {
    top: 0;
    left: 0;
    position: absolute;
  }

  .prive-period {
    color: #526B92;
    font-size: 20px;
  }

  .details-plan {
    display: flex;
    flex-direction: column;
    line-height: 40px;
    color: #4339F2;
    font-size: 15px;
    width: 95%;
  }

  .resource-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  background-color: #4339F2;
  border-radius: 40px;
  padding: 12px 0;
  color: #fff;
  cursor: pointer;
  margin-bottom: 25px;

  a {
    color: #fff;
  }
`;

function Plans() {
  return (
    <Container>
      <div className='icon-container'>
        <IconLogo />
        <TextLogo />
      </div>
      <PlanSection>
        {
          plans.map((plan) => (
            <PlanCard key={plan.id} height={plan.type === 'PRO'}>
              {plan.type === 'PRO' &&
                <div className="badge badge-top-right">
                  <span>Popular 😍</span>
                </div>
              }
              <h3 className='plan-type'>{plan.type}</h3>
              <span className='plan-description'>{plan.description}</span>
              {plan.type === 'PRO' &&
                <span className='past-value'>R$297</span>
              }
              <div className='price-block'>
                <span className='price-cifrao'>R$</span>
                <span className='price-value'>{plan.price}</span>
                <span className='prive-period'>/Mês</span>
              </div>
              <NavLink to={`/subscription/${plan.type}/${plan.id}`}>
                <ButtonContainer>
                  Comece agora
                </ButtonContainer>
              </NavLink>
              <div className='details-plan'>
                {
                  plan.resources.map((resource, index) => (
                    <span className='resource-item' key={index}>{resource} <CheckIcon /></span>
                  ))
                }
              </div>
            </PlanCard>
          ))
        }
      </PlanSection>
    </Container>
  )
}

export default Plans;