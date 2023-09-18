import { useEffect, useState } from "react";
import { leadsMenu } from "../../data/menus";
import ContentPageContainer from "../../containers/ContentPageContainer";
import CustomPageHeader from "../../components/CustomPageHeader";
import { Container } from "./Leads.style";
import LeadCard from "../../components/LeadCard";
import api from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";
import { toast } from "react-toastify";

function Leads() {

  const [flows, setFlows] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [menuComponent, setMenuComponent] = useState(0);
  const token = localStorage.getItem('token');
  const { user } = useStateContext();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getFlows();
    }
  }, [user]);

  const getFlows = async () => {
    try {
      const response = await api.get(`/flows/get-flows/${user.id}`, { headers: { authorization: token } });
      setFlows(response.data);
      setDataLoaded(true);
    } catch {
      toast.error('Erro ao carregar flows.');
    }
  };

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={leadsMenu}
          name={'Leads'}
          setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
        />
      }
    >
      <Container>
        {
          dataLoaded && flows.length > 0 ? (
            flows.map((flow, index) => (
              <LeadCard
                key={index}
                name={flow.name}
                flowID={flow.id}
              />
            ))
          )
            :
            (
              dataLoaded && <span>Você ainda não possui leads.</span>
            )
        }
      </Container>
    </ContentPageContainer>
  )
}

export default Leads;