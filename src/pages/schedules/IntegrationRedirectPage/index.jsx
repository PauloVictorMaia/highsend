import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import api from "../../../api";

function RedirectPage() {

  const { user } = useStateContext();
  const params = useParams();
  const code = `${params.code}/${params.token}`;

  useEffect(() => {
    if (code && Object.keys(user).length > 0) {
      getAndSaveToken(user, code);
      console.log(user, code);
    }
  }, [user]);

  async function getAndSaveToken(user, code) {
    try {
      const response = await api.post(`/calendars/integration/get-and-save-token/${user.id}/${code}`, {});
      if (response.status === 200) {
        console.log(response.data.tokens);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ color: '#000' }}>Sua conta google foi sincronizada com sucesso.</div>
  )
}

export default RedirectPage;