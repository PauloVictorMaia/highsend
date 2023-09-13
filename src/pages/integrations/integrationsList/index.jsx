import { Container, Integrations, Title, UserIntegrations } from "./styles";
import api from '../../../api';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useState, useEffect } from "react";
import GoogleCalendarImg from '../../../assets/google-calendar.png';
import WhatsappImg from '../../../assets/whatsapp-logo.png';
import IntegrationCard from "../../../components/IntegrationCard";
import UserIntegrationCard from "../../../components/UserIntegrationCards";

function IntegrationsList() {

  const token = localStorage.getItem('token');
  const { user } = useStateContext();
  const [integrations, setIntegrations] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getIntegrations()
    }
  }, [user]);

  const googleLogin = async () => {
    try {
      const response = await api.get(`/integrations/google-consentpage/${user.id}`, { headers: { authorization: token } });
      if (response.status === 200) {
        const url = response.data.URL;
        window.location.href = url;
      }
    } catch {
      return;
    }
  };

  async function getIntegrations() {
    try {
      const response = await api.get(`/integrations/get-integrations-filtered/${user.id}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setIntegrations(response.data.googleIntegrations);
        setDataLoaded(true);
      }
    } catch {
      return;
    }
  }

  const syncWhatsapp = async () => {
    return;
  };

  return (
    <Container>
      <Title>Adicionar nova integração</Title>

      <Integrations>
        <IntegrationCard
          img={GoogleCalendarImg}
          description={"Todos os eventos agendados na sua agenda Hiflow também serão agendados no Google Calendar."}
          integrationFunction={googleLogin}
          padding="0 50px"
        />

        <IntegrationCard
          img={WhatsappImg}
          description={"Seu cliente receberá no whatsapp a mensagem que você escolher na sua agenda Hiflow."}
          integrationFunction={syncWhatsapp}
          padding="0 20px"
        />
      </Integrations>

      <Title>Minhas integrações</Title>

      <UserIntegrations>
        {
          integrations && integrations.length > 0 ? (
            integrations.map((integration, index) => (
              <UserIntegrationCard
                key={index}
                img={integration.logo}
                description={integration.name}
                id={integration.id}
              />
            ))
          )
            :
            (
              dataLoaded && <span>Você ainda não possui integrações.</span>
            )
        }
      </UserIntegrations>

    </Container>
  )
}

export default IntegrationsList;

