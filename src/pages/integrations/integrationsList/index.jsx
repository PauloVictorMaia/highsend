/* eslint-disable react/no-unescaped-entities */
import { Container, Integrations, Title, UserIntegrations, Modal, ModalContent, CloseButton, ModalButton } from "./styles.js";
import api from '../../../api';
import { useStateContext } from '../../../contexts/ContextProvider';
import GoogleCalendarImg from '../../../assets/google-calendar.png';
import WhatsappImg from '../../../assets/whatsapp-logo.png';
import IntegrationCard from "../../../components/IntegrationCard";
import UserIntegrationCard from "../../../components/UserIntegrationCards";
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';

function IntegrationsList() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const token = localStorage.getItem('token');
  const { user, integrations, integrationsDataLoaded, getIntegrations } = useStateContext();
  const [qr, setQr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setQr("");
      setIsLoading(true);
      const response = await api.get(`/integrations/whatsapp-sync/${user.id}/`, { headers: { authorization: token }, body: { user: user.id } });
      if (response.status === 200) {
        setQr(response.data.qr)
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      return;
    }
  };

  const finalizeIntegration = () => {
    getIntegrations();
    setQr("");
    setModalIsVisible(false);
  }

  const openModal = () => {
    setModalIsVisible(true);
  }

  const closeModal = () => {
    setQr("");
    setModalIsVisible(false);
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
                closeModal()
              }
              }>
              <ClearIcon />
            </CloseButton>

            {
              qr &&
              <>
                <span>Intruções:</span>
                <span>1. Abra seu whatsapp</span>
                <span>2. Clique em "Aparelhos conectados"</span>
                <span>3. Clique em "Conectar um aparelho"</span>
                <span>4. Escaneie o QR Code abaixo</span>
                <img src={qr} alt="QR Code" />
              </>
            }

            <ModalButton
              onClick={() => syncWhatsapp()}
              disabled={isLoading}
            >
              {
                isLoading ? <div className="spinner" id="spinner"></div> :
                  qr ? "Gerar novo QR Code" : "Gerar QR Code"
              }
            </ModalButton>

            {
              qr &&
              <>
                <span>Aguarde a sincrozinação.</span>
                <span>Clique no botão abaixo para concluir</span>
                <ModalButton onClick={() => finalizeIntegration()}>Concluir</ModalButton>
              </>
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

