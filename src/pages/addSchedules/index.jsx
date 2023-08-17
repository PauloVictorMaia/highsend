import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, setHours, setMinutes, addMinutes } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import CheckIcon from '../../assets/check.png';
import { CheckboxContainer, DaysContainer, StyledCheckbox, Text, Container } from './styles.js';
import { calendars } from "../../data/calendar";

function AddSchedule() {
  const [eventDuration, setEventDuration] = useState(30);
  const [eventInterval, setEventInterval] = useState(15);
  const [lunchStartTime, setLunchStartTime] = useState('12:00');
  const [lunchEndTime, setLunchEndTime] = useState('13:00');

  const [eventIntervals, setEventIntervals] = useState([]);
  console.log(eventIntervals)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [eventConfigurations, setEventConfigurations] = useState([]);

  useEffect(() => {
    setEventConfigurations(calendars[0].calendar.daysOfTheWeek)
  }, [])

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
    const allEventIntervals = {};

    eventConfigurations.forEach((day) => {
      if (day.available) {
        const dayEvents = calculateEventCounts(
          new Date(startDate),
          day.startTime,
          day.endTime,
          eventDuration,
          eventInterval
        );

        allEventIntervals[day.day] = dayEvents;
      }
    });

    setEventIntervals(allEventIntervals);
  };

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          name={'Informações da agenda'}
        />
      }
    >
      <Container>
        <h2>Escolha o Range de Datas:</h2>
        <div>
          <Calendar
            date={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            locale={ptBR}
          />
          <Calendar
            date={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date()}
            locale={ptBR}
          />
        </div>

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

        <h2>Disponibilidade para os dias da semana</h2>
        {eventConfigurations.map((day, index) => (
          <DaysContainer key={day}>
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
        <button onClick={calculateAllEventIntervals}>Calcular Intervalos</button>

        <h2>Intervalos de Evento:</h2>
        {Object.keys(eventIntervals).map((day) => (
          <div key={day}>
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            <p>Quantidade de Eventos Possíveis: {eventIntervals[day].eventCount}</p>
            <ul>
              {eventIntervals[day].eventTimes.map((interval, index) => (
                <li key={index}>
                  Início: {interval.start}, Término: {interval.end}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </ContentPageContainer>
  )
}

export default AddSchedule;