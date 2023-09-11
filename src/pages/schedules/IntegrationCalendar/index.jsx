import { Container } from "./styles";
import api from '../../../api';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useState, useEffect } from "react";

function IntegrationCalendar() {

  const token = localStorage.getItem('token');
  const { user } = useStateContext();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setUserID(user.id);
    }
  }, [user]);

  const googleLogin = async () => {
    try {
      const response = await api.get(`/calendars/google-consentpage/${userID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        const url = response.data.URL;
        window.open(url, '_blank');
      }
    } catch {
      return;
    }
  }

  return (
    <Container>
      <button onClick={() => googleLogin()}>Sincronizar conta google</button>
    </Container>
  )
}

export default IntegrationCalendar;
