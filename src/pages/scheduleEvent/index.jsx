import { useCallback, useEffect, useState } from "react";
import "./styles.css";
// import { events } from "../../data/calendar";
import { toast } from "react-toastify";
import api from '../../api';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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
  const params = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getCalendarData();
  }, []);

  useEffect(() => {
    let dateItem = document.querySelectorAll(".active");
  }, [calendarData]);

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
        toast.success('Seu evento foi agendado com sucesso!');
      }
    } catch {
      toast.error('Erro ao agendar evento.');
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

  return (
    <div>
      {step === 0 &&
        <div className="wrapper">
          <header>
            <p className="current-date">{currentDate}</p>
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
          <div>
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
            <button onClick={() => setStep(2)}>Avançar</button>
          </div>
        </div>
      }

      {step === 2 &&
        <div className="wrapper">
          <label>Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Telefone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />

          <button onClick={() => saveEvent()}>Salvar Evento</button>
        </div>
      }
    </div >
  );
}

export default ScheduleEvent;