/* eslint-disable react/prop-types */
import { useState } from "react";
import { Container, StepContainer, StepWrapper, CheckBoxContainer } from "./styles";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import api from '../../api';
import { toast } from "react-toastify";
import './SubscriptionPage.style.css';
import { plans } from "../../data/plans";

const stripePromise = loadStripe(
  "pk_test_51NxZCIKd09418g8AtJLqbAaANxQEzIVlWLx8mj2LITTTPwAA2Cdhifjqh6qPHdAbCbgTaBAhddEZXPtdjqMCkmw3003NF51QP4"
);

const SubscriptionPage = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const name = `${firstName} ${lastName}`
  const [subscriptionID, setSubscriptionID] = useState(null);
  const [customerID, setCustomerID] = useState(null);
  const [planID, setPlanID] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const params = useParams();
  const priceId = params.subscriptionId;
  const accountType = params.type;
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const plan = plans.find(plan => plan.id === priceId);

  const createCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(`/subscriptions/create-customer`, { name, email });
      if (response.status === 200) {
        createSubscription(response.data.customer.id);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  const createSubscription = async (customerId) => {
    try {
      const response = await api.post(`/subscriptions/create-subscription`, { customerId, priceId });
      if (response.status === 200) {
        setClientSecret(response.data.clientSecret);
        setSubscriptionID(response.data.subscriptionID);
        setCustomerID(response.data.customerID);
        setPlanID(response.data.planID);
        setIsLoading(false);
        setCurrentStep(2);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  const handleStep = async () => {

    if (!firstName) {
      toast.warning('Preencha o campo "Primeiro nome".');
      return;
    }

    if (!lastName) {
      toast.warning('Preencha o campo "Sobrenome".');
      return;
    }

    if (!email) {
      toast.warning('Preencha o campo "Email".');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning("O email informado não corresponde ao formato correto. Verifique os dados e tente novamente.");
      return;
    }

    if (!password) {
      toast.warning('Preencha o campo "Senha".');
      return;
    } else if (password.length < 8) {
      toast.warning("A senha deve conter 8 caracteres.");
      return;
    } else if (!confirmPassword) {
      toast.warning('Confirme a sua senha no campo "Confirme a Senha".');
      return;
    } else if (password !== confirmPassword) {
      toast.warning("Existe uma diferença entre a senha informada e a sua confirmação. Verifique os dados e tente novamente.");
      return;
    }

    try {
      const response = await api.get(`/users/check-existing-email/${email}`);
      if (response.status === 200) {
        if (response.data.result === true) {
          toast.warning("Já existe um usuário cadastrado com esse email. Por favor, insira outro email.");
          return;
        } else {
          createCustomer();
        }
      }
    } catch {
      return;
    }

  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container>
      {currentStep === 1 ? (
        <StepContainer>
          <StepWrapper style={{ marginBottom: "40px" }}>
            <h2>Informações Pessoais</h2>
            {plan && <span>{`Plano ${plan.type} - R$${plan.price}/mês`}</span>}
          </StepWrapper>

          <input
            type="text"
            placeholder="Primeiro Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha (deve conter 8 caracteres)"
            value={password}
            maxLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirme a Senha"
            value={confirmPassword}
            maxLength={8}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <CheckBoxContainer>
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Mostrar senha</label>
          </CheckBoxContainer>

          <button id="next-button" disabled={isLoading} onClick={() => handleStep()}>
            <span>
              {isLoading ? <div className="spinner" id="spinner"></div> : "Ir para pagamento"}
            </span>
          </button>

        </StepContainer>
      ) : (
        <StepContainer>
          <StepWrapper>
            <h2>Informações de Pagamento</h2>
            <button onClick={() => setCurrentStep(1)}>Voltar</button>
          </StepWrapper>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                name={name}
                email={email}
                password={password}
                accountType={accountType}
                subscriptionID={subscriptionID}
                customerID={customerID}
                planID={planID}
              />
            </Elements>
          )}
        </StepContainer>
      )}
    </Container>
  );
};

export default SubscriptionPage;