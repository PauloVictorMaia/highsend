import { Container, EditInputsContent, InputItem } from "./styles";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from '../../../contexts/ContextProvider';
import api from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";

function EditIntegration() {

  const params = useParams();
  const integrationID = params.id;
  const navigate = useNavigate();
  const { user, getIntegrations } = useStateContext();
  const token = localStorage.getItem('token');
  const [integrationName, setIntegrationName] = useState(params.name);
  const [isLoading, setIsLoading] = useState(false);


  const editIntegrationName = async () => {
    if (!integrationName) {
      toast.warning('Escolha um nome para essa integração.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.patch(`/integrations/edit-integration-name/${user.id}/${integrationID}`, { integrationName }, { headers: { authorization: token } });
      if (response.status === 200) {
        getIntegrations();
        toast.success('Dados da integração salvos com sucesso.');
        navigate('/dashboard/integrations/');
        setIsLoading(false);
      }
    } catch {
      toast.error('Erro ao salvar dados da integração.');
      setIsLoading(false);
    }
  };

  return (
    <Container>

      <EditInputsContent>
        <InputItem
          label="Nome da integração"
          variant="outlined"
          type='text'
          name="integration"
          value={integrationName}
          onChange={(e) => setIntegrationName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              editIntegrationName();
            }
          }}
        />
        <button onClick={() => editIntegrationName()}>
          {isLoading ? <Ring color="#fff" size={20} /> : "Salvar"}
        </button>
      </EditInputsContent>

    </Container>
  )
}

export default EditIntegration;
