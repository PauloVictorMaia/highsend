/* eslint-disable react/prop-types */
import { Container } from "./styles";
import Tooltip from '@mui/material/Tooltip';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, useContext } from "react";
import KanbanContext from "../../contexts/kanbanContext";
import LeadsContext from "../../pages/leads/leadsResults/context";

function KanbanLeadsCard({ data, listIndex, cardIndex, listId }) {

  const ref = useRef();
  const { moveCard } = useContext(KanbanContext);
  const { saveLeadsList } = useContext(LeadsContext);

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

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { cardIndex, listIndex, listId },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop() {
      saveLeadsList();
    },
    hover(item, monitor) {
      const draggedIndex = item.cardIndex;
      const targetIndex = cardIndex;
      const draggedList = item.listIndex;
      const targetListIndex = listIndex;

      if (draggedIndex === targetIndex && draggedList === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      moveCard(draggedIndex, targetIndex, draggedList, targetListIndex);

      item.cardIndex = targetIndex;
      item.listIndex = targetListIndex;

    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isdragging={isDragging} isOver={isOver}>
      <span>
        <Tooltip title={getTitleFromVariables(data.variables)}>
          {getTitleFromVariables(data.variables)}
        </Tooltip>
      </span>
    </Container>
  )
}

export default KanbanLeadsCard;