/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import './Checkout.style.css';
import api from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";

export default function CheckoutForm({ name, email, password, accountType, subscriptionID, customerID, planID }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const { signIn } = useStateContext()

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Tudo certo! Aguarde enquanto te redirecionamos para o nosso dashboard...");
          break;
        case "processing":
          setMessage("Processando pagamento.");
          break;
        case "requires_payment_method":
          setMessage("Seu pagamento não foi realizado. Por favor, tente novamente.");
          break;
        default:
          setMessage("Algo deu errado. Por favor, tente novamente.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    });

    if (response.paymentIntent) {
      setClientSecret(response.paymentIntent.client_secret);
      if (response.paymentIntent.status === "succeeded") {
        createUser();
      }
    }

    if (response.error) {
      if (response.error.type === "card_error" || response.error.type === "validation_error") {
        setMessage(response.error.message);
      } else {
        setMessage("Um erro inesperado ocorreu. Por favor, tente novamente.");
      }
    }

    setIsLoading(false);
  };

  const createUser = async () => {
    try {
      const response = await api.post('/users/create-user', {
        name, email, password, accountType, subscriptionID, customerID, planID
      });
      if (response.status === 200) {
        signIn(email, password);
      }
    } catch {
      return;
    }
  }

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Concluir assinatura"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}