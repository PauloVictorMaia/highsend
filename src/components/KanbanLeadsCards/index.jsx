/* eslint-disable react/prop-types */
import { Container } from "./styles";
import Tooltip from '@mui/material/Tooltip';

function KanbanLeadsCard({ data }) {

  function getTitleFromVariables(variables) {
    const preferredOrder = ["Nome", "Email", "Telefone"];

    for (const preferredName of preferredOrder) {
      const variable = variables.find((v) => v.name === preferredName);

      if (variable && variable.value !== "") {
        return variable.value;
      }
    }

    return "";
  }

  return (
    <Container>
      <span>
        <Tooltip title={getTitleFromVariables(data.variables)}>
          {getTitleFromVariables(data.variables)}
        </Tooltip>
      </span>
    </Container>
  )
}

export default KanbanLeadsCard;