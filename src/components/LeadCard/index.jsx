import { Container, Banner, CardTitle } from "./styles";
import { useNavigate } from "react-router-dom";
import LeadImage from '../../assets/leadimage.png';
import { Tooltip } from "@mui/material";



function LeadCard({ name, flowID }) {

  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/dashboard/leads/${name}/${flowID}`)}>
      <Banner src={LeadImage} />
      <div>
        <Tooltip title={name}>
          <CardTitle>{name}</CardTitle>
        </Tooltip>
        <span className="text">Flow de Bot</span>
      </div>
    </Container>
  )
}

export default LeadCard;