import LeadsContext from "../context";
import { useContext } from "react";
import { AddColumnButton, Board, ButtonContainer, Container, NewListButton, NewListContent, NewListInput, NewListInputContainer } from "./styles";
import LeadsList from "../../../../components/LeadsList";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

function KanbanBoard() {

  const { leadsList, setLeadsList } = useContext(LeadsContext);
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const inputRef = useRef(null);

  function createNewColumn() {

    if (!newListName) {
      toast.warning("Defina um nome para a nova lista");
      return;
    }

    const newList = {
      id: uuidv4(),
      title: newListName,
      cards: []
    }

    setLeadsList(lists => [...lists, newList]);
    closeInput();
  }

  function closeInput() {
    setShowNewListInput(false);
    setNewListName("");
  }

  return (
    <Board>
      <Container>
        {leadsList.map(list => <LeadsList key={list.id} data={list} />)}

        {showNewListInput &&
          <NewListInputContainer>
            <NewListContent>
              <NewListInput
                ref={inputRef}
                label="Nova lista"
                variant="outlined"
                type={"text"}
                name="list"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createNewColumn();
                  }
                }}
                autoFocus
              />
              <NewListButton onClick={() => createNewColumn()}>Adicionar</NewListButton>
            </NewListContent>
          </NewListInputContainer>
        }

        <ButtonContainer>
          <AddColumnButton
            onClick={() => setShowNewListInput(!showNewListInput)}
            background={showNewListInput}
          >
            {showNewListInput ? <ClearIcon /> : <AddIcon />}
          </AddColumnButton>
        </ButtonContainer>
      </Container>
    </Board>
  )
}

export default KanbanBoard;