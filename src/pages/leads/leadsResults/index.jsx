import { useEffect, useState, useRef } from "react";
import { leadsResultsMenu } from "../../../data/menus";
import ContentPageContainer from "../../../containers/ContentPageContainer";
import CustomPageHeader from "../../../components/CustomPageHeader";
import { Container, LeadStatus, LeadStatusContainer, StyledTable, DropMenuCard, MenuCardButtons, StatusColor, Options, MainContainer, ExportButton } from "./styles";
import api from "../../../api";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Ring } from "@uiball/loaders";
import * as XLSX from 'xlsx';

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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLeadStatus = async (value) => {
    if (!currentLeadID) return;

    try {
      setIsLoading(true);
      const response = await api.patch(`/leads/edit-status-lead/${params.flowId}/${currentLeadID}`, { value }, { headers: { authorization: token } });
      if (response.status === 200) {
        setIndexDrop(null);
        getLeads();
        getVariables();
        setIsLoading(false);
      }
    } catch {
      toast.error("Erro ao alterar status do lead. Tente novamente.");
      setIsLoading(false);
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

  const exportToJson = () => {
    try {
      const data = {
        leads
      }
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hiflow_leads_${params.flowName}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Erro ao exportar para JSON");
    }
  };

  const exportToCSV = () => {
    try {
      const csvData = [];
      const headers = ["Status", "Enviado em", ...variables.map(variable => variable.name)];
      csvData.push(headers.join(","));

      leads.forEach(lead => {
        const leadRow = [
          lead.status,
          format(new Date(lead.createdAt), "dd 'de' MMMM 'de' yyyy, 'as' HH:mm", { locale: ptBR }),
          ...variables.map(variable => lead.variables.find(v => v.name === variable.name)?.value || "")
        ];
        csvData.push(leadRow.join(","));
      });

      const csvContent = csvData.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `hiflow_leads_${params.flowName}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      toast.error("Erro ao exportar para CSV");
    }
  };

  const exportToXLSX = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(leads.map(lead => {
        const formattedDate = format(new Date(lead.createdAt), "dd 'de' MMMM 'de' yyyy, às HH:mm", { locale: ptBR });
        const leadData = {
          Status: lead.status,
          'Enviado em': formattedDate
        };

        variables.forEach(variable => {
          leadData[variable.name] = lead.variables.find(v => v.name === variable.name)?.value || '';
        });

        return leadData;
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
      XLSX.writeFile(workbook, `hiflow_leads_${params.flowName}.xlsx`);
    } catch {
      toast.error("Erro ao exportar para JSON");
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
      {
        loaded && leads.length > 0 ? (
          <MainContainer>

            <Options>
              <ExportButton
                onClick={() => exportToJson()}
                disabled={leads && leads.length < 1}
              >
                Exportar para JSON
              </ExportButton>

              <ExportButton
                onClick={() => exportToCSV()}
                disabled={leads && leads.length < 1}
              >
                Exportar para CSV
              </ExportButton>

              <ExportButton
                onClick={() => exportToXLSX()}
                disabled={leads && leads.length < 1}
              >
                Exportar para XSLX
              </ExportButton>
            </Options>

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

                                {
                                  isLoading ?
                                    <Ring color="#333" size={50} />
                                    :
                                    <>
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
                                    </>
                                }

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
          </MainContainer>
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