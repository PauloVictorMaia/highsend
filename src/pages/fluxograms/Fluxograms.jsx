import { Cards, Container, Content, NewFluxogramCard } from "./Fluxograms.style";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

function Fluxograms() {

  const navigate = useNavigate()

  const { openMenu } = useStateContext()

  return (
    <Container>
      <Content openmenu={openMenu ? "true" : "false"} >
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