import { Container, StyledTable, Options, MainContainer, ExportButton } from "./styles";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import * as XLSX from 'xlsx';
import { useEffect, useState, useRef, useContext } from "react";
import LeadsContext from "../context";

function Submissions() {

  const { leads, variables, loaded } = useContext(LeadsContext);
  const params = useParams();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    </MainContainer>
  )
}

export default Submissions;