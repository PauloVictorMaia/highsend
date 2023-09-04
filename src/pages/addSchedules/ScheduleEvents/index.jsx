/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useStateContext } from "../../../contexts/ContextProvider";
import api from "../../../api";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Container, MenuContainer } from "./styles";
import CustomPageHeader from "../../../components/CustomPageHeader";
import { eventsListMenu } from "../../../data/menus";
import EventDate from "../../../components/EventDate";
import EventCard from "../../../components/EventCard";

function ScheduleEvents({ calendarID }) {

  const token = localStorage.getItem('token');
  const { user } = useStateContext();
  const [menuComponent, setMenuComponent] = useState(0);
  const [allNextEvents, setAllNextEvents] = useState([]);
  const [allNextDates, setAllNextDates] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getEventsSortedAndFiltered();
    }
  }, [user]);

  async function getEventsSortedAndFiltered() {
    try {
      const date = new Date();
      const currentDate = date.getDate();
      const response = await api.get(`/calendars/get-events-filtered/${user.id}/${calendarID}/${currentDate}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setAllNextEvents(response.data.filteredAndSortedEvents);
        setAllNextDates(response.data.uniqueDates);
        setDataLoaded(true);
      }
    } catch {
      toast.error('Erro ao buscar eventos.');
    }
  }

  const cancelEvent = async (calendarID, eventID) => {
    try {
      const response = await api.delete(`/calendars/cancel-event/${user.id}/${calendarID}/${eventID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Evento cancelado com sucesso!');
        getEventsSortedAndFiltered();
      }
    } catch {
      toast.error('Erro ao cancelar evento.');
    }
  }

  return (
    <Container>
      <MenuContainer>
        <CustomPageHeader
          menu={eventsListMenu}
          menuComponent={menuComponent}
          setMenuComponent={setMenuComponent}
        />
      </MenuContainer>

      {menuComponent === 0 && allNextEvents.length > 0 ?
        allNextDates.map((date, index) => (
          <div key={index}>
            <EventDate date={date} />
            {allNextEvents
              .filter(event => event.day === date)
              .map((event, eventIndex) => (
                <EventCard key={eventIndex}
                  color={event.color}
                  start={event.time.start}
                  end={event.time.end}
                  eventDuration={event.eventDuration}
                  inviteeName={event.name}
                  inviteePhone={event.phone}
                  inviteeEmail={event.email}
                  cancelEvent={cancelEvent}
                  calendarID={event.calendarID}
                  eventID={event.id}
                />
              ))
            }
          </div>
        ))
        :
        menuComponent === 0 && dataLoaded && <span>Você não possui eventos agendados.</span>
      }

      {menuComponent === 1 &&
        <div>anteriores</div>
      }

      {menuComponent === 2 &&
        <div>período</div>
      }
    </Container>
  )
}

export default ScheduleEvents