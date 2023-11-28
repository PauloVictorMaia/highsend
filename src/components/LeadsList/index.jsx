/* eslint-disable react/prop-types */
import KanbanLeadsCard from "../KanbanLeadsCards";
import { Container } from "./styles";
import Tooltip from '@mui/material/Tooltip';

function LeadsList({ data }) {
  return (
    <Container>
      <header>
        <Tooltip title={data.title}>
          <h2>{data.title}</h2>
        </Tooltip>
      </header>

      <div>
        {data.cards.map(card => <KanbanLeadsCard key={card.id} data={card} />)}
      </div>
    </Container>
  )
}

export default LeadsList;