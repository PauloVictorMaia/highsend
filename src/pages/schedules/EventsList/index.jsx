/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import CustomPageHeader from "../../../components/CustomPageHeader";
import EventCard from "../../../components/EventCard";
import EventDate from "../../../components/EventDate";
import { eventsListMenu } from "../../../data/menus";
import { Container, EndList, MenuContainer } from "./styles";
import { useState, useEffect } from "react";
import api from '../../../api';
import { useStateContext } from "../../../contexts/ContextProvider";

function EventsList() {

  const token = localStorage.getItem('token');
  const { user } = useStateContext();
  const [menuComponent, setMenuComponent] = useState(0);
  const [allNextEvents, setAllNextEvents] = useState([]);
  const [allNextDates, setAllNextDates] = useState([]);
  const [allPreviousEvents, setAllPreviousEvents] = useState([]);
  const [allPreviousDates, setAllPreviousDates] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getAllEventsSortedAndFiltered();
    }
  }, [user]);

  async function getAllEventsSortedAndFiltered() {
    try {
      const date = new Date();
      const currentDate = date.toISOString();
      const response = await api.get(`/calendars/get-all-events-filtered/${user.id}/${currentDate}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setAllNextEvents(response.data.filteredAndSortedEvents);
        setAllNextDates(response.data.uniqueDates);
        setAllPreviousEvents(response.data.filteredAndSortedEventsPrevious);
        setAllPreviousDates(response.data.uniqueDatesPrevious);
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
        getAllEventsSortedAndFiltered();
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
      {
        menuComponent === 0 && allNextEvents.length > 0 ? (
          <div>
            {allNextDates.map((date, index) => (
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
                      calendarTitle={event.calendarTitle || "Sessão estratégica com Rodrigo Serrasqueiro"}
                    />
                  ))
                }
              </div>
            ))}
            <EndList>
              <span>Você chegou ao fim da lista.</span>
            </EndList>
          </div>
        )
          :
          menuComponent === 0 && dataLoaded && <span>Você não possui eventos agendados.</span>
      }

      {
        menuComponent === 1 && allPreviousEvents.length > 0 ? (
          <div>
            {allPreviousDates.map((date, index) => (
              <div key={index}>
                <EventDate date={date} />
                {allPreviousEvents
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
                      calendarTitle={event.calendarTitle || "Sessão estratégica com Rodrigo Serrasqueiro"}
                    />
                  ))
                }
              </div>
            ))}
            <EndList>
              <span>Você chegou ao fim da lista.</span>
            </EndList>
          </div>
        )
          :
          menuComponent === 1 && dataLoaded && <span>Você não possui eventos anteriores.</span>
      }

      {menuComponent === 2 &&
        <div>período</div>
      }
    </Container>
  )
}

export default EventsList;