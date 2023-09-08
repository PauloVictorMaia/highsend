import { Container } from "./styles";
import api from '../../../api';

function IntegrationCalendar() {

  const token = localStorage.getItem('token');

  const googleLogin = async () => {
    try {
      const response = await api.get(`/calendars/integration/`, { headers: { authorization: token } });
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
