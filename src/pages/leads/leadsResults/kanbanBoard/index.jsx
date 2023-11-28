import LeadsContext from "../context";
import { useContext } from "react";
import { AddColumnButton, Board, ButtonContainer, Container } from "./styles";
import LeadsList from "../../../../components/LeadsList";
import AddIcon from '@mui/icons-material/Add';

function KanbanBoard() {

  const { leadsList, setLeadsList } = useContext(LeadsContext);

  function createNewColumn() {
    const newList = {
      id: "123",
      title: "Nova coluna",
      cards: []
    }

    setLeadsList(lists => [...lists, newList])
  }

  return (
    <Board>
      <Container>
        {leadsList.map(list => <LeadsList key={list.id} data={list} />)}
        <ButtonContainer>
          <AddColumnButton onClick={() => createNewColumn()}>
            <AddIcon />
          </AddColumnButton>
        </ButtonContainer>
      </Container>
    </Board>
  )
}

export default KanbanBoard;