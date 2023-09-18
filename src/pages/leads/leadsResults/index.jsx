import { useEffect, useState } from "react";
import { leadsResultsMenu } from "../../../data/menus";
import ContentPageContainer from "../../../containers/ContentPageContainer";
import CustomPageHeader from "../../../components/CustomPageHeader";
import { Container, StyledTable } from "./styles";
import api from "../../../api";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"

function LeadsResults() {

  const [leads, setLeads] = useState([]);
  const [variables, setVariables] = useState([]);
  const [menuComponent, setMenuComponent] = useState(0);
  const { user } = useStateContext();
  const params = useParams();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getLeads();
      getVariables();
    }
  }, [user]);

  const getLeads = async () => {
    try {
      const response = await api.get(`/leads/get-leads/${params.flowId}`);
      if (response.status === 200) {
        setLeads(response.data.leads);
      }
    } catch {
      toast.error('Erro ao carregar leads.');
    }
  };

  const getVariables = async () => {
    try {
      const response = await api.get(`/leads/get-variables/${user.id}/${params.flowId}`);
      if (response.status === 200) {
        setVariables(response.data.variables);
      }
    } catch {
      toast.error('Erro ao carregar variáveis.');
    }
  };

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={leadsResultsMenu}
          name={'Results'}
          setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
        />
      }
    >
      <Container>
        <StyledTable className="StyledTable">
          <thead>
            <tr>
              <th>Enviado em</th>
              {variables.map((variable) => (
                <th key={variable.id}>{variable.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  {format(new Date(lead.createDate), "dd 'de' MMMM 'de' yyyy, 'às' HH:mm", { locale: ptBR })}
                </td>
                {variables.map((variable) => (
                  <td key={variable.id}>
                    {lead.variables.find((v) => v.name === variable.name)?.value || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Container>
    </ContentPageContainer>
  )
}

export default LeadsResults;