import { useEffect, useState, useRef } from "react";
import { leadsResultsMenu } from "../../../data/menus";
import ContentPageContainer from "../../../containers/ContentPageContainer";
import CustomPageHeader from "../../../components/CustomPageHeader";
import { Container, LeadStatus, LeadStatusContainer, StyledTable, DropMenuCard, MenuCardButtons, StatusColor } from "./styles";
import api from "../../../api";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import MoreVertIcon from '@mui/icons-material/MoreVert';

function LeadsResults() {

  const [leads, setLeads] = useState([]);
  const [variables, setVariables] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [menuComponent, setMenuComponent] = useState(0);
  const { user } = useStateContext();
  const params = useParams();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentLeadID, setCurrentLeadID] = useState(null);
  const [indexDrop, setIndexDrop] = useState(null);
  const menuRef = useRef(null);
  const buttonRefs = useRef([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft, loaded]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getLeads();
      getVariables();
    }
  }, [user]);

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

  const handleLeadStatus = async (value) => {
    if (!currentLeadID) return;

    try {
      const response = await api.patch(`/leads/edit-status-lead/${params.flowId}/${currentLeadID}`, { value }, { headers: { authorization: token } });
      if (response.status === 200) {
        setIndexDrop(null);
        getLeads();
        getVariables();
      }
    } catch {
      toast.error("Erro ao alterar status do lead. Tente novamente.");
    }
  }

  const handleMenuClick = (event, index, leadID) => {
    event.stopPropagation();
    setCurrentLeadID(leadID);
    if (indexDrop !== index) {
      setIndexDrop(index);
    } else {
      setIndexDrop(null);
    }
  };

  const handleClickOutside = event => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRefs.current.some(buttonRef => buttonRef.contains(event.target))
    ) {
      setIndexDrop(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      {
        loaded && leads.length > 0 ? (
          <Container ref={containerRef}>
            <StyledTable>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Enviado em</th>
                  {variables.map((variable) => (
                    <th key={variable.id}>{variable.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={lead.id}>
                    <td>
                      {
                        <LeadStatusContainer>
                          <MoreVertIcon
                            onClick={(event) => handleMenuClick(event, index, lead.id)}
                            ref={ref => (buttonRefs.current[index] = ref)}
                          />
                          <LeadStatus leadcolor={lead.status}>
                            {lead.status}
                          </LeadStatus>

                          {indexDrop === index &&
                            <DropMenuCard ref={menuRef}>

                              <MenuCardButtons onClick={() => handleLeadStatus("Em aberto")}>
                                <StatusColor color={"#ddd"} />
                                <span>Em aberto</span>
                              </MenuCardButtons>

                              <MenuCardButtons onClick={() => handleLeadStatus("Comprou")}>
                                <StatusColor color={"#66ff66"} />
                                <span>Comprou</span>
                              </MenuCardButtons>

                              <MenuCardButtons onClick={() => handleLeadStatus("Não comprou")}>
                                <StatusColor color={"#ff4d4d"} />
                                <span>Não comprou</span>
                              </MenuCardButtons>

                              <MenuCardButtons onClick={() => handleLeadStatus("Não compareceu")}>
                                <StatusColor color={"#ffff66"} />
                                <span>Não compareceu</span>
                              </MenuCardButtons>
                            </DropMenuCard>
                          }
                        </LeadStatusContainer>
                      }
                    </td>
                    <td>
                      {format(new Date(lead.createdAt), "dd 'de' MMMM 'de' yyyy, 'às' HH:mm", { locale: ptBR })}
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
        )
          :
          (
            loaded &&
            <div style={{ padding: "20px" }}>
              <span>Esse flow ainda não possui leads</span>
            </div>
          )
      }
    </ContentPageContainer>
  )
}

export default LeadsResults;