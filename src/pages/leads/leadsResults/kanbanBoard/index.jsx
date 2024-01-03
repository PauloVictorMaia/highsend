import LeadsContext from "../context";
import { useContext } from "react";
import { AddColumnButton, Board, ButtonContainer, Container, NewListButton, NewListContent, NewListInput, NewListInputContainer } from "./styles";
import LeadsList from "../../../../components/LeadsList";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import KanbanContext from "../../../../contexts/kanbanContext";
import { produce } from "immer";
import api from "../../../../api";
import { Ring } from "@uiball/loaders";
import { useParams } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function KanbanBoard() {

  const { leadsList, setLeadsList, updateLeadStatus, changeLeadsStatusInBulk, getFormattedLeads, leads, resultsPerList, setResultsPerList } = useContext(LeadsContext);
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const inputRef = useRef(null);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  async function createNewList() {

    if (!newListName) {
      toast.warning("Defina um nome para a nova lista");
      return;
    }

    const newList = {
      listID: uuidv4(),
      title: newListName,
      cards: []
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/leads/create-new-list/${params.flowId}`, { newList },
        { headers: { authorization: token } });
      if (response.status === 200) {
        setIsLoading(false);
        getFormattedLeads();
        closeInput();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao criar nova lista");
      return;
    }
  }

  function closeInput() {
    setShowNewListInput(false);
    setNewListName("");
  }

  function moveCard(from, to, fromList, toList, cardID, listName) {
    setLeadsList(produce(leadsList, draft => {
      const dragged = draft[fromList].cards[from];
      if (!dragged) {
        return;
      }
      if (fromList !== toList) {
        updateLeadStatus(cardID, listName);
      }
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);

    }));
  }

  async function moveCardInDb(from, to, fromList, toList) {

    try {
      await api.patch(`/leads/move-card/${params.flowId}`, { from, to, fromList, toList },
        { headers: { authorization: token } });
    } catch (error) {
      toast.error("Erro ao mover lead");
      getFormattedLeads();
    }
  }

  function moveCardToEmptyList(cardIndex, fromList, toList, cardID, listName) {
    setLeadsList(produce(leadsList, draft => {
      const dragged = draft[fromList].cards[cardIndex];
      draft[fromList].cards.splice(cardIndex, 1);
      if (!dragged) {
        return;
      }
      if (fromList !== toList) {
        updateLeadStatus(cardID, listName);
      }
      draft[toList].cards.push(dragged);

    }));
  }

  async function moveCardToEmptyListInDb(from, fromList, toList) {
    try {
      await api.patch(`/leads/move-card-to-empty-list/${params.flowId}`, { from, fromList, toList },
        { headers: { authorization: token } });

    } catch (error) {
      toast.error("Erro ao mover lead");
      getFormattedLeads();
    }
  }

  function moveAllCardsToList(originListIndex, targetListIndex) {
    setLeadsList(
      produce(leadsList, (draft) => {
        if (
          originListIndex < 0 ||
          originListIndex >= draft.length ||
          targetListIndex < 0 ||
          targetListIndex >= draft.length ||
          originListIndex === targetListIndex
        ) {
          return;
        }
        const movedCardIds = draft[originListIndex].cards.map((card) => card.id);
        const targetListTitle = draft[targetListIndex].title;
        draft[targetListIndex].cards.push(...draft[originListIndex].cards);
        draft[originListIndex].cards = [];

        changeLeadsStatusInBulk(movedCardIds, targetListTitle);

      })
    );
  }

  async function moveAllCardsToListInDb(originListIndex, targetListIndex) {
    try {
      await api.patch(`/leads/move-all-cards-to-list/${params.flowId}`,
        { originListIndex, targetListIndex },
        { headers: { authorization: token } });

    } catch (error) {
      toast.error("Erro ao mover cards para outra lista");
      getFormattedLeads();
    }
  }

  function deleteListAndLeads(listIndex) {
    setLeadsList(produce(leadsList, draft => {
      if (listIndex >= 0 && listIndex < draft.length) {
        draft.splice(listIndex, 1);
      }
    }));
  }

  async function deleteListAndCardsInDb(listIndex) {
    try {
      await api.patch(`/leads/delete-list-and-cards/${params.flowId}`,
        { listIndex },
        { headers: { authorization: token } });
    } catch (error) {
      toast.error("Erro ao deletar lista");
      getFormattedLeads();
    }
  }

  function moveAllCardsAndDeleteList(originListIndex, targetListIndex) {
    setLeadsList(
      produce(leadsList, (draft) => {
        if (
          originListIndex < 0 ||
          originListIndex >= draft.length ||
          targetListIndex < 0 ||
          targetListIndex >= draft.length ||
          originListIndex === targetListIndex
        ) {
          return;
        }

        draft[targetListIndex].cards.push(...draft[originListIndex].cards);
        draft.splice(originListIndex, 1);
      })
    );
  }

  async function moveAllCardsAndDeleteListInDb(originListIndex, targetListIndex) {
    try {
      await api.patch(`/leads/move-all-cards-and-delete-list/${params.flowId}`,
        { originListIndex, targetListIndex },
        { headers: { authorization: token } });
    } catch (error) {
      toast.error("Erro ao mover cards e deletar lista");
      getFormattedLeads();
    }
  }

  function deleteLead(listIndex, cardIndex) {
    setLeadsList(
      produce(leadsList, (draft) => {
        if (
          listIndex >= 0 &&
          listIndex < draft.length &&
          cardIndex >= 0 &&
          cardIndex < draft[listIndex].cards.length
        ) {

          draft[listIndex].cards.splice(cardIndex, 1);
          toast.success("Lead deletado");
        }
      })
    );
  }

  async function deleteCardInDb(listIndex, cardIndex) {
    try {
      await api.patch(`/leads/delete-card/${params.flowId}`,
        { listIndex, cardIndex },
        { headers: { authorization: token } });
    } catch (error) {
      toast.error("Erro ao mover cards e deletar lista");
      getFormattedLeads();
    }
  }

  return (
    <KanbanContext.Provider
      value={{
        moveCard,
        moveCardInDb,
        moveCardToEmptyListInDb,
        leadsList,
        moveCardToEmptyList,
        moveAllCardsToList,
        moveAllCardsToListInDb,
        deleteListAndLeads,
        deleteListAndCardsInDb,
        moveAllCardsAndDeleteList,
        moveAllCardsAndDeleteListInDb,
        deleteLead,
        deleteCardInDb,
        leads
      }}>
      <Board>
        <Select
          IconComponent={KeyboardArrowDownIcon}
          size="small"
          value={resultsPerList}
          onChange={(e) => setResultsPerList(e.target.value)}
          style={{
            border: "2px solid #E0EAFF",
            position: "absolute",
            top: "-50px",
            right: "10vh"
          }}
          sx={{
            '.MuiSvgIcon-root ': {
              fill: "#4339F2 !important",
            }
          }}
        >
          <MenuItem value="30">30 últimos resultados</MenuItem>
          <MenuItem value="60">60 últimos resultados</MenuItem>
          <MenuItem value="100">100 últimos resultados</MenuItem>
          <MenuItem value="500">500 últimos resultados</MenuItem>
        </Select>
        <Container>
          {leadsList.map((list, index) =>
            <LeadsList
              key={list.listID}
              data={list}
              listIndex={index}
            />)
          }

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
                      createNewList();
                    }
                  }}
                  autoFocus
                />
                <NewListButton
                  onClick={() => createNewList()}
                  disabled={isLoading}
                >
                  {isLoading ? <Ring color="#fff" size={25} /> : "Adicionar"}
                </NewListButton>
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
    </KanbanContext.Provider>
  )
}

export default KanbanBoard;