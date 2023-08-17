import { useState } from "react";
import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { scheduleMenu } from "../../data/menus";
import SchedulesList from "./SchedulesList";
import { useNavigate } from "react-router-dom";

function Schedules() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={scheduleMenu}
          name={'Agendas'} setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
          button={() => navigate('/add-schedule/usadhau2323')}
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