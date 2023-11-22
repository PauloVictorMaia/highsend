/* eslint-disable react/no-unescaped-entities */
import { Container, Integrations, Title, UserIntegrations, Modal, ModalContent, CloseButton, ModalButton, FormContainer, StepWrapper, InputItem, Button } from "./styles.js";
import api from '../../../api';
import { useStateContext } from '../../../contexts/ContextProvider';
import GoogleCalendarImg from '../../../assets/google.png';
import WhatsappImg from '../../../assets/whatsapp.png';
import IntegrationCard from "../../../components/IntegrationCard";
import UserIntegrationCard from "../../../components/UserIntegrationCards";
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CustomPageHeader from "../../../components/CustomPageHeader/index.jsx";
import ContentPageContainer from "../../../containers/ContentPageContainer/index.jsx";
import { integrationsMenu } from "../../../data/menus.js";
import { Ring } from "@uiball/loaders";
import activeCampaignLogo from '../../../assets/active-campaign-logo.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";

function IntegrationsList() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const token = localStorage.getItem('token');
  const { user, integrations, integrationsDataLoaded, getIntegrations } = useStateContext();
  const [qr, setQr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [menuComponent, setMenuComponent] = useState(0);
  const [activeCampaignModalIsOpen, setActiveCampaignModalIsOpen] = useState(false);
  const [activeCampaignApiUrl, setActiveCampaignApiUrl] = useState("");
  const [activeCampaignApiKey, setActiveCampaignApiKey] = useState("");

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
    syncWhatsapp();
  }

  const closeModal = () => {
    setQr("");
    setModalIsVisible(false);
  }

  const openActiveCampaignModal = () => {
    setActiveCampaignModalIsOpen(true);
  }

  const closeActiveCampaignModal = () => {
    setActiveCampaignModalIsOpen(false);
    setActiveCampaignApiUrl("");
    setActiveCampaignApiKey("");
  }

  const createActiveCampaignIntegration = async () => {

    if (!activeCampaignApiUrl || !activeCampaignApiKey) {
      toast.warning("A URL da API e a Chave da API precisam ser preenchidas para realizar a integração.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/integrations/active-campaign-integration/${user.id}`,
        { apiUrl: activeCampaignApiUrl, apiKey: activeCampaignApiKey },
        { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success("Integração com Active Campaign criada com sucesso. Agora vá até o fluxo desejado e associe essa integração.", {
          autoClose: 10000
        });
        getIntegrations();
        setIsLoading(false);
        closeActiveCampaignModal();
      }
    } catch (error) {
      toast.error("Erro ao criar nova integração.")
    }
  }

  function selectLogo(type) {
    const logos = {
      google: GoogleCalendarImg,
      whatsapp: WhatsappImg,
      activeCampaign: activeCampaignLogo
    };

    return logos[type];
  }

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={integrationsMenu}
          name={'Integrações'}
          setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
        />
      }
    >

      <Container>
        <Title>Adicionar nova integração</Title>

        <Integrations>
          <IntegrationCard
            img={GoogleCalendarImg}
            description={"Todos os eventos agendados na sua agenda Hiflow também serão agendados no Google Calendar."}
            integrationFunction={googleLogin}
            padding="0 50px"
            title="Google"
          />

          <IntegrationCard
            img={WhatsappImg}
            description={"Seu cliente receberá no whatsapp a mensagem que você escolher na sua agenda ou fluxo Hiflow."}
            integrationFunction={openModal}
            padding="0 20px"
            title="Whatsapp"
          />

          <IntegrationCard
            img={activeCampaignLogo}
            description={"Após integrar com o Active Campaign, vá até o fluxo desejado e associe essa integração."}
            integrationFunction={openActiveCampaignModal}
            padding="0 0px"
            title="Active Campaign"
          />

          <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible}>
            <ModalContent width={650} height={600}>
              {!qr &&
                <CloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal()
                  }
                  }>
                  <ClearIcon />
                </CloseButton>
              }

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

              {isLoading && !qr ? <Ring color="#333" size={25} /> : ''}

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

          <Modal onClick={(e) => e.stopPropagation()} isvisible={activeCampaignModalIsOpen}>
            <ModalContent width={400} height={420}>
              <CloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  closeActiveCampaignModal()
                }
                }>
                <ClearIcon />
              </CloseButton>

              <Formik
                initialValues={{ apiurl: '', apikey: '' }}
                validationSchema={Yup.object({
                  apiurl: Yup.string().required('Required'),
                  apikey: Yup.string().required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form>
                  <FormContainer>
                    <StepWrapper>
                      <h2>Integrando Active Campaign.</h2>
                    </StepWrapper>
                    <span className="info-content">precisamos de algumas informações</span>
                    <InputItem
                      label="URL da API"
                      variant="outlined"
                      type="text"
                      name="apiurl"
                      value={activeCampaignApiUrl}
                      onChange={(e) => setActiveCampaignApiUrl(e.target.value)}
                    />

                    <InputItem
                      label="Chave da API"
                      variant="outlined"
                      type="text"
                      name="apikey"
                      value={activeCampaignApiKey}
                      onChange={(e) => setActiveCampaignApiKey(e.target.value)}
                    />

                    <Button type="submit" onClick={() => createActiveCampaignIntegration()}>{isLoading ? <Ring color="#fff" size={25} /> : 'Criar'}</Button>

                  </FormContainer>
                </Form>
              </Formik>


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
    </ContentPageContainer>
  )
}

export default IntegrationsList;

