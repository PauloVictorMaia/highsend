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
  EventsContent,
  IntegrationsOptions
} from './styles.js';
import { CalendarMenu } from "../../data/menus";
import { toast } from "react-toastify";
import api from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleEvents from "./ScheduleEvents";
import { SketchPicker } from "react-color";
import Accordion from "../../components/Accordion";
import { NavLink } from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AvTimerIcon from '@mui/icons-material/AvTimer';

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
  const [otherPlataformName, setOtherPlataformName] = useState(null);
  const [meetingPlace, setMeetingPlace] = useState(null);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [hasIntegration, setHasIntegration] = useState(null);
  const [integrations, setIntegrations] = useState(null);
  const [eventDuration, setEventDuration] = useState(30);
  const [eventInterval, setEventInterval] = useState(15);
  const [lunchStartTime, setLunchStartTime] = useState('12:00');
  const [lunchEndTime, setLunchEndTime] = useState('13:00');

  const [eventConfigurations, setEventConfigurations] = useState([]);
  const [eventIntervals, setEventIntervals] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [events, setEvents] = useState([]);

  const [accordion, setAccordion] = useState(1);

  const [googleChecked, setGoogleChecked] = useState(false);
  const [whatsappChecked, setWhatsappChecked] = useState(false);
  const [googleIntegrations, setGoogleIntegrations] = useState([]);
  const [whatsappIntegrations, setWhatsappIntegrations] = useState([]);
  const [googleIntegrationSelected, setGoogleIntegrationSelected] = useState("");
  const [whatsappIntegrationSelected, setWhatsappIntegrationSelected] = useState("");
  const [createdAt, setCreatedAt] = useState(null);

  async function getCalendarData() {
    try {
      const response = await api.get(`/calendars/get-calendar/${user.id}/${params.id}`, { headers: { authorization: token } });
      if (response.status === 201) {
        const calendar = response.data.filteredTargetCalendar;
        const calendarEvents = response.data.events
        if (calendar.room.local.type === 'Online outra plataforma') {
          setOtherPlataformName(calendar.room.local.local);
        }
        setEvents(calendarEvents)
        setEventConfigurations(calendar.calendar.daysOfTheWeek);
        setEventIntervals(calendar.calendar.eventsIntervals);
        setEventDuration(calendar.room.eventDuration);
        setEventInterval(calendar.room.eventInterval);
        setLunchStartTime(calendar.calendar.lunchStartTime);
        setLunchEndTime(calendar.calendar.lunchEndTime);
        setMeetingPlace(calendar.room.local);
        setAddress(calendar.room.local.local);
        setHasIntegration(calendar.room.integration.hasIntegration);
        setIntegrations(calendar.room.integration.integrations);
        setSelectedLocal(calendar.room.local.type);
        setStartDate(new Date(calendar.calendar.startDate));
        setEndDate(new Date(calendar.calendar.endDate));
        setDaysAhead(calendar.calendar.daysAhead);
        setSelectedOption(calendar.calendar.type)
        setEventTitle(calendar.room.title);
        setEventColor(calendar.room.color);
        setEventActive(calendar.room.active);
        setCreatedAt(calendar.room.createdAt);
      }
    } catch {
      toast.error('Erro ao buscar agenda.');
    }
  }

  async function getIntegrations() {
    try {
      const response = await api.get(`/integrations/get-integrations-filtered/${user.id}`, { headers: { authorization: token } });
      if (response.status === 200) {
        setGoogleIntegrations(response.data.googleIntegrations);
        setWhatsappIntegrations(response.data.whatsappIntegrations);
      }
    } catch {
      return;
    }
  }

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getCalendarData();
      getIntegrations();
    }
  }, [user]);

  useEffect(() => {
    calculateAllEventIntervals();
  }, [eventConfigurations, eventDuration, eventInterval, lunchStartTime, lunchEndTime]);

  const saveCalendar = async () => {

    let selectedsIntegrations = [];

    if (hasIntegration && !googleChecked && !whatsappChecked) {
      toast.warning('Marque um serviço para integração ou escolha a opção "Não atribuir integração."');
      return;
    }

    if (googleChecked) {
      if (googleIntegrationSelected !== "") {
        selectedsIntegrations.push({ id: googleIntegrationSelected, type: "google" });
      } else {
        toast.warning("Escolha uma integração para Google ou desmarque a opção.");
        return;
      }
    }
    if (whatsappChecked) {
      if (whatsappIntegrationSelected !== "") {
        selectedsIntegrations.push({ id: whatsappIntegrationSelected, type: "whatsapp" });
      } else {
        toast.warning("Escolha uma integração para Whatsapp ou desmarque a opção.");
        return;
      }
    }

    if (!hasIntegration) {
      selectedsIntegrations = [];
    }

    if (selectedLocal === "Online outra plataforma" && !otherPlataformName) {
      toast.warning("Digite o nome da plataforma online ou desmarque a opção.");
      return;
    }

    const calendar = {
      room: {
        id: params.id,
        createdAt,
        type: 'oneaone',
        vacancies: 1,
        active: eventActive,
        color: eventColor,
        title: eventTitle,
        local: { type: selectedLocal, local: selectedLocal === "Presencial" ? address : selectedLocal === "Online Google Meet" ? "Google Meet" : otherPlataformName },
        integration: { hasIntegration: hasIntegration, integrations: selectedsIntegrations },
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

  const calculateEventCounts = (
    day,
    startTime,
    endTime,
    duration,
    interval,
  ) => {
    let startTimeDate = setHours(day, parseInt(startTime.split(':')[0]));
    startTimeDate = setMinutes(startTimeDate, parseInt(startTime.split(':')[1]));

    let endTimeDate = setHours(day, parseInt(endTime.split(':')[0]));
    endTimeDate = setMinutes(endTimeDate, parseInt(endTime.split(':')[1]));

    let lunchStartDate = setHours(day, parseInt(lunchStartTime.split(':')[0]));
    lunchStartDate = setMinutes(lunchStartDate, parseInt(lunchStartTime.split(':')[1]));

    let lunchEndDate = setHours(day, parseInt(lunchEndTime.split(':')[0]));
    lunchEndDate = setMinutes(lunchEndDate, parseInt(lunchEndTime.split(':')[1]));

    const eventTimes = [];

    while (endTimeDate >= addMinutes(startTimeDate, duration)) {
      if (startTimeDate >= lunchStartDate && startTimeDate < lunchEndDate) {
        startTimeDate = lunchEndDate;
      }

      const start = format(startTimeDate, 'HH:mm', { locale: ptBR });
      const end = format(addMinutes(startTimeDate, duration), 'HH:mm', { locale: ptBR });

      if (
        (end <= lunchStartTime || end > lunchEndTime) &&
        (start < lunchStartTime || start >= lunchEndTime)
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

  const changeAccordionValue = (index) => {
    if (index === accordion) return setAccordion(0);
    return setAccordion(index);
  }

  const handleGoogleChecked = () => {
    return setGoogleChecked(integrations.some(integration => integration.type === "google"));
  }

  const handleWhatsappChecked = () => {
    return setWhatsappChecked(integrations.some(integration => integration.type === "whatsapp"));
  }

  const updateGoogleIntegrationSelected = () => {
    const googleIntegration = integrations.find(integration => integration.type === "google");
    if (googleIntegration) {
      setGoogleIntegrationSelected(googleIntegration.id);
    } else {
      setGoogleIntegrationSelected("");
    }
  };

  const updateWhatsappIntegrationSelected = () => {
    const whatsappIntegration = integrations.find(integration => integration.type === "whatsapp");
    if (whatsappIntegration) {
      setWhatsappIntegrationSelected(whatsappIntegration.id);
    } else {
      setWhatsappIntegrationSelected("");
    }
  };

  useEffect(() => {
    if (integrations && integrations.length > 0) {
      handleGoogleChecked();
      handleWhatsappChecked();
      updateGoogleIntegrationSelected();
      updateWhatsappIntegrationSelected();
    }
  }, [integrations]);

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
          <Accordion
            open={accordion === 1}
            onClick={() => changeAccordionValue(1)}
            title={"Informações básicas do evento"}
            icon={<FeedIcon />}
          >
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
              <label>Escolha uma cor para a sua agenda:</label>
              <SketchPicker
                color={eventColor}
                onChange={(color) => setEventColor(color.hex)}
              />
            </ContentContainer>
          </Accordion>

          <Accordion
            open={accordion === 2}
            onClick={() => changeAccordionValue(2)}
            title={"Local do evento e integrações"}
            icon={<MapIcon />}
          >
            <ContentContainer style={{ margin: "10px 0" }}>
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
                      defaultValue={meetingPlace.type === "Presencial" ? address : ""}
                      placeholder="R. Exemplo, 222 - cidade - estado - cep: 00000-000"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                }

                <OptionLabel>
                  <input
                    type="radio"
                    value="Online Google Meet"
                    checked={selectedLocal === 'Online Google Meet'}
                    onChange={() => setSelectedLocal("Online Google Meet")}
                  />
                  Online pelo Google Meet
                </OptionLabel>

                <OptionLabel>
                  <input
                    type="radio"
                    value="Online outra plataforma"
                    checked={selectedLocal === 'Online outra plataforma'}
                    onChange={() => setSelectedLocal("Online outra plataforma")}
                  />
                  Online por outra plataforma
                </OptionLabel>

                {selectedLocal === 'Online outra plataforma' &&
                  <div>
                    <span>Nome da plataforma online:</span>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      defaultValue={otherPlataformName}
                      placeholder="Nome da plataforma online"
                      onChange={(e) => setOtherPlataformName(e.target.value)}
                    />
                  </div>
                }
              </ToggleContainer>

              <ToggleContainer style={{ marginTop: '10px' }}>
                <span>Integrações:</span>
                <OptionLabel style={{ marginTop: '10px' }}>
                  <input
                    type="radio"
                    checked={hasIntegration}
                    onChange={() => setHasIntegration(!hasIntegration)}
                  />
                  Atribuir integração a essa agenda
                </OptionLabel>

                {hasIntegration &&
                  <IntegrationsOptions>
                    <span>Escolha quais integrações deseja adicionar:</span>
                    <div style={{ margin: "10px 0" }}>
                      <input
                        type="checkbox"
                        name="integration option"
                        checked={googleChecked}
                        onChange={() => setGoogleChecked(!googleChecked)}
                      />
                      <label style={{ marginLeft: "5px" }}>Google</label>
                      {
                        googleChecked &&
                          googleIntegrations.length > 0 ?
                          <select
                            value={googleIntegrationSelected}
                            onChange={(e) => setGoogleIntegrationSelected(e.target.value)}
                            style={{ marginLeft: "5px" }}
                          >
                            <option value="">Selecionar integração</option>
                            {googleIntegrations &&
                              googleIntegrations.map((integration, index) => (
                                <option key={index} value={integration.id}>{integration.name}</option>
                              ))
                            }
                          </select>
                          :
                          googleChecked && <span style={{ marginLeft: "15px" }}>Você não possui integração com esse serviço. Para integrar <NavLink to={"/dashboard/integrations"}>Clique aqui.</NavLink></span>
                      }
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        name="integration option"
                        checked={whatsappChecked}
                        onChange={() => setWhatsappChecked(!whatsappChecked)}
                      />
                      <label style={{ marginLeft: "5px" }}>Whatsapp</label>
                      {
                        whatsappChecked &&
                          whatsappIntegrations.length > 0 ?
                          <select
                            value={whatsappIntegrationSelected}
                            onChange={(e) => setWhatsappIntegrationSelected(e.target.value)}
                            style={{ marginLeft: "5px" }}
                          >
                            <option value="">Selecionar integração</option>
                            {whatsappIntegrations &&
                              whatsappIntegrations.map((integration, index) => (
                                <option key={index} value={integration.id}>{integration.name}</option>
                              ))
                            }
                          </select>
                          :
                          whatsappChecked && <span style={{ marginLeft: "15px" }}>Você não possui integração com esse serviço. Para integrar <NavLink to={"/dashboard/integrations"}>Clique aqui.</NavLink></span>
                      }
                    </div>
                  </IntegrationsOptions>
                }

                <OptionLabel>
                  <input
                    type="radio"
                    checked={!hasIntegration}
                    onChange={() => setHasIntegration(!hasIntegration)}
                  />
                  Não atribuir integração
                </OptionLabel>

              </ToggleContainer>
            </ContentContainer>
          </Accordion>

          <Accordion
            open={accordion === 3}
            onClick={() => changeAccordionValue(3)}
            title={"Disponibilidade para os dias da semana"}
            icon={<EventAvailableIcon />}
          >
            <ContentContainer>
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
          </Accordion>

          <Accordion
            open={accordion === 4}
            onClick={() => changeAccordionValue(4)}
            title={"Duração e intervalo do evento"}
            icon={<AvTimerIcon />}
          >
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
          </Accordion>

          <ContentContainer style={{ marginTop: 40 }}>
            <h2 style={{ marginBottom: 10 }}>Intervalos de Evento:</h2>
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
        </Container >
      }

      {
        menuComponent == 1 &&
        <ScheduleEvents calendarID={params.id} />
      }
    </ContentPageContainer >
  )
}

export default AddSchedule;