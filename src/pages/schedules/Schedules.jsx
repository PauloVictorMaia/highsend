import { useState } from "react";
import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { scheduleMenu } from "../../data/menus";
import SchedulesList from "./SchedulesList";
import { useStateContext } from "../../contexts/ContextProvider";
import EventsList from "./EventsList";
import CustomSchedule from "./CustomSchedule";

function Schedules() {

  const [menuComponent, setMenuComponent] = useState(0);
  const { createCalendar, createCalendarIsLoading } = useStateContext();

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={scheduleMenu}
          name={'Agendas'}
          menuComponent={menuComponent}
          setMenuComponent={setMenuComponent}
          buttonName={'Criar Agenda'}
          button={() => createCalendar()}
          isLoading={createCalendarIsLoading}
        />
      }
    >
      {menuComponent == 0 &&
        <SchedulesList />
      }
      {menuComponent == 1 &&
        <EventsList />
      }
      {menuComponent == 2 &&
        <CustomSchedule />
      }
    </ContentPageContainer>
  )
}

export default Schedules;