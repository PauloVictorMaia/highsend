import { Container, DescriptionContainer, IconContainer, ImgContainer, IntegrationImg } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

function UserIntegrationCard({ img, description, id }) {

  const navigate = useNavigate();

  return (
    <Container>
      <ImgContainer>
        <IntegrationImg src={img} alt="Imagem" />
      </ImgContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <IconContainer>
        <EditIcon onClick={() => navigate(`/dashboard/integrations/google-integration/edit/${id}`)} />
        <DeleteIcon />
      </IconContainer>
    </Container>
  )
}

export default UserIntegrationCard;