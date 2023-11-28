import { useState, useEffect } from "react";
import { leadsResultsMenu } from "../../../data/menus";
import ContentPageContainer from "../../../containers/ContentPageContainer";
import CustomPageHeader from "../../../components/CustomPageHeader";
import Submissions from "./submissions";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "../../../api";
import LeadsContext from "./context";
import KanbanBoard from "./kanbanBoard";

function LeadsResults() {

  const [leads, setLeads] = useState([]);
  const [variables, setVariables] = useState([]);
  const [leadsList, setLeadsList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [menuComponent, setMenuComponent] = useState(0);
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const params = useParams();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      Promise.all([getLeads(), getVariables(), getFormattedLeads()])
        .catch((error) => {
          return error;
        });
    }
  }, []);

  const getLeads = async () => {
    try {
      const response = await api.get(`/leads/get-leads/${params.flowId}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setLeads(response.data.leads);
        setLoaded(true);
      }
    } catch {
      toast.error('Erro ao carregar leads.');
    }
  };

  const getVariables = async () => {
    try {
      const response = await api.get(`/leads/get-variables/${user.id}/${params.flowId}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setVariables(response.data.variables);
      }
    } catch {
      toast.error('Erro ao carregar variáveis.');
    }
  };

  const getFormattedLeads = async () => {
    try {
      const response = await api.get(`/leads/get-formatted-leads/${params.flowId}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setLeadsList(response.data.leadsList);
      }
    } catch {
      toast.error('Erro ao carregar lista de leads.');
    }
  };

  return (
    <LeadsContext.Provider value={{ leads, variables, loaded, getLeads, getVariables, leadsList, setLeadsList, getFormattedLeads }}>
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
        {
          menuComponent === 0 &&
          <Submissions />
        }

        {
          menuComponent === 1 &&
          <KanbanBoard />
        }
      </ContentPageContainer>
    </LeadsContext.Provider>
  )
}

export default LeadsResults;