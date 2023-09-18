import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

function LeadCard({ name, flowID }) {

  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/dashboard/leads/${flowID}`)}>
      {name}
    </Container>
  )
}

export default LeadCard;