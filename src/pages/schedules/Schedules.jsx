import { useState } from "react";
import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { scheduleMenu } from "../../data/menus";
import SchedulesList from "./SchedulesList";

function Schedules() {
  const [menuComponent, setMenuComponent] = useState(0);

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={scheduleMenu}
          name={'Agendas'} setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
          button={() => { }}
        />
      }
    >
      {menuComponent == 0 &&
        <SchedulesList />
      }
    </ContentPageContainer>
  )
}

export default Schedules;