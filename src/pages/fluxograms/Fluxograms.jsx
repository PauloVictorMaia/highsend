/* eslint-disable react-hooks/exhaustive-deps */
import { Container, FluxogramCard, NewFluxogramCard } from "./Fluxograms.style";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import api from '../../api'
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { flowMenu } from "../../data/menus";
import CustomPageHeader from "../../components/CustomPageHeader";

function Fluxograms() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [flows, setFlows] = useState([])

  const createFlow = async () => {
    try {
      const response = await api.post(`/flows/create-flow/${user.id}`);
      if (response.status === 201) {
        navigate(`/fluxograms/edit/${response.data.id}`)
      }
    } catch (error) {
      console.log('Erro ao criar novo flow', error);
    }
  }

  const getFlows = async () => {
    try {
      const response = await api.get(`/flows/get-flows/${user.id}`);
      setFlows(response.data)
    } catch (error) {
      console.log('Erro ao carregar flows', error)
    }
  }

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getFlows()
    }
  }, [user])

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

        <NewFluxogramCard onClick={createFlow}>
          <AddIcon style={{ fontSize: "2.2rem" }} />
          <span>Create fluxogram</span>
        </NewFluxogramCard>

        {
          flows &&
          flows.map((flow, index) => (
            <FluxogramCard key={index} onClick={() => navigate(`/fluxograms/edit/${flow.id}`)}>
              <span>{flow.name}</span>
            </FluxogramCard>
          ))
        }

      </Container>

    </ContentPageContainer>
  )
}

export default Fluxograms;