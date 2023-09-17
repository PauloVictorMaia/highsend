import React from 'react';
import styled from 'styled-components';

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
        <PlanCard>
          <h3>Básico</h3>
          <p>Para startups e profissionais individuais</p>
          <ul>
            <li>Chatbot básico</li>
            <li>Agendamento simples</li>
            <li>Até 500 interações/mês</li>
          </ul>
          <h4>R$29/mês</h4>
        </PlanCard>

        <PlanCard>
          <h3>Empresarial</h3>
          <p>Para empresas em crescimento</p>
          <ul>
            <li>Chatbot avançado</li>
            <li>Agendamento com integrações</li>
            <li>Até 10.000 interações/mês</li>
          </ul>
          <h4>R$99/mês</h4>
        </PlanCard>

        <PlanCard>
          <h3>Premium</h3>
          <p>Para grandes empresas</p>
          <ul>
            <li>Chatbot AI-driven</li>
            <li>Agendamento ilimitado</li>
            <li>Suporte prioritário 24/7</li>
          </ul>
          <h4>R$199/mês</h4>
        </PlanCard>
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
