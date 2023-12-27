/* eslint-disable react-hooks/exhaustive-deps */
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
import { LoadingContainer } from "./styles";
import { Ring } from "@uiball/loaders";

function LeadsResults() {

  const [leads, setLeads] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [variables, setVariables] = useState([]);
  const [leadsList, setLeadsList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [menuComponent, setMenuComponent] = useState(0);
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const params = useParams();
  const [loadingFormattedLeads, setLoadingFormattedLeads] = useState(false);
  const [leadsIsLoading, setLeadsIsLoading] = useState(false);
  const [filterVariable, setFilterVariable] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getLeads(),
        getVariables(),
        getFormattedLeads()
    }
  }, []);

  const getLeads = async () => {
    try {
      setLeadsIsLoading(true);
      const response = await api.get(`/leads/get-leads/${params.flowId}?page=${page}&variable=${filterVariable}&value=${filterValue}`,
        { headers: { authorization: token } });
      if (response.status === 200) {
        setLeads(response.data.leads);
        setTotalPages(response.data.totalPages);
        setLoaded(true);
        setLeadsIsLoading(false);
      }
    } catch {
      toast.error('Erro ao carregar leads.');
      setLeadsIsLoading(false);
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
      setLoadingFormattedLeads(true);
      const response = await api.get(`/leads/get-formatted-leads/${params.flowId}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setLeadsList(response.data.leadsList);
        setLoadingFormattedLeads(false);
      }
    } catch {
      toast.error('Erro ao carregar lista de leads.');
      setLoadingFormattedLeads(false);
    }
  };

  const changeLeadsStatusInBulk = async (leadsIds, status) => {

    try {
      const response = await api.patch(`/leads/edit-leads-status-in-bulk/${params.flowId}`, { leadsIds, status }, { headers: { authorization: token } });
      if (response.status === 200) {
        console.log("sucesso")
      }
    } catch {
      return;
    }
  };

  const updateLeadStatus = async (leadID, value) => {

    try {
      const response = await api.patch(`/leads/edit-status-lead/${params.flowId}/${leadID}`, { value }, { headers: { authorization: token } });
      if (response.status === 200) {
        getLeads();
      }
    } catch {
      return;
    }
  };

  return (
    <LeadsContext.Provider
      value={{ leads, setLeads, page, setPage, totalPages, setTotalPages, variables, loaded, leadsIsLoading, loadingFormattedLeads, getLeads, getVariables, leadsList, setLeadsList, getFormattedLeads, updateLeadStatus, changeLeadsStatusInBulk, filterVariable, setFilterVariable, filterValue, setFilterValue }}
    >
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
          menuComponent === 0 && !loadingFormattedLeads &&
          <KanbanBoard />
        }

        {
          loadingFormattedLeads &&
          <LoadingContainer>
            <Ring size={50} color="#333" />
          </LoadingContainer>
        }

        {
          menuComponent === 1 && !loadingFormattedLeads &&
          <Submissions />
        }
      </ContentPageContainer>
    </LeadsContext.Provider>
  )
}

export default LeadsResults;