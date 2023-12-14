import { useState } from "react";
import { leadsMenu } from "../../data/menus";
import ContentPageContainer from "../../containers/ContentPageContainer";
import CustomPageHeader from "../../components/CustomPageHeader";
import { Container } from "./Leads.style";
import LeadCard from "../../components/LeadCard";
import { useStateContext } from "../../contexts/ContextProvider";

function Leads() {

  const [menuComponent, setMenuComponent] = useState(0);
  const { flows, leadsDataLoaded, openMenu } = useStateContext();

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
      <Container openmenu={openMenu}>
        {
          flows && flows.length > 0 ? (
            flows.map((flow, index) => (
              <LeadCard
                key={index}
                name={flow.name}
                flowID={flow.id}
                flowType={flow.type}
              />
            ))
          )
            :
            (
              leadsDataLoaded && <span>Você ainda não possui leads.</span>
            )
        }
      </Container>
    </ContentPageContainer>
  )
}

export default Leads;