import { Container, DescriptionContainer, IconContainer, ImgContainer, IntegrationImg } from "./styles";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

function IntegrationCard({ img, description, integrationFunction, padding, title }) {
  return (
    <Container onClick={() => integrationFunction()}>
      <span>{title}</span>
      <DescriptionContainer>{description}</DescriptionContainer>
      <ImgContainer padding={padding}>
        <IntegrationImg src={img} alt="Imagem" />
      </ImgContainer>
      <IconContainer>
        <AddCircleOutlineRoundedIcon />
      </IconContainer>
    </Container>
  )
}

export default IntegrationCard;