/* eslint-disable react/prop-types */
import KanbanLeadsCard from "../KanbanLeadsCards";
import { Container } from "./styles";
import Tooltip from '@mui/material/Tooltip';
import { useDrop } from "react-dnd";
import KanbanContext from "../../contexts/kanbanContext";
import { useContext } from "react";
import LeadsContext from "../../pages/leads/leadsResults/context";

function LeadsList({ data, listIndex }) {

  const { moveCardToEmptyList, leadsList } = useContext(KanbanContext);
  const { saveLeadsList } = useContext(LeadsContext);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop() {
      saveLeadsList();
    },
    hover(item) {
      const draggedIndex = item.cardIndex;
      const draggedList = item.listIndex;
      const targetListIndex = listIndex;
      const draggedListId = item.listId;
      const listId = data.id;
      const draggedID = item.cardID;

      if (draggedList === targetListIndex && draggedListId === listId) {
        return;
      }

      const list = leadsList[targetListIndex];
      const cardsOfList = [...list.cards];

      if (cardsOfList.length > 0) {
        return;
      }

      moveCardToEmptyList(draggedIndex, draggedList, targetListIndex, draggedID, data.title);

      item.listIndex = targetListIndex;
    }
  })


  return (
    <Container ref={dropRef}>
      <header>
        <Tooltip title={data.title}>
          <h2>{data.title}</h2>
        </Tooltip>
      </header>

      <div>
        {data.cards.map((card, index) =>
          <KanbanLeadsCard
            key={index}
            data={card}
            cardIndex={index}
            listIndex={listIndex}
            listId={data.id}
            listName={data.title}
          />)
        }
      </div>
    </Container>
  )
}

export default LeadsList;