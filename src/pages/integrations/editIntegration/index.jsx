import { Container, EditInputsContent } from "./styles";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from '../../../contexts/ContextProvider';
import api from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditIntegration() {

  const params = useParams();
  const integrationID = params.id;
  const navigate = useNavigate();
  const { user, getIntegrations } = useStateContext();
  const token = localStorage.getItem('token');
  const [integrationName, setIntegrationName] = useState(params.name);


  const editIntegrationName = async () => {
    if (!integrationName) {
      toast.warning('Escolha um nome para essa integração.');
      return;
    }

    try {
      const response = await api.patch(`/integrations/edit-integration-name/${user.id}/${integrationID}`, { integrationName }, { headers: { authorization: token } });
      if (response.status === 200) {
        getIntegrations();
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
        <button onClick={() => editIntegrationName()}>Salvar</button>
      </EditInputsContent>

    </Container>
  )
}

export default EditIntegration;
