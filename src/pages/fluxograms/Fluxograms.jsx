import { Cards, Container, Content, NewFluxogramCard } from "./Fluxograms.style";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useStateContext } from "../../contexts/ContextProvider";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { flowMenu } from "../../data/menus";
import CustomPageHeader from "../../components/CustomPageHeader";
import { useState } from "react";
=======
>>>>>>> 97e00af7ced7aa92d8eb658bd7971133da90a1c5

function Fluxograms() {
  const [menuComponent, setMenuComponent] = useState(0);
  const { openMenu } = useStateContext();
  const navigate = useNavigate();


  return (
    <ContentPageContainer 
      header={
        <CustomPageHeader 
          menu={flowMenu} 
          name={'Fluxos de atendimento'} 
          setMenuComponent={setMenuComponent} 
          menuComponent={menuComponent}
        />
      }
    >
      <Container>
        <Content openmenu={openMenu} >
          <Cards>

            <NewFluxogramCard onClick={() => navigate('/fluxograms/create')}>
              <AddIcon style={{ fontSize: "2.2rem" }} />
              <span>Create fluxogram</span>
            </NewFluxogramCard>

          </Cards>
        </Content>
      </Container>
    </ContentPageContainer>
  )
}

export default Fluxograms;