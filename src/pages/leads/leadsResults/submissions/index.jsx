/* eslint-disable react-hooks/exhaustive-deps */
import { Container, StyledTable, Options, MainContainer, ExportButton, PaginationContainer, FilterButton, FilterButtonWrapper, FilterMenu, FilterInput, FilterLeadsButton } from "./styles";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import * as XLSX from 'xlsx';
import { useEffect, useState, useRef, useContext } from "react";
import LeadsContext from "../context";
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import api from "../../../../api";
import { Ring } from "@uiball/loaders";
import FilterListIcon from '@mui/icons-material/FilterList';

function Submissions() {

  const { leads, setLeads, page, setPage, totalPages, setTotalPages, getLeads, variables, loaded, filterVariable, setFilterVariable, filterValue, setFilterValue } = useContext(LeadsContext);
  const params = useParams();
  const token = localStorage.getItem('token');
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [exportOption, setExportOption] = useState("currentPage");
  const [exportJsonIsLoading, setExportJsonIsLoading] = useState(false);
  const [exportCsvIsLoading, setExportCsvIsLoading] = useState(false);
  const [exportXslxIsLoading, setExportXslxIsLoading] = useState(false);
  const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false);
  const filterPlaceholder = "Variável a ser filtrada";
  const [leadsIsLoading, setLeadsIsLoading] = useState(false);
  const [filterLeadsIsLoading, setFilterLeadsIsLoading] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    getLeads();
  }, [page]);

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

  const exportToJson = async () => {
    try {
      setExportJsonIsLoading(true);
      let leadsData = leads;

      if (exportOption === "allResults") {
        try {
          const response = await api.get(`/leads/get-all-leads/${params.flowId}?variable=${filterVariable}&value=${filterValue}`,
            { headers: { authorization: token } });
          if (response.status === 200) {
            leadsData = response.data.leads;
          }
        } catch (error) {
          if (error.response.status === 405) {
            toast.warning(error.response.data.message);
            setExportJsonIsLoading(false);
            return;
          }
          toast.error("Erro ao exportar arquivo.");
          setExportJsonIsLoading(false);
          return;
        }
      }

      const data = {
        leadsData
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
      setExportJsonIsLoading(false);
    } catch {
      toast.error("Erro ao exportar para JSON");
      setExportJsonIsLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setExportCsvIsLoading(true);
      let leadsData = leads;

      if (exportOption === "allResults") {
        try {
          const response = await api.get(`/leads/get-all-leads/${params.flowId}?variable=${filterVariable}&value=${filterValue}`,
            { headers: { authorization: token } });
          if (response.status === 200) {
            leadsData = response.data.leads;
          }
        } catch (error) {
          if (error.response.status === 405) {
            toast.warning(error.response.data.message);
            setExportCsvIsLoading(false);
            return;
          }
          toast.error("Erro ao exportar arquivo.");
          setExportCsvIsLoading(false);
          return;
        }
      }
      const csvData = [];
      const headers = ["Status", "Enviado em", ...variables.map(variable => variable.name)];
      csvData.push(headers.join(","));

      leadsData.forEach(lead => {
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
      setExportCsvIsLoading(false);
    } catch {
      toast.error("Erro ao exportar para CSV");
      setExportCsvIsLoading(false);
    }
  };

  const exportToXLSX = async () => {
    try {
      setExportXslxIsLoading(true);
      let leadsData = leads;

      if (exportOption === "allResults") {
        try {
          const response = await api.get(`/leads/get-all-leads/${params.flowId}?variable=${filterVariable}&value=${filterValue}`,
            { headers: { authorization: token } });
          if (response.status === 200) {
            leadsData = response.data.leads;
          }
        } catch (error) {
          if (error.response.status === 405) {
            toast.warning(error.response.data.message);
            setExportXslxIsLoading(false);
            return;
          }
          toast.error("Erro ao exportar arquivo.");
          setExportXslxIsLoading(false);
          return;
        }
      }

      const worksheet = XLSX.utils.json_to_sheet(leadsData.map(lead => {
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
      setExportXslxIsLoading(false);
    } catch {
      toast.error("Erro ao exportar para JSON");
      setExportXslxIsLoading(false);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filterLeads = async () => {
    if (!filterVariable) {
      toast.warning("Escolha uma variável para ser filtrada");
      return;
    }
    if (!filterValue || filterValue.trim().length === 0) {
      toast.warning("Digite um valor a ser filtrado");
      return;
    }
    try {
      setFilterLeadsIsLoading(true);
      const response = await api.get(`/leads/get-leads/${params.flowId}?page=1&variable=${filterVariable}&value=${filterValue}`,
        { headers: { authorization: token } });
      if (response.status === 200) {
        setLeads(response.data.leads);
        setPage(1);
        setTotalPages(response.data.totalPages);
        setFilterLeadsIsLoading(false);
        setFilterMenuIsOpen(false);
      }

    } catch (error) {
      if (error.response.status === 405) {
        toast.warning(error.response.data.message);
        setFilterLeadsIsLoading(false)
        return;
      }
      toast.error('Erro ao filtrar leads. Tente novamente.');
      setFilterLeadsIsLoading(false);
    }
  }

  const removeFilter = async () => {
    try {
      setLeadsIsLoading(true);
      setFilterValue("");
      setFilterVariable("");
      const response = await api.get(`/leads/get-leads/${params.flowId}?page=${page}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setLeads(response.data.leads);
        setTotalPages(response.data.totalPages);
        setLeadsIsLoading(false);
        setFilterMenuIsOpen(false);
      }
    } catch {
      toast.error('Erro. Tente novamente.');
      setLeadsIsLoading(false);
    }
  }

  return (
    <MainContainer>

      <Options>
        <ExportButton
          onClick={() => exportToJson()}
          disabled={leads && leads.length < 1}
        >
          {exportJsonIsLoading ? <Ring size={20} color="#fff" /> : "Exportar para JSON"}
        </ExportButton>

        <ExportButton
          onClick={() => exportToCSV()}
          disabled={leads && leads.length < 1}
        >
          {exportCsvIsLoading ? <Ring size={20} color="#fff" /> : "Exportar para CSV"}
        </ExportButton>

        <ExportButton
          onClick={() => exportToXLSX()}
          disabled={leads && leads.length < 1}
        >
          {exportXslxIsLoading ? <Ring size={20} color="#fff" /> : "Exportar para XSLX"}
        </ExportButton>

        <Select
          IconComponent={KeyboardArrowDownIcon}
          size="small"
          value={exportOption}
          onChange={(e) => setExportOption(e.target.value)}
          style={{ borderRadius: "8px" }}
          sx={{
            '.MuiSvgIcon-root ': {
              fill: "#4339F2 !important",
            }
          }}
        >
          <MenuItem value={"currentPage"}>Página atual</MenuItem>
          <MenuItem value={"allResults"}>Todos os resultados</MenuItem>
        </Select>

        <FilterButton onClick={() => setFilterMenuIsOpen(true)}>
          <FilterListIcon />
          <FilterMenu
            ref={menuRef}
            isvisible={filterMenuIsOpen}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Select
              IconComponent={KeyboardArrowDownIcon}
              size="small"
              value={filterVariable}
              onChange={(e) => setFilterVariable(e.target.value)}
              style={{ width: "100%", border: "2px solid #E0EAFF" }}
              sx={{
                '& .MuiSelect-select .notranslate::after': filterPlaceholder
                  ? {
                    content: `"${filterPlaceholder}"`,
                    opacity: 0.72,
                  }
                  : {},

                '.MuiSvgIcon-root ': {
                  fill: "#4339F2 !important",
                }
              }}
            >
              {variables &&
                variables.map((variable, index) => (
                  <MenuItem key={index} value={variable.name}>{variable.name}</MenuItem>
                ))
              }
            </Select>

            <FilterInput
              ref={inputRef}
              label="Valor a ser filtrado"
              variant="outlined"
              type={"text"}
              name="filter"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  filterLeads();
                }
              }}
              autoFocus
            />

            <FilterLeadsButton background="#4339F2" onClick={() => filterLeads()}>
              {filterLeadsIsLoading ? <Ring size={20} color="#fff" /> : "Filtrar"}
            </FilterLeadsButton>

            <FilterLeadsButton background="#ff4d4d" onClick={() => removeFilter()}>
              {leadsIsLoading ? <Ring size={20} color="#fff" /> : "Remover filtro"}
            </FilterLeadsButton>

          </FilterMenu>
        </FilterButton>

        <FilterButtonWrapper
          isvisible={filterMenuIsOpen}
          onClick={() => setFilterMenuIsOpen(false)}
        />
      </Options>

      <Container ref={containerRef}>
        <StyledTable>
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

      <PaginationContainer>
        <Pagination
          page={page}
          count={totalPages}
          color="primary"
          onChange={handleChange}
        />
      </PaginationContainer>
    </MainContainer>
  )
}

export default Submissions;