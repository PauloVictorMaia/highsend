import { ChangePaymentMethodButton, Container, Currency, CurrentPaymentMethod, FirstBlock, PaymentMethodContainer, PaymentTitle, PerMonth, PlanDescription, PlanDetailsContainer, PlanDetailsContent, PlanItemDiv, PlanItemText, PlanItemsContent, PlanPriceContent, PlanTitle, PlanTypeContent, Price, SecondBlock } from "./styles";
import { plans } from "../../../data/plans";
import { useStateContext } from "../../../contexts/ContextProvider";
import DoneAllIcon from '@mui/icons-material/DoneAll';
// import { useState } from "react";
// import Accordion from "../../../components/Accordion";
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import PaymentIcon from '@mui/icons-material/Payment';
// import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
// import ClearIcon from '@mui/icons-material/Clear';
// import { Ring } from "@uiball/loaders";
// import api from "../../../api";
// import { toast } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "../PaymentForm/paymentForm";
// import CircleIcon from '@mui/icons-material/Circle';

function ProfilePlan() {

  const { user } = useStateContext();
  const currentPlan = plans.find(plan => plan.type === user.accountType);
  // const [accordion, setAccordion] = useState(1);
  // const [modalIsVisible, setModalIsVisible] = useState(false);
  // const [chosenPlanId, setChosenPlanId] = useState(null);
  // const [chosenPlanType, setChosenPlanType] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const token = localStorage.getItem('token');

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

  // const stripe = loadStripe(
  //   import.meta.env.VITE_STRIPE_PUBLIC_KEY
  // );

  // const changeAccordionValue = (index) => {
  //   if (index === accordion) return setAccordion(0);
  //   return setAccordion(index);
  // }

  // const openModal = (id, type) => {
  //   setChosenPlanId(id);
  //   setChosenPlanType(type);
  //   setModalIsVisible(true);
  // }

  // const ChangePlan = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.patch(`subscriptions/update-signature`,
  //       { customerID: user.customerID, priceID: chosenPlanId, planType: chosenPlanType },
  //       { headers: { authorization: token } });
  //     if (response.status === 200) {
  //       toast.success("Seu plano foi alterado com sucesso.");
  //       getUser(token);
  //       setIsLoading(false);
  //       setModalIsVisible(false);
  //     }
  //   } catch {
  //     toast.error('Erro ao atualizar plano.');
  //     setIsLoading(false);
  //   }
  // }

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

        </CurrentPaymentMethod>
        <ChangePaymentMethodButton>
          Alterar forma de pagamento
        </ChangePaymentMethodButton>
      </PaymentMethodContainer>
    </Container>
  )
}

export default ProfilePlan;

{/* <span>
  OBS: A data de pagamento do plano permanecerá a mesma. Faremos um ajuste de valores
  automático levando em consideração os dias restantes do plano atual e o valor do novo plano. Caso o plano escolhido seja inferior ao seu plano atual, poderão ser gerados créditos que serão aproveitados em sua próxima fatura.
</span> */}