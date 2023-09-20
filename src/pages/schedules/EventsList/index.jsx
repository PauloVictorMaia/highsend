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
  const [datesInRange, setDatesInRange] = useState([]);
  const [eventsInRange, setEventsInRange] = useState([]);
  const [eventsInRangeLoaded, setEventsInRangeLoaded] = useState(false);

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

  async function getEventsInRange() {
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const differenceInMilliseconds = endDateObj - startDateObj;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    if (startDateObj > endDateObj) {
      toast.warning("A data de início não pode ser posterior à data de término da busca. Verifique os dados e tente novamente.");
      return;
    }

    if (differenceInDays > 90) {
      toast.warning("O intervalo de busca não pode ser superior a 90 dias");
      return;
    }

    try {
      const response = await api.get(`/calendars/get-all-events-in-range/${user.id}/${formattedStartDate}/${formattedEndDate}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setEventsInRange(response.data.eventsInRange);
        setDatesInRange(response.data.datesInRange);
        setEventsInRangeLoaded(true);
        setOpenCalendars(false);
      }
    } catch {
      toast.error('Erro ao buscar eventos.');
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
        menuComponent === 2 &&
        <>
          <Calendars isvisible={openCalendars}>
            {openCalendars ?
              <>
                <div style={{ display: "flex", columnGap: "20px" }}>
                  <Calendar
                    date={startDate}
                    onChange={(date) => setStartDate(new Date(date))}
                    locale={ptBR}
                    style={{ minHeight: 200, boxShadow: "5px 8px 10px 4px rgba(0,0,0,0.35)" }}
                  />
                  <Calendar
                    date={endDate}
                    onChange={(date) => setEndDate(new Date(date))}
                    locale={ptBR}
                    style={{ minHeight: 200, boxShadow: "5px 8px 10px 4px rgba(0,0,0,0.35)" }}
                  />
                </div>
                <button onClick={() => getEventsInRange()}>Aplicar</button>
              </>
              :
              <button onClick={() => setOpenCalendars(true)}>filtrar</button>
            }
          </Calendars>
        </>
      }

      {
        menuComponent === 2 && eventsInRangeLoaded && eventsInRange.length > 0 ? (
          <div>
            {datesInRange.map((date, index) => (
              <div key={index}>
                <EventDate date={date} />
                {eventsInRange
                  .filter(event => event.day === date)
                  .map((event, eventIndex) => (
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
          eventsInRangeLoaded && <span>Não há eventos agendados nesse período.</span>
      }
    </Container>
  )
}

export default EventsList; 