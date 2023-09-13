import { Container, DescriptionContainer, IconContainer, ImgContainer, IntegrationImg } from "./styles";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

function IntegrationCard({ img, description, integrationFunction, padding }) {
  return (
    <Container onClick={() => integrationFunction()}>
      <ImgContainer padding={padding}>
        <IntegrationImg src={img} alt="Imagem" />
      </ImgContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <IconContainer>
        <AddCircleOutlineRoundedIcon />
      </IconContainer>
    </Container>
  )
}

export default IntegrationCard;