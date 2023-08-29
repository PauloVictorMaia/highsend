import { useCallback, useEffect, useState } from "react";
import "./styles.css";
// import { events } from "../../data/calendar";
import { toast } from "react-toastify";
import api from '../../api';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { parseISO } from "date-fns";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InputMask from 'react-input-mask'

const daysValue = {
  0: 'domingo',
  1: 'segunda',
  2: 'terça',
  3: 'quarta',
  4: 'quinta',
  5: 'sexta',
  6: 'sábado',
}

function ScheduleEvent() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currMonth, setCurrMonth] = useState(null);
  const [currYear, setCurrYear] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [calendarData, setCalendarData] = useState([]);
  const [selectedTime, setSelectedTime] = useState({ start: '', end: '' });
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);
  const [unavailableHours, setUnavailableHours] = useState([]);
  const [calendarActiveDays, setCalendarActiveDays] = useState("");
  const [availableEventTimes, setAvailableEventTimes] = useState([]);
  const [events, setEvents] = useState([]);
  const [scheduledEvent, setScheduledEvent] = useState(false);
  const params = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getCalendarData();
  }, []);

  useEffect(() => {
    if (Object.keys(calendarData).length > 1) {
      renderCalendar();
      selectDate();
    }
  }, [currMonth, currYear, calendarData]);

  useEffect(() => {
    if (dataLoaded && selectedDate) {
      const events = calendarData.calendar.eventsIntervals.filter((times) => times.day === daysValue[new Date(selectedDate).getDay()]);
      setDayEvents(events);
    }
  }, [dataLoaded, selectedDate]);

  useEffect(() => {
    if (dayEvents.length > 0) {
      const availableTimes = dayEvents[0].eventTimes.filter(time => {
        const isOverlapping = unavailableHours.some(usedTime => {
          return isTimeOverlapping(time, usedTime.time);
        });
        return !isOverlapping;
      });
      setAvailableEventTimes(availableTimes);
    }
  }, [dayEvents, unavailableHours]);

  async function getCalendarData() {
    try {
      const response = await api.get(`/calendars/get-full-calendar/${params.userId}/${params.calendarId}`);
      if (response.status === 201) {
        setDataLoaded(true);
        const calendarData = response.data.calendar;
        setCalendarData(calendarData);
        setEvents(calendarData.events);
        setCalendarActiveDays(calendarData.calendar.daysAhead);
        if (calendarData.calendar.type === "specificDate") {
          setDate(new Date(calendarData.calendar.startDate));
          setEndDate(new Date(calendarData.calendar.endDate));
          setCurrMonth(new Date(calendarData.calendar.startDate).getMonth());
          setCurrYear(new Date(calendarData.calendar.startDate).getFullYear());
        } else {
          setDate(new Date());
          setCurrMonth(new Date().getMonth());
          setCurrYear(new Date().getFullYear());
        }
      }
    } catch {
      toast.error('Erro ao buscar agenda.');
    }
  }

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const renderCalendar = useCallback(() => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const calendarArrayDays = [];

    for (let i = 1; i <= calendarActiveDays; i++) {
      let previousDays = new Date();
      previousDays.setDate(previousDays.getDate() + i);
      calendarArrayDays.push(JSON.stringify(new Date(`${previousDays.getMonth() + 1} ${previousDays.getDate()} ${previousDays.getFullYear()}`)));
    }

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      const actualDay = (JSON.stringify(new Date(`${currMonth} ${lastDateofLastMonth - i + 1} ${currYear}`)))
      const verifyWeekendDay = calendarData.calendar.daysOfTheWeek.filter((dayWeek) => dayWeek.dayValue === new Date(JSON.parse(actualDay)).getDay() && dayWeek.available)
      let specifitActive = new Date(`${currMonth} ${lastDateofLastMonth - i + 1} ${currYear}`) >= new Date(calendarData.calendar.startDate) && new Date(`${currMonth} ${lastDateofLastMonth - i + 1} ${currYear}`) <= new Date(calendarData.calendar.endDate) && verifyWeekendDay.length ? "active" : "inactive";
      let active = calendarArrayDays.indexOf(actualDay) !== -1 && verifyWeekendDay.length ? "active" : "inactive";
      liTag += `<li data-value=${JSON.stringify(new Date(`${currMonth} ${lastDateofLastMonth - i + 1} ${currYear}`))} class=${calendarData.calendar.type === "specificDate" ? specifitActive : active}>${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const actualDay = JSON.stringify(new Date(`${currMonth + 1} ${i} ${currYear}`))
      const verifyWeekendDay = calendarData.calendar.daysOfTheWeek.filter((dayWeek) => dayWeek.dayValue === new Date(JSON.parse(actualDay)).getDay() && dayWeek.available)
      let specifitActive = new Date(`${currMonth + 1} ${i} ${currYear}`) >= new Date(calendarData.calendar.startDate) && new Date(`${currMonth + 1} ${i} ${currYear}`) <= new Date(calendarData.calendar.endDate) && verifyWeekendDay.length ? "active" : "inactive";
      let active = calendarArrayDays.indexOf(actualDay) !== -1 && verifyWeekendDay.length ? "active" : "inactive";
      liTag += `<li data-value=${actualDay} class="${calendarData.calendar.type === "specificDate" ? specifitActive : active}">${i}</li>`;
    }

    setCurrentDate(`${months[currMonth]} ${currYear}`);
    const daysTag = document.querySelector(".days");
    daysTag.innerHTML = liTag;
  }, [currYear, currMonth, calendarData]);

  const selectDate = () => {
    let dateItem = document.querySelectorAll(".active");
    const daysChecked = [];
    dateItem.forEach((li) => daysChecked.push(li.dataset.value));
    daysChecked.forEach((selectedDate) => {
      const dayNames = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
      const dayOfWeek = dayNames[new Date(selectedDate).getDay()];
      const intervalsForDay = calendarData.calendar.eventsIntervals.find(interval => interval.day === dayOfWeek);
      const maxPossibleEvents = intervalsForDay ? intervalsForDay.eventCount : 0;
      const eventsScheduled = events.filter(event => event.day === selectedDate).length;
      if (eventsScheduled === maxPossibleEvents) {
        const liElement = Array.from(dateItem).find(li => li.dataset.value === selectedDate);
        if (liElement) {
          liElement.classList.remove("active");
          liElement.classList.add("inactive");
        }
      }
    });
    for (let i = 0; i < dateItem.length; i++) {
      dateItem[i].addEventListener("click", async function () {
        const selectedDate = dateItem[i].getAttribute('data-value')
        try {
          const response = await api.get(`/calendars/get-events-in-selected-date/${params.userId}/${params.calendarId}/${selectedDate}`);
          if (response.status === 200) {
            setUnavailableHours(response.data.events);
            setStep(1);
          }
        } catch {
          toast.error('Erro ao buscar eventos agendados nessa data.')
        }
        setSelectedDate(dateItem[i].getAttribute('data-value'))
      });
    }
  };

  const isTimeOverlapping = (time1, time2) => {
    return (
      (time1.start >= time2.start && time1.start < time2.end) ||
      (time1.end > time2.start && time1.end <= time2.end)
    );
  };

  const saveEvent = async () => {

    if (name.trim() === '') {
      toast.warning('O campo "Nome" é obrigatório.');
      return;
    }
    if (email.trim() === '') {
      toast.warning('O campo "Email" é obrigatório.');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning('O email digitado não possui um formato válido.');
      return;
    }

    if (phone.trim() === '') {
      toast.warning('O campo "Telefone" é obrigatório.');
      return;
    } else if (phone.includes('_')) {
      toast.warning('Digite um número de telefone válido.');
      return;
    }

    const newSaveEvent = {
      id: uuidv4(),
      day: selectedDate,
      name: name,
      email: email,
      phone: phone,
      time: selectedTime,
    }

    try {
      const response = await api.post(`/calendars/add-event/${params.userId}/${params.calendarId}`, { newSaveEvent });
      if (response.status === 201) {
        setEvents(response.data.events);
        toast.success('Seu evento foi agendado com sucesso!');
        setScheduledEvent(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.warning('Enquanto você preenchia seus dados um evento foi agendado na mesma data e horário escolhidos. Por gentileza, escolha outro horário.');
        const dayEvents = error.response.data.dayEvents;
        const dayNames = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
        const selectedDateObj = parseISO(selectedDate);
        const dayOfWeekNumeric = selectedDateObj.getDay();
        const dayOfWeekName = dayNames[dayOfWeekNumeric];
        const eventInterval = calendarData.calendar.eventsIntervals.filter((event) => event.day === dayOfWeekName);
        const availableTimes = eventInterval[0].eventTimes.filter(time => {
          const isOverlapping = dayEvents.some(usedTime => {
            return isTimeOverlapping(time, usedTime.time);
          });
          return !isOverlapping;
        });
        setAvailableEventTimes(availableTimes);
        setTimeout(() => {
          handleStep(1);
        }, 2000);
      } else {
        toast.error('Erro ao agendar evento.')
      }
    }
  }

  const previousMonth = () => {
    if (currMonth <= 0) {
      const newDate = new Date(currYear - 1, 11, 1);
      setDate(newDate);
      setCurrYear(newDate.getFullYear());
      setCurrMonth(newDate.getMonth());
    } else {
      setCurrMonth(currMonth - 1);
    }
  }

  const nextMonth = () => {
    if (currMonth >= 11) {
      const newDate = new Date(currYear + 1, 0, 1);
      setDate(newDate);
      setCurrYear(newDate.getFullYear());
      setCurrMonth(newDate.getMonth());
    } else {
      setCurrMonth(currMonth + 1);
    }
  }

  const handleStep = (step) => {
    if (step === 0) {
      setStep(step);
      setTimeout(() => {
        renderCalendar();
        selectDate();
      }, 100);
    } else if (step === 1) {
      setStep(step);
    }
  }

  return (
    <div>
      {step === 0 &&
        <div className="wrapper">
          <header>
            <p style={{ marginLeft: '30px' }} className="current-date">{currentDate}</p>
            <div className="icons">
              <span onClick={() => previousMonth()} id="prev" className="material-symbols-rounded">◄</span>
              <span onClick={() => nextMonth()} id="next" className="material-symbols-rounded">►</span>
            </div>
          </header>
          <div className="calendar">
            <ul className="weeks">
              <li>Dom</li>
              <li>Seg</li>
              <li>Ter</li>
              <li>Quar</li>
              <li>Quin</li>
              <li>Sex</li>
              <li>Sáb</li>
            </ul>
            <ul className="days"></ul>
          </div>
        </div>
      }
      {step === 1 &&
        <div className="wrapper">

          <header>
            <p className="current-date">{new Date(selectedDate).getDate()} de {currentDate}</p>
          </header>
          <div className="available-events-times">
            <h2>Horários disponíveis</h2>
            <ul>
              {availableEventTimes.map((time, index) => (
                <li
                  className="hour-picker"
                  key={index}
                  onClick={() => handleTimeSelection(time)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: selectedTime === time ? 'bold' : 'normal',
                  }}
                >
                  {time.start}
                </li>
              ))}
            </ul>
            <h3>Horário selecionado: {selectedTime.start ? `${selectedTime.start} - ${selectedTime.end}` : 'Nenhum horário selecionado'}</h3>
            <div className="buttons-container">
              <button style={{ backgroundColor: '#ff99cc' }} onClick={() => handleStep(0)}>Voltar</button>
              <button onClick={() => setStep(2)}>Avançar</button>
            </div>
          </div>
        </div>
      }

      {step === 2 &&
        <div className="wrapper">
          <div className="inputs-container">
            <span>Preencha seus dados:</span>
            <label>Nome:</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email:</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Telefone:</label>
            <InputMask
              required
              mask="(99) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="buttons-container">
              <button style={{ backgroundColor: '#ff99cc' }} onClick={() => handleStep(1)}>Voltar</button>
              <button onClick={() => saveEvent()}>Salvar Evento</button>
            </div>
          </div>
          {scheduledEvent &&
            <div className="scheduled-event">
              <EventAvailableIcon />
              <span>Confira os dados do seu agendamento:</span>
              <span>Dia: {new Date(selectedDate).getDate()} de {currentDate}</span>
              <span>Horário: {selectedTime.start} às {selectedTime.end}</span>
            </div>
          }
        </div>
      }
    </div >
  );
}

export default ScheduleEvent;