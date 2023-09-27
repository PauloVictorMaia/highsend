import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { plans } from '../../data/plans';

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 50px;
`;

const Header = styled.header`
  background-color: #F26800;
  color: white;
  padding: 30px 0;
  text-align: center;
`;

const FeaturesSection = styled.section`
  margin: 50px 0;
  text-align: center;
`;

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

  > button {
    background: #F26800;
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

const CTASection = styled.section`
  background-color: #F26800;
  color: white;
  padding: 30px 0;
  text-align: center;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 50px;
`;

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <h1>HiFlow: O Futuro do Atendimento</h1>
        <p>Conquiste mais vendas e otimize sua comunicação com nossas soluções de chatbot e agendamento.</p>
      </Header>

      <FeaturesSection>
        <h2>Funcionalidades</h2>
        <ul>
          <li>🤖 Construção intuitiva de chatbots ao estilo Typebot</li>
          <li>🗓️ Agendamento e criação de calendários inspirados no Calendly</li>
          <li>🚀 Aumento de conversões e engajamento de clientes</li>
          <li>🛠️ Integração fácil com outras ferramentas</li>
        </ul>
      </FeaturesSection>

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
                <button onClick={() => navigate(`/subscription/${plan.type}/${plan.id}`)}>Vamos lá</button>
              </ButtonContainer>
            </PlanCard>
          ))
        }
      </PlanSection>

      <CTASection>
        <h2>Pronto para revolucionar o atendimento da sua empresa?</h2>
        <p>Seja um dos primeiros a experimentar o poder do HiFlow. Assine agora!</p>
      </CTASection>

      <Footer>
        <p>&copy; 2023 HiFlow Soluções</p>
      </Footer>
    </Container>
  );
};

export default LandingPage;
