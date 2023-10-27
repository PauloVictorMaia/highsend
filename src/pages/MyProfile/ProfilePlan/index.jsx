import { Container, ProfilePlanContent, ContentContainer, AccountTypeContainer, BenefitsContainer, PriceContainer, PlansContainer, PlanCard, Button, Modal, ModalContent, CloseButton, ModalButtonsContainer, ModalButton, CurrentCard, FakeNumbers } from "./styles";
import { plans } from "../../../data/plans";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import Accordion from "../../../components/Accordion";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ClearIcon from '@mui/icons-material/Clear';
import { Ring } from "@uiball/loaders";
import api from "../../../api";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm/paymentForm";
import CircleIcon from '@mui/icons-material/Circle';

function ProfilePlan() {

  const { user, getUser, cardLast4 } = useStateContext();
  const currentPlan = plans.find(plan => plan.type === user.accountType);
  const [accordion, setAccordion] = useState(1);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [chosenPlanId, setChosenPlanId] = useState(null);
  const [chosenPlanType, setChosenPlanType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const stripe = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLIC_KEY
  );

  const changeAccordionValue = (index) => {
    if (index === accordion) return setAccordion(0);
    return setAccordion(index);
  }

  const openModal = (id, type) => {
    setChosenPlanId(id);
    setChosenPlanType(type);
    setModalIsVisible(true);
  }

  const ChangePlan = async () => {
    try {
      setIsLoading(true);
      const response = await api.patch(`subscriptions/update-signature`,
        { customerID: user.customerID, priceID: chosenPlanId, planType: chosenPlanType },
        { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success("Seu plano foi alterado com sucesso.");
        getUser(token);
        setIsLoading(false);
        setModalIsVisible(false);
      }
    } catch {
      toast.error('Erro ao atualizar plano.');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <ProfilePlanContent>
        <Accordion
          open={accordion === 1}
          onClick={() => changeAccordionValue(1)}
          title={"Informações do plano atual"}
          icon={<InfoOutlinedIcon />}
        >
          <ContentContainer>
            <AccountTypeContainer>
              <h2>{`Plano ${currentPlan.type}`}</h2>
              <span>{currentPlan.description}</span>
            </AccountTypeContainer>

            <BenefitsContainer>
              <h3>Benefícios</h3>
              <div>
                {currentPlan.resources.map((resource, index, array) => (
                  <span key={resource}>
                    {resource}
                    {index < array.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </BenefitsContainer>

            <PriceContainer>
              <h3>Valor do plano</h3>
              <span>{`R$${currentPlan.price},00/mês`}</span>
            </PriceContainer>
          </ContentContainer>
        </Accordion>

        <Accordion
          open={accordion === 2}
          onClick={() => changeAccordionValue(2)}
          title={"Forma de pagamento"}
          icon={<PaymentIcon />}
        >
          <ContentContainer>
            <span>Atual</span>
            <CurrentCard>
              <PaymentIcon style={{ color: "#F26800" }} />
              <FakeNumbers>
                <CircleIcon />
                <CircleIcon />
                <CircleIcon />
                <CircleIcon />
              </FakeNumbers>
              <FakeNumbers>
                <CircleIcon />
                <CircleIcon />
                <CircleIcon />
                <CircleIcon />
              </FakeNumbers>
              <FakeNumbers>
                <CircleIcon />
                <CircleIcon />
                <CircleIcon />
                <CircleIcon />
              </FakeNumbers>
              <FakeNumbers>
                {cardLast4 && <span>{cardLast4.charAt(0).toUpperCase()}</span>}
                {cardLast4 && <span>{cardLast4.charAt(1).toUpperCase()}</span>}
                {cardLast4 && <span>{cardLast4.charAt(2).toUpperCase()}</span>}
                {cardLast4 && <span>{cardLast4.charAt(3).toUpperCase()}</span>}
              </FakeNumbers>
            </CurrentCard>
            <Elements stripe={stripe}>
              <PaymentForm />
            </Elements>
          </ContentContainer>
        </Accordion>

        <Accordion
          open={accordion === 3}
          onClick={() => changeAccordionValue(3)}
          title={"Mudar de plano"}
          icon={<PublishedWithChangesIcon />}
        >
          <ContentContainer>
            <PlansContainer>
              {
                plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    disabled={currentPlan.type === plan.type}
                  >
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
                    <Button
                      disabled={currentPlan.type === plan.type}
                      onClick={() => openModal(plan.id, plan.type)}
                    >
                      {
                        currentPlan.type === plan.type ?
                          "Plano atual"
                          :
                          `Mudar para ${plan.type}`
                      }
                    </Button>
                  </PlanCard>
                ))
              }
            </PlansContainer>
            <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible}>
              <ModalContent width={350} height={400}>
                <CloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalIsVisible(false)
                  }
                  }>
                  <ClearIcon />
                </CloseButton>

                <p>
                  {
                    `Você escolheu o plano ${chosenPlanType}. Prosseguir com a mudança de plano?`
                  }
                </p>

                <span>
                  OBS: A data de pagamento do plano permanecerá a mesma. Faremos um ajuste de valores
                  automático levando em consideração os dias restantes do plano atual e o valor do novo plano. Caso o plano escolhido seja inferior ao seu plano atual, poderão ser gerados créditos que serão aproveitados em sua próxima fatura.
                </span>

                <ModalButtonsContainer>
                  <ModalButton
                    onClick={() => setModalIsVisible(false)}
                    background="#9999FF"
                    disabled={isLoading}
                  >
                    Voltar
                  </ModalButton>

                  <ModalButton
                    disabled={isLoading}
                    background="#E67200"
                    onClick={() => ChangePlan()}
                  >
                    {isLoading ? <Ring size={20} color="#fff" /> : "Quero mudar"}
                  </ModalButton>
                </ModalButtonsContainer>

              </ModalContent>
            </Modal>
          </ContentContainer>
        </Accordion>

      </ProfilePlanContent>
    </Container>
  )
}

export default ProfilePlan;