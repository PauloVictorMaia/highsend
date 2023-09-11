/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import CustomPageHeader from "../../../components/CustomPageHeader";
import EventCard from "../../../components/EventCard";
import EventDate from "../../../components/EventDate";
import { eventsListMenu } from "../../../data/menus";
import { Calendars, Container, EndList, MenuContainer } from "./styles";
import { useState, useEffect } from "react";
import api from '../../../api';
import { useStateContext } from "../../../contexts/ContextProvider";
import { Calendar } from "react-date-range";
import ptBR from "date-fns/locale/pt-BR";

function EventsList() {

  const token = localStorage.getItem('token');
  const { user } = useStateContext();
  const [menuComponent, setMenuComponent] = useState(0);
  const [allNextEvents, setAllNextEvents] = useState([]);
  const [allNextDates, setAllNextDates] = useState([]);
  const [allPreviousEvents, setAllPreviousEvents] = useState([]);
  const [allPreviousDates, setAllPreviousDates] = useState([]);
  const allEvents = [...allPreviousEvents, ...allNextEvents];
  const allDates = [...allPreviousDates, ...allNextDates];
  const [dataLoaded, setDataLoaded] = useState(false);
  const currentDate = new Date();
  const endDateNumber = new Date(currentDate);
  endDateNumber.setDate(currentDate.getDate() + 30);
  currentDate.setHours(0, 0, 0, 0);
  endDateNumber.setHours(0, 0, 0, 0);
  const formattedStartDate = currentDate.toISOString();
  const formattedEndDate = endDateNumber.toISOString();
  const [startDate, setStartDate] = useState(new Date(formattedStartDate));
  const [endDate, setEndDate] = useState(new Date(formattedEndDate));
  const [openCalendars, setOpenCalendars] = useState(true);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getAllEventsSortedAndFiltered();
    }
  }, [user]);

  async function getAllEventsSortedAndFiltered() {
    try {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
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
                      calendarTitle={event.calendarTitle}
                      local={event.local}
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
                      calendarTitle={event.calendarTitle}
                      local={event.local}
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

      {
        menuComponent === 2 && allEvents.length > 0 ? (
          <>
            <Calendars isvisible={openCalendars}>
              {openCalendars ?
                <>
                  <div style={{ display: "flex", columnGap: "20px" }}>
                    <Calendar
                      date={startDate}
                      onChange={(date) => setStartDate(new Date(date))}
                      locale={ptBR}
                      style={{ minHeight: 270, boxShadow: "5px 8px 10px 4px rgba(0,0,0,0.35)" }}
                    />
                    <Calendar
                      date={endDate}
                      onChange={(date) => setEndDate(new Date(date))}
                      locale={ptBR}
                      style={{ minHeight: 270, boxShadow: "5px 8px 10px 4px rgba(0,0,0,0.35)" }}
                    />
                  </div>
                  <button onClick={() => setOpenCalendars(false)}>Aplicar</button>
                </>
                :
                <button onClick={() => setOpenCalendars(true)}>filtrar</button>
              }
            </Calendars>
            <div>
              {
                allEvents.some(event => {
                  const eventDate = new Date(event.day);
                  return eventDate >= startDate && eventDate <= endDate;
                }) ? (
                  allDates.map((date, index) => {
                    const eventsForDate = allEvents.filter(event => {
                      const eventDate = new Date(event.day);
                      return eventDate >= startDate && eventDate <= endDate && event.day === date;
                    });

                    if (eventsForDate.length > 0) {
                      return (
                        <div key={index}>
                          <EventDate date={date} />
                          {eventsForDate.map((event, eventIndex) => (
                            <EventCard
                              key={eventIndex}
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
                              calendarTitle={event.calendarTitle}
                              local={event.local}
                            />
                          ))}
                        </div>
                      );
                    }

                    return null;
                  })
                ) : (
                  <div>
                    <span>Não há eventos agendados no período escolhido.</span>
                  </div>
                )
              }
              {allEvents.some(event => {
                const eventDate = new Date(event.day);
                return eventDate >= startDate && eventDate <= endDate;
              }) && (
                  <EndList>
                    <span>Você chegou ao fim da lista.</span>
                  </EndList>
                )}
            </div>
          </>
        )
          :
          menuComponent === 2 && dataLoaded && <span>Você não possui eventos agendados.</span>
      }
    </Container>
  )
}

export default EventsList; 