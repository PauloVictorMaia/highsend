import LeadsContext from "../context";
import { useContext } from "react";

function KanbanBoard() {

  const { leadsList } = useContext(LeadsContext);

  return (
    <div>KanbanBoard</div>
  )
}

export default KanbanBoard;