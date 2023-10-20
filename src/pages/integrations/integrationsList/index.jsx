import { Container, Integrations, Title, UserIntegrations, Modal, ModalContent, CloseButton } from "./styles";
import api from '../../../api';
import { useStateContext } from '../../../contexts/ContextProvider';
import GoogleCalendarImg from '../../../assets/google-calendar.png';
import WhatsappImg from '../../../assets/whatsapp-logo.png';
import IntegrationCard from "../../../components/IntegrationCard";
import UserIntegrationCard from "../../../components/UserIntegrationCards";
import { toast } from "react-toastify";
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';

function IntegrationsList() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const token = localStorage.getItem('token');
  const { user, integrations, integrationsDataLoaded, getIntegrations } = useStateContext();
  const [qr, setQr] = useState('');
  const [phone, setPhone] = useState('');

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

  const syncWhatsapp = async () => {

    if (!phone) {
      toast.warning("Preencha um número de telefone válido.");
      return;
    }

    try {
      const response = await api.get(`/integrations/whatsapp-sync/${user.id}/${phone}`, { headers: { authorization: token }, body: { user: user.id, phone: phone } });
      if (response.status === 200) {
        console.log(response.data.qr);
        setQr(response.data.qr)
      }
    } catch {
      return;
    }
  };

  const openModal = () => {
    setModalIsVisible(true);
  }

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
          integrationFunction={openModal}
          padding="0 20px"
        />

        <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible}>
          <ModalContent width={350} height={200}>
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                setModalIsVisible(false)
              }
              }>
              <ClearIcon />
            </CloseButton>
            <div>
              <label style={{ display: "block" }}>Número whatsapp</label>
              <input
                style={{ display: "block" }}
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="11988888888"
              />
              <button onClick={() => syncWhatsapp()}>Gerar QR Code</button>
            </div>

            {
              qr && <img style={{ width: "100px", height: "100px" }} src={qr} alt="QR Code" />
            }
          </ModalContent>
        </Modal>
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

