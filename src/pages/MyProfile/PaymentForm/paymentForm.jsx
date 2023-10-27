import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './paymentForm.css';
import { useStateContext } from "../../../contexts/ContextProvider";
import api from "../../../api";
import { toast } from "react-toastify";
import { useState } from "react";
import { Ring } from "@uiball/loaders";

function PaymentForm() {

  const stripe = useStripe();
  const elements = useElements();
  const { user, getPaymentMethod } = useStateContext();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const [cardElementIsVisible, setCardElementIsVisible] = useState(false);

  const updatePaymentMethod = async (cardToken) => {
    try {
      const response = await api.post(`subscriptions/update-payment-method`,
        { customerID: user.customerID, subscriptionID: user.subscriptionID, token: cardToken },
        { headers: { authorization: token } });
      if (response.status === 200) {
        getPaymentMethod();
        toast.success("Forma de pagamento atualizada com sucesso.");
        setCardElementIsVisible(false);
        setIsLoading(false);
      }

    } catch (error) {
      toast.error("Erro ao atualizar forma de pagamento.");
      setIsLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      toast.warning("Verifique os dados e tente novamente.");
      setIsLoading(false);
    } else {
      updatePaymentMethod(token);
    }
  };


  return (
    <>
      {
        cardElementIsVisible &&
        <form onSubmit={handleSubmit}>

          <span className="span">Insira os dados do cartão e os 5 primeiros dígitos do seu CEP</span>
          <CardElement className="card-element" />
          <button disabled={isLoading} className="button" type="submit">
            {isLoading ? <Ring size={20} color="#fff" /> : "Salvar forma de pagamento"}
          </button>

        </form>
      }
      <button className="button" onClick={() => setCardElementIsVisible(!cardElementIsVisible)}>
        {cardElementIsVisible ? "Cancelar" : "Mudar forma de pagamento"}
      </button>
    </>
  );
}

export default PaymentForm;