import { Cards, Container, Content, HeaderContainer, NewFluxogramCard } from "./Fluxograms.style";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function Fluxograms() {

  const navigate = useNavigate()

  return (
    <Container>
      <HeaderContainer>
        <HomeIcon onClick={() => navigate('/')} />
      </HeaderContainer>
      <Content>
        <Cards>

          <NewFluxogramCard onClick={() => navigate('/fluxograms/create')}>
            <AddIcon style={{ fontSize: "2.2rem" }} />
            <span>Create fluxogram</span>
          </NewFluxogramCard>

        </Cards>
      </Content>
    </Container>
  )
}

export default Fluxograms;