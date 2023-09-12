import { Container, EditInputsContent } from "./styles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from '../../../contexts/ContextProvider';
import api from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditGoogleIntegration() {

  const params = useParams();
  const integrationID = params.id;
  const navigate = useNavigate();
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const [integrationName, setIntegrationName] = useState("");
  const [integrationEmail, setIntegrationEmail] = useState("");

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getIntegrationName();
    }
  }, [user]);

  async function getIntegrationName() {
    try {
      const response = await api.get(`/integrations/get-integration-data/${user.id}/${integrationID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setIntegrationName(response.data.name);
      }
    } catch {
      return;
    }
  }

  const editIntegrationName = async () => {
    if (!integrationName) {
      toast.warning('Escolha um nome para essa integração.');
      return;
    }

    try {
      const response = await api.patch(`/integrations/edit-integration-name/${user.id}/${integrationID}`, { integrationName }, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Dados da integração salvos com sucesso.');
        navigate('/dashboard/integrations/');
      }
    } catch {
      toast.error('Erro ao salvar dados da integração.');
    }
  };

  return (
    <Container>

      <EditInputsContent>
        <input
          type="text"
          defaultValue={integrationName}
          onChange={(e) => setIntegrationName(e.target.value)}
        />
        <input
          type="text"
          defaultValue={integrationEmail}
          onChange={(e) => setIntegrationEmail(e.target.value)}
        />
        <button onClick={() => editIntegrationName()}>Salvar</button>
      </EditInputsContent>

    </Container>
  )
}

export default EditGoogleIntegration;
