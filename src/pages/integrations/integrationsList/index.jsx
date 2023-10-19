import { Container, Integrations, Title, UserIntegrations } from "./styles";
import api from '../../../api';
import { useStateContext } from '../../../contexts/ContextProvider';
import GoogleCalendarImg from '../../../assets/google-calendar.png';
import WhatsappImg from '../../../assets/whatsapp-logo.png';
import IntegrationCard from "../../../components/IntegrationCard";
import UserIntegrationCard from "../../../components/UserIntegrationCards";
import { toast } from "react-toastify";
function IntegrationsList() {

  const token = localStorage.getItem('token');
  const { user, integrations, integrationsDataLoaded, getIntegrations } = useStateContext();

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

  const phone = 5511954801434;

  const syncWhatsapp = async () => {
    console.log("exec")
    try {
      const response = await api.get(`/integrations/whatsapp-sync/${user.id}/${phone}`, { headers: { authorization: token }, body: { user: user.id, phone: phone } });
      if (response.status === 200) {
        console.log(response.data.qr);
      }
    } catch {
      return;
    }
  };

  const deleteIntegration = async (integrationID) => {
    try {
      const response = await api.delete(`/integrations/delete-integration/${user.id}/${integrationID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success("Dados da integração excluídos com sucesso!");
        getIntegrations();
      }
    } catch {
      return;
    }
  }

  function selectLogo(type) {
    const logos = {
      google: GoogleCalendarImg,
      whatsapp: WhatsappImg,
    };

    return logos[type];
  }

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
                img={selectLogo(integration.type)}
                description={integration.name}
                id={integration.id}
                name={integration.name}
                deleteIntegration={deleteIntegration}
              />
            ))
          )
            :
            (
              integrationsDataLoaded && <span>Você ainda não possui integrações.</span>
            )
        }
      </UserIntegrations>
    </Container>
  )
}

export default IntegrationsList;

