/* eslint-disable react-hooks/exhaustive-deps */
import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, setHours, setMinutes, addMinutes } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import CheckIcon from '../../assets/check.png';
import {
  CheckboxContainer,
  DaysContainer,
  StyledCheckbox,
  Text,
  Container,
  IntervalsContainer,
  ToggleContainer,
  OptionLabel,
  ContentContainer,
  TitleInput,
  EventItem,
  EnventsContainer,
  EventsContent
} from './styles.js';
import { CalendarMenu } from "../../data/menus";
import { toast } from "react-toastify";
import api from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleEvents from "./ScheduleEvents";
import { SketchPicker } from "react-color";

function AddSchedule() {
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const params = useParams();
  const [menuComponent, setMenuComponent] = useState(0);
  const [selectedOption, setSelectedOption] = useState('daysAhead');
  const [eventTitle, setEventTitle] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [eventActive, setEventActive] = useState(null);
  const [daysAhead, setDaysAhead] = useState(null);
  const [address, setAddress] = useState(null);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [eventDuration, setEventDuration] = useState(30);
  const [eventInterval, setEventInterval] = useState(15);
  const [lunchStartTime, setLunchStartTime] = useState('12:00');
  const [lunchEndTime, setLunchEndTime] = useState('13:00');

  const [eventConfigurations, setEventConfigurations] = useState([]);
  const [eventIntervals, setEventIntervals] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [events, setEvents] = useState([]);

  async function getCalendarData() {
    try {
      const response = await api.get(`/calendars/get-calendar/${user.id}/${params.id}`, { headers: { authorization: token } });
      if (response.status === 201) {
        const calendar = response.data.filteredTargetCalendar;
        const calendarEvents = response.data.events
        setEvents(calendarEvents)
        setEventConfigurations(calendar.calendar.daysOfTheWeek);
        setEventIntervals(calendar.calendar.eventsIntervals);
        setEventDuration(calendar.room.eventDuration);
        setEventInterval(calendar.room.eventInterval);
        setLunchStartTime(calendar.calendar.lunchStartTime);
        setLunchEndTime(calendar.calendar.lunchEndTime);
        setAddress(calendar.room.local.local);
        setSelectedLocal(calendar.room.local.type);
        setStartDate(new Date(calendar.calendar.startDate));
        setEndDate(new Date(calendar.calendar.endDate));
        setDaysAhead(calendar.calendar.daysAhead);
        setSelectedOption(calendar.calendar.type)

        setEventTitle(calendar.room.title);
        setEventColor(calendar.room.color);
        setEventActive(calendar.room.active);
      }
    } catch {
      toast.error('Erro ao buscar agenda.');
    }
  }

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getCalendarData();
    }
  }, [user]);

  useEffect(() => {
    calculateAllEventIntervals();
  }, [eventConfigurations, eventDuration, eventInterval, lunchStartTime, lunchEndTime]);

  const saveCalendar = async () => {
    const calendar = {
      room: {
        id: params.id,
        type: 'oneaone',
        vacancies: 1,
        active: eventActive,
        color: eventColor,
        title: eventTitle,
        local: { type: selectedLocal, local: selectedLocal === "Online" ? "Google Meet" : address },
        eventDuration: eventDuration,
        eventInterval: eventInterval
      },
      calendar: {
        lunchStartTime: lunchStartTime,
        lunchEndTime: lunchEndTime,
        type: selectedOption,
        startDate: startDate,
        endDate: endDate,
        eventsIntervals: eventIntervals,
        daysOfTheWeek: eventConfigurations,
        daysAhead: daysAhead,
      },
      events: events
    }

    try {
      const response = await api.patch(`/calendars/edit-calendar/${user.id}/${params.id}`, { calendar }, { headers: { authorization: token } });
      if (response.status === 201) {
        toast.success('Dados salvos!');
        navigate('/dashboard/schedules');
      }
    } catch {
      toast.error('Erro ao salvar agenda.');
    }
  }

  const handleAvailabilityChange = (index, value) => {
    let newWeekDays = [...eventConfigurations];
    newWeekDays[index].available = value;
    setEventConfigurations(newWeekDays);
  };

  const handleStartTimeChange = (index, value) => {
    let newWeekDays = [...eventConfigurations];
    newWeekDays[index].startTime = value;
    setEventConfigurations(newWeekDays);
  };

  const handleEndTimeChange = (index, value) => {
    let newWeekDays = [...eventConfigurations];
    newWeekDays[index].endTime = value;
    setEventConfigurations(newWeekDays);
  };

  const calculateEventCounts = (day, startTime, endTime, duration, interval) => {
    let startTimeDate = setHours(day, parseInt(startTime.split(':')[0]));
    startTimeDate = setMinutes(startTimeDate, parseInt(startTime.split(':')[1]));

    let endTimeDate = setHours(day, parseInt(endTime.split(':')[0]));
    endTimeDate = setMinutes(endTimeDate, parseInt(endTime.split(':')[1]));

    const eventTimes = [];

    while (endTimeDate >= addMinutes(startTimeDate, duration)) {
      const start = format(startTimeDate, 'HH:mm', { locale: ptBR });
      const end = format(addMinutes(startTimeDate, duration), 'HH:mm', { locale: ptBR });

      if (
        (end < lunchStartTime || end === lunchStartTime || end > lunchEndTime) &&
        (start < lunchStartTime || start > lunchEndTime || start === lunchEndTime)
      ) {
        eventTimes.push({ start, end });
      }
      startTimeDate = addMinutes(startTimeDate, duration + interval);
    }

    return { eventCount: eventTimes.length, eventTimes };
  };

  const calculateAllEventIntervals = () => {
    const allEventIntervals = [];

    eventConfigurations.forEach((day) => {
      if (day.available) {
        const dayEvents = calculateEventCounts(
          new Date(startDate),
          day.startTime,
          day.endTime,
          eventDuration,
          eventInterval
        );

        allEventIntervals.push({ day: day.day, ...dayEvents });
      }
    });

    setEventIntervals(allEventIntervals);
  };

  const formatDates = (startDate, endDate) => {
    const formattedStartDate = format(startDate, 'd MMMM yyyy', { locale: ptBR });
    const formattedEndDate = format(endDate, 'd MMMM yyyy', { locale: ptBR });
    return `De: ${formattedStartDate} Até: ${formattedEndDate}`;
  };

  const handleDaysAhead = () => {
    setDaysAhead("36000");
    setSelectedOption('indefinitely');
  };

  const daysAHead = () => {
    setDaysAhead("3");
    setSelectedOption('daysAhead');
  };

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={CalendarMenu}
          name={'Informações da agenda'}
          button={() => saveCalendar()}
          buttonName={'Salvar Agenda'}
          menuComponent={menuComponent}
          setMenuComponent={setMenuComponent}
        />
      }
    >
      {menuComponent == 0 &&
        <Container>
          <ContentContainer>
            <h2>Título do evento</h2>
            <TitleInput value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
          </ContentContainer>

          <ContentContainer>
            <h2>Intervalo de datas do evento</h2>

            <ToggleContainer>
              <OptionLabel>
                <input
                  type="radio"
                  value="daysAhead"
                  checked={selectedOption === 'daysAhead'}
                  onChange={() => daysAHead()}
                />
                Dias corridos no futuro
              </OptionLabel>
              {selectedOption === 'daysAhead' &&
                <div>
                  <input type="number" defaultValue={daysAhead} onChange={(e) => setDaysAhead(e.target.value)} />
                  <span>dias a frente no futuro</span>
                </div>
              }
              <OptionLabel>
                <input
                  type="radio"
                  value="specificDate"
                  checked={selectedOption === 'specificDate'}
                  onChange={() => setSelectedOption('specificDate')}
                />
                Intervalo de data específico
              </OptionLabel>
              {selectedOption === 'specificDate' &&
                <div style={{ marginBottom: 10 }}>
                  <h3>Escolha a data de início e fim:</h3>
                  <div style={{ display: 'flex', columnGap: 10 }}>
                    <Calendar
                      date={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date()}
                      locale={ptBR}
                      style={{ minHeight: 200 }}
                    />
                    <Calendar
                      date={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={new Date()}
                      locale={ptBR}
                      style={{ minHeight: 200 }}
                    />
                  </div>
                  <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
                    <span>{formatDates(startDate, endDate)}</span>
                  </div>
                </div>
              }
              <OptionLabel>
                <input
                  type="radio"
                  value="indefinitely"
                  checked={selectedOption === 'indefinitely'}
                  onChange={() => handleDaysAhead()}
                />
                Indefinidamente no futuro
              </OptionLabel>
            </ToggleContainer>
          </ContentContainer>

          <ContentContainer>
            <label>Horário de Início do Almoço:</label>
            <input
              type="time"
              value={lunchStartTime}
              onChange={(e) => setLunchStartTime(e.target.value)}
            />
            <label>Horário de Término do Almoço:</label>
            <input
              type="time"
              value={lunchEndTime}
              onChange={(e) => setLunchEndTime(e.target.value)}
            />
          </ContentContainer>

          <ContentContainer style={{ margin: "10px 0" }}>
            <h2 style={{ marginBottom: "10px" }}>Detalhes do evento</h2>
            <label>Escolha uma cor para a sua agenda:</label>
            <SketchPicker
              color={eventColor}
              onChange={(color) => setEventColor(color.hex)}
            />

            <ToggleContainer style={{ marginTop: '10px' }}>
              <span>Local do evento:</span>
              <OptionLabel style={{ marginTop: '10px' }}>
                <input
                  type="radio"
                  value="Presencial"
                  checked={selectedLocal === 'Presencial'}
                  onChange={() => setSelectedLocal('Presencial')}
                />
                Presencial
              </OptionLabel>
              {selectedLocal === 'Presencial' &&
                <div>
                  <span>No endereço:</span>
                  <input
                    style={{ width: "400px" }}
                    type="text"
                    defaultValue={address === "Google Meet" ? "" : address}
                    placeholder="R. Exemplo, 222 - cidade - estado - cep: 00000-000"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              }

              <OptionLabel>
                <input
                  type="radio"
                  value="Online"
                  checked={selectedLocal === 'Online'}
                  onChange={() => setSelectedLocal("Online")}
                />
                Online pelo Google Meet
              </OptionLabel>
            </ToggleContainer>
          </ContentContainer>

          <ContentContainer>

            <h2>Disponibilidade para os dias da semana</h2>
            {eventConfigurations.map((day, index) => (
              <DaysContainer key={index}>
                <CheckboxContainer
                  onClick={() => handleAvailabilityChange(index, !day.available)}
                  checked={day.available}
                >
                  <StyledCheckbox
                    checked={day.available}
                  >
                    {day.available &&
                      <img
                        alt="tick icon"
                        style={{ width: '15px' }}
                        src={CheckIcon}
                      />
                    }
                  </StyledCheckbox>
                  <Text checked={day.available}>{day.day}</Text>
                </CheckboxContainer>
                {day.available && (
                  <>
                    <label>Início:</label>
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => handleStartTimeChange(index, e.target.value)}
                    />
                    <label>Término:</label>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => handleEndTimeChange(index, e.target.value)}
                    />
                  </>
                )}
              </DaysContainer>
            ))}
          </ContentContainer>

          <ContentContainer>
            <h2>Configurar Horário e Duração do Evento</h2>
            <label>Duração do Evento (em minutos):</label>
            <input
              type="number"
              min="1"
              value={eventDuration}
              onChange={(e) => setEventDuration(parseInt(e.target.value))}
            />
            <label>Intervalo entre os Eventos (em minutos):</label>
            <input
              type="number"
              min="1"
              value={eventInterval}
              onChange={(e) => setEventInterval(parseInt(e.target.value))}
            />
          </ContentContainer>

          <ContentContainer>

            <h2>Intervalos de Evento:</h2>
            <IntervalsContainer>
              <EnventsContainer columns={eventIntervals.length}>
                {eventIntervals?.map((day, index) => (
                  <EventsContent key={index}>
                    <h3>{day.day}</h3>
                    <p>Eventos: {day.eventCount}</p>
                    {day.eventTimes?.map((interval, index) => (
                      <EventItem key={index}>
                        <div>Início: {interval.start}, </div>
                        <div>Término: {interval.end}</div>
                      </EventItem>
                    ))}
                  </EventsContent>
                ))}
              </EnventsContainer>
            </IntervalsContainer>
          </ContentContainer>
        </Container>
      }

      {menuComponent == 1 &&
        <ScheduleEvents calendarID={params.id} />
      }
    </ContentPageContainer>
  )
}

export default AddSchedule;