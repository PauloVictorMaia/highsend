import { CardDetailsContent, CardName, CardNumber, ChangePaymentMethodButton, ChangePlanButton, Container, Currency, CurrentPaymentMethod, FirstBlock, Last4, Modal, ModalContent, PaymentMethodContainer, PaymentTitle, PerMonth, PlanDescription, PlanDetailsContainer, PlanDetailsContent, PlanItemDiv, PlanItemText, PlanItemsContent, PlanPriceContent, PlanTitle, PlanTypeContent, Price, SecondBlock, UserName, UserNameDiv, ValidityDiv, CloseButton, PlansContainer, PlansTitle, Plans, Notification } from "./styles";
import { plans } from "../../../data/plans";
import { useStateContext } from "../../../contexts/ContextProvider";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm/paymentForm";
import PlanCard from "../../../components/PlanCard/PlanCard";
import api from "../../../api";
import { toast } from "react-toastify";

function ProfilePlan() {

  const { user, paymentMethod, getUser } = useStateContext();
  const currentPlan = plans.find(plan => plan.type === user.accountType);
  const otherPlans = plans.filter(plan => plan.type !== user.accountType);
  const [modalChangePaymentMethodIsVisible, setModalChangePaymentMethodIsVisible] = useState(false);
  const [modalChangePlanIsVisible, setModalChangePlanIsVisible] = useState(false);
  const token = localStorage.getItem('token');

  const getPlanTitle = (title) => {
    switch (title) {
      case 'STARTER':
        return 'INICIANTE'
      case 'PRO':
        return title
      case 'ENTERPRISE':
        return 'SCALE'
    }
  }

  const stripe = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLIC_KEY
  );

  const getPlanType = (type) => {
    const types = {
      STARTER: "Iniciante",
      PRO: "Pro",
      ENTERPRISE: "Scale"
    }

    return types[type] || type;
  }

  const ChangePlan = async (chosenPlanId, chosenPlanType) => {
    try {
      const response = await api.patch(`subscriptions/update-signature`,
        { customerID: user.customerID, priceID: chosenPlanId, planType: chosenPlanType },
        { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success("Seu plano foi alterado com sucesso.");
        getUser(token);
        setModalChangePlanIsVisible(false);
      }
    } catch {
      toast.error('Erro ao atualizar plano.');
    }
  }

  return (
    <Container>
      <PlanDetailsContainer>
        <PlanDetailsContent>
          <PlanTypeContent>
            <PlanTitle>
              {getPlanTitle(currentPlan.type)}
            </PlanTitle>
            <PlanDescription>
              {currentPlan.description}
            </PlanDescription>
            <PlanPriceContent>
              <Currency>R$</Currency>
              <Price>
                {currentPlan.price}
              </Price>
              <PerMonth>/Mês</PerMonth>
            </PlanPriceContent>
          </PlanTypeContent>

          <PlanItemsContent>
            <FirstBlock>
              <PlanItemDiv>
                <PlanItemText>{currentPlan.resources[0]}</PlanItemText>
                <DoneAllIcon />
              </PlanItemDiv>
              <PlanItemDiv>
                <PlanItemText>{currentPlan.resources[1]}</PlanItemText>
                <DoneAllIcon />
              </PlanItemDiv>
              <PlanItemDiv>
                <PlanItemText>{currentPlan.resources[2]}</PlanItemText>
                <DoneAllIcon />
              </PlanItemDiv>
            </FirstBlock>
            <SecondBlock>
              <PlanItemDiv>
                <PlanItemText>{currentPlan.resources[3]}</PlanItemText>
                <DoneAllIcon />
              </PlanItemDiv>
              <PlanItemDiv>
                <PlanItemText>{currentPlan.resources[4]}</PlanItemText>
                <DoneAllIcon />
              </PlanItemDiv>
              <PlanItemDiv>
                <PlanItemText>{currentPlan.resources[5]}</PlanItemText>
                <DoneAllIcon />
              </PlanItemDiv>
            </SecondBlock>
          </PlanItemsContent>
        </PlanDetailsContent>
      </PlanDetailsContainer>

      <PaymentMethodContainer>
        <PaymentTitle>Forma de pagamento</PaymentTitle>
        <CurrentPaymentMethod>
          <CardDetailsContent>
            <CardNumber>
              <Last4>{`**** **** **** ${paymentMethod.last4}`}</Last4>
              <span>{paymentMethod.brand}</span>
            </CardNumber>
            <CardName>
              <UserNameDiv>
                <UserName>{user.name}</UserName>
              </UserNameDiv>
              <ValidityDiv>
                <UserName>{`${paymentMethod.expMonth}/${paymentMethod.expYear}`}</UserName>
              </ValidityDiv>
            </CardName>
          </CardDetailsContent>
        </CurrentPaymentMethod>
        <ChangePaymentMethodButton onClick={() => setModalChangePaymentMethodIsVisible(true)}>
          Alterar forma de pagamento
        </ChangePaymentMethodButton>
      </PaymentMethodContainer>
      <ChangePlanButton onClick={() => setModalChangePlanIsVisible(true)}>Mudar plano</ChangePlanButton>

      <Modal
        isvisible={modalChangePaymentMethodIsVisible}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent width={600} height={200}>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setModalChangePaymentMethodIsVisible(false);
            }}
          >
            <ClearIcon />
          </CloseButton>

          <Elements stripe={stripe}>
            <PaymentForm setModalChangePaymentMethodIsVisible={setModalChangePaymentMethodIsVisible} />
          </Elements>
        </ModalContent>
      </Modal>

      <Modal
        isvisible={modalChangePlanIsVisible}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent width={700} height={500}>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setModalChangePlanIsVisible(false);
            }}
          >
            <ClearIcon />
          </CloseButton>

          <PlansContainer>
            <PlansTitle>Escolha o plano:</PlansTitle>
            <Plans>
              {
                otherPlans &&
                otherPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    type={getPlanType(plan.type)}
                    description={plan.description}
                    price={plan.price}
                    action={ChangePlan}
                    id={plan.id}
                    originalType={plan.type}
                    resources={plan.resources}
                  />
                ))
              }
            </Plans>
            <Notification>
              OBS: A data de pagamento do plano permanecerá a mesma. Faremos um ajuste de valores
              automático levando em consideração os dias restantes do plano atual e o valor do novo plano. Caso o plano escolhido seja inferior ao seu plano atual, poderão ser gerados créditos que serão aproveitados em sua próxima fatura.
            </Notification>
          </PlansContainer>

        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ProfilePlan;