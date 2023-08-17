/* eslint-disable react-hooks/exhaustive-deps */
import { Cards, Container, Content, FluxogramCard, NewFluxogramCard } from "./Fluxograms.style";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import api from '../../api'
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function Fluxograms() {

  const [flows, setFlows] = useState([]);
  const params = useParams();
  const { createFlow } = useStateContext();
  const navigate = useNavigate();

  async function getFlows() {
    try {
      const response = await api.get(`/flows/get-flows/${params.userid}`);
      setFlows(response.data)
    } catch (error) {
      console.log('erro ao carregar flows')
    }
  }

  useEffect(() => {
    getFlows()
  }, [])

  return (
    <Container>
      <Content>
        <Cards>

          <NewFluxogramCard onClick={() => createFlow(params.userid)}>
            <AddIcon style={{ fontSize: "2.2rem" }} />
            <span>Create fluxogram</span>
          </NewFluxogramCard>

          {
            flows &&
            flows.map((flow, index) => (
              <FluxogramCard key={index} onClick={() => navigate(`/fluxograms/edit/${params.userid}/${flow.id}`)}>
                <span>{flow.name}</span>
              </FluxogramCard>
            ))
          }

        </Cards>
      </Content>
    </Container>
  )
}

export default Fluxograms;