/* eslint-disable react-hooks/exhaustive-deps */
import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, setHours, setMinutes, addMinutes } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  DaysContainer,
  Container,
  IntervalsContainer,
  ToggleContainer,
  OptionLabel,
  ContentContainer,
  TitleInput,
  EventItem,
  EnventsContainer,
  EventsContent,
  IntegrationsOptions,
  Input,
  WhatsappMessage,
  CountContainer,
  EventConfig,
  TimeCount,
  CountInput,
  TimeContainer,
  InputTimeContainer,
  CheckboxContent,
  SaveButtonContainer,
  SaveButton,
  WhatsappMessageInfo,
  IconText,
  VariableExample,
} from './styles.js';
import { CalendarMenu } from "../../data/menus";
import { toast } from "react-toastify";
import api from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleEvents from "./ScheduleEvents";
import Accordion from "../../components/Accordion";
import { NavLink } from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import moment from 'moment-timezone';
import Radio from '@mui/material/Radio';
import Circle from '@uiw/react-color-circle';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Ring } from "@uiball/loaders";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function AddSchedule() {
  const { user, getCalendars } = useStateContext();
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
  const IntegrationPlaceholder = "Selecione uma integração"
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
  const [whatsappMessage, setWhatsappMessage] = useState("Olá, {{nome}}, tudo bem? Seu evento foi agendado para o dia {{data}}, às {{horario}}. Por favor, confirme seus dados para contato: Email: {{email}}, tel: {{telefone}}. Obrigado e até lá.");
  const whatsappMessageTextareaRef = useRef(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [timezone, setTimezone] = useState("");
  const brazilTimezones = moment.tz.zonesForCountry('BR');
  const [isLoading, setIsLoading] = useState(false);

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
        setTimezone(calendar.calendar.timezone);
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
        const responseIntegrations = response.data.integrationsFiltered
        const google = responseIntegrations.filter(integrations => integrations.type === 'google');
        const whatsapp = responseIntegrations.filter(integrations => integrations.type === 'whatsapp');
        if (google.length > 0) {
          setGoogleIntegrations(google);
        }
        if (whatsapp.length > 0) {
          setWhatsappIntegrations(whatsapp);
        }
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
      if (!whatsappIntegrationSelected) {
        toast.warning("Escolha uma integração para Whatsapp ou desmarque a opção.");
        return;
      }
      if (!whatsappMessage) {
        toast.warning("Defina uma mensagem a ser enviada pelo whatsapp.");
        whatsappMessageTextareaRef.current.focus();
        return;
      }
      if (whatsappIntegrationSelected && whatsappMessage) {
        selectedsIntegrations.push({ id: whatsappIntegrationSelected, type: "whatsapp", message: whatsappMessage });
      }
    }

    if (!hasIntegration) {
      selectedsIntegrations = [];
    }

    if (selectedLocal === "Online outra plataforma" && !otherPlataformName) {
      toast.warning("Digite o nome da plataforma online ou desmarque a opção.");
      return;
    }

    if (eventDuration < 1 || !eventDuration) {
      toast.warning("A duração do evento não pede ser vazia ou menor que 1 minuto.");
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
        timezone: timezone,
        eventsIntervals: eventIntervals,
        daysOfTheWeek: eventConfigurations,
        daysAhead: daysAhead,
      },
      events: events
    }

    try {
      setIsLoading(true);
      const response = await api.patch(`/calendars/edit-calendar/${user.id}/${params.id}`, { calendar }, { headers: { authorization: token } });
      if (response.status === 201) {
        toast.success('Dados salvos!');
        navigate('/dashboard/schedules');
        getCalendars();
        setIsLoading(false);
      }
    } catch {
      toast.error('Erro ao salvar agenda.');
      setIsLoading(false);
    }
  }

  const handleAvailabilityChange = (index, value) => {
    let newWeekDays = [...eventConfigurations];
    newWeekDays[index].available = value;
    setEventConfigurations(newWeekDays);
  };

  const handleStartTimeChange = (index, value) => {
    console.log(value)
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
      setWhatsappMessage(whatsappIntegration.message);
    } else {
      setWhatsappIntegrationSelected("");
      setWhatsappMessage("Olá, {{nome}}, tudo bem? Seu evento foi agendado para o dia {{data}}, às {{horario}}. Por favor, confirme seus dados para contato: Email: {{email}}, tel: {{telefone}}. Obrigado e até lá.");
    }
  };

  console.log(whatsappMessage)

  useEffect(() => {
    if (integrations && integrations.length > 0) {
      handleGoogleChecked();
      handleWhatsappChecked();
      updateGoogleIntegrationSelected();
      updateWhatsappIntegrationSelected();
    }
  }, [integrations]);

  const handleEventDuration = (e) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      setEventDuration(null);
    } else {
      setEventDuration(number);
    }
  }

  const handleEventInterval = (e) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      setEventInterval(null);
    } else {
      setEventInterval(number);
    }
  }

  const handleTimezone = (value) => {
    if (value === "America/Sao_Paulo (Horário de Brasília)") {
      setTimezone("America/Sao_Paulo");
      return;
    } else {
      setTimezone(value);
    }
  }

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
          isLoading={isLoading}
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
              <Input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Título do evento"
              />
            </ContentContainer>

            <ContentContainer>

              <h5>Intervalo de datas do evento</h5>
              <ToggleContainer>
                <OptionLabel>
                  <Radio
                    value="daysAhead"
                    checked={selectedOption === 'daysAhead'}
                    onChange={() => daysAHead()}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      }
                    }}
                  />
                  Dias corridos no futuro
                </OptionLabel>
                {selectedOption === 'daysAhead' &&
                  <Input
                    type="number"
                    defaultValue={daysAhead}
                    onChange={(e) => setDaysAhead(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="Número de dias a frente no futuro"
                  />
                }
                <OptionLabel>
                  <Radio
                    value="specificDate"
                    checked={selectedOption === 'specificDate'}
                    onChange={() => setSelectedOption('specificDate')}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
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
                  <Radio
                    value="indefinitely"
                    checked={selectedOption === 'indefinitely'}
                    onChange={() => handleDaysAhead()}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
                  />
                  Indefinidamente no futuro
                </OptionLabel>
              </ToggleContainer>
            </ContentContainer>

            <ContentContainer>
              <h5>Escolha uma cor para a sua agenda:</h5>
              <Circle
                colors={['#4339F2', '#1B192E', '#E22A4B', '#FF9900', '#006627', '#AD00FF', '#ff6699']}
                color={eventColor}
                onChange={(color) => {
                  setEventColor(color.hex);
                }}
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
              <ToggleContainer>
                <h5>Local do evento:</h5>
                <OptionLabel style={{ marginTop: '10px' }}>
                  <Radio
                    value="Presencial"
                    checked={selectedLocal === 'Presencial'}
                    onChange={() => setSelectedLocal('Presencial')}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
                  />
                  Presencial
                </OptionLabel>
                {selectedLocal === 'Presencial' &&
                  <div>
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      defaultValue={meetingPlace.type === "Presencial" ? address : ""}
                      placeholder="R. Exemplo, 222 - cidade - estado - cep: 00000-000"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                }

                <OptionLabel>
                  <Radio
                    value="Online Google Meet"
                    checked={selectedLocal === 'Online Google Meet'}
                    onChange={() => setSelectedLocal("Online Google Meet")}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
                  />
                  Online pelo Google Meet
                </OptionLabel>

                <OptionLabel>
                  <Radio
                    value="Online outra plataforma"
                    checked={selectedLocal === 'Online outra plataforma'}
                    onChange={() => setSelectedLocal("Online outra plataforma")}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
                  />
                  Online por outra plataforma
                </OptionLabel>

                {selectedLocal === 'Online outra plataforma' &&
                  <div>
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      defaultValue={otherPlataformName}
                      placeholder="Nome da plataforma online"
                      onChange={(e) => setOtherPlataformName(e.target.value)}
                    />
                  </div>
                }
              </ToggleContainer>

              <ToggleContainer style={{ marginTop: '10px' }}>
                <h5>Integrações:</h5>
                <OptionLabel style={{ marginTop: '10px' }}>
                  <Radio
                    checked={hasIntegration}
                    onChange={() => setHasIntegration(!hasIntegration)}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
                  />
                  Atribuir integração a essa agenda
                </OptionLabel>

                {hasIntegration &&
                  <IntegrationsOptions>
                    <span>Escolha quais integrações deseja adicionar:</span>
                    <div style={{ margin: "10px 0" }}>
                      <Checkbox
                        name="integration option"
                        checked={googleChecked}
                        onChange={() => setGoogleChecked(!googleChecked)}
                        size='small'
                        sx={{
                          '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                          {
                            color: '#4339F2',
                          },
                        }}
                      />
                      <label style={{ marginLeft: "5px" }}>Google</label>
                      {
                        googleChecked &&
                          googleIntegrations.length > 0 ?

                          <Select
                            IconComponent={KeyboardArrowDownIcon}
                            size="small"
                            value={googleIntegrationSelected}
                            onChange={(e) => setGoogleIntegrationSelected(e.target.value)}
                            style={{ marginLeft: "5px" }}
                            sx={{
                              '& .MuiSelect-select .notranslate::after': IntegrationPlaceholder
                                ? {
                                  content: `"${IntegrationPlaceholder}"`,
                                  opacity: 0.72,
                                }
                                : {},

                              '.MuiSvgIcon-root ': {
                                fill: "#4339F2 !important",
                              }
                            }}
                          >
                            {googleIntegrations &&
                              googleIntegrations.map((integration, index) => (
                                <MenuItem key={index} value={integration.id}>{integration.name}</MenuItem>
                              ))
                            }
                          </Select>
                          :
                          googleChecked && <span style={{ marginLeft: "15px" }}>Você não possui integração com esse serviço. Para integrar <NavLink to={"/dashboard/integrations"}>Clique aqui.</NavLink></span>
                      }
                    </div>

                    <div>
                      <Checkbox
                        name="integration option"
                        checked={whatsappChecked}
                        onChange={() => setWhatsappChecked(!whatsappChecked)}
                        size='small'
                        sx={{
                          '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                          {
                            color: '#4339F2',
                          },
                        }}
                      />
                      <label style={{ marginLeft: "5px" }}>Whatsapp</label>
                      {
                        whatsappChecked &&
                          whatsappIntegrations && whatsappIntegrations.length > 0 ?
                          <>
                            <Select
                              IconComponent={KeyboardArrowDownIcon}
                              value={whatsappIntegrationSelected}
                              size="small"
                              onChange={(e) => setWhatsappIntegrationSelected(e.target.value)}
                              style={{ marginLeft: "5px" }}
                              sx={{
                                '& .MuiSelect-select .notranslate::after': IntegrationPlaceholder
                                  ? {
                                    content: `"${IntegrationPlaceholder}"`,
                                    opacity: 0.72,
                                  }
                                  : {},
                                '.MuiSvgIcon-root ': {
                                  fill: "#4339F2 !important",
                                }
                              }}
                            >
                              {whatsappIntegrations &&
                                whatsappIntegrations.map((integration, index) => (
                                  <MenuItem key={index} value={integration.id}>{integration.name}</MenuItem >
                                ))
                              }
                            </Select>

                            <WhatsappMessageInfo>
                              <IconText>
                                <InfoOutlinedIcon />
                                <span style={{ fontWeight: "600" }}>Escritas automáticas</span>
                              </IconText>
                              <IconText>
                                <span>
                                  Em sua mensagem você pode utilizar as seguintes escritas automáticas para utilizar as informações fornecidas pelo seu cliente no agendamento.
                                </span>
                              </IconText>

                              <IconText>
                                <VariableExample>
                                  {"{{nome}}"}
                                </VariableExample>

                                <VariableExample>
                                  {"{{data}}"}
                                </VariableExample>

                                <VariableExample>
                                  {"{{horario}}"}
                                </VariableExample>

                                <VariableExample>
                                  {"{{email}}"}
                                </VariableExample>

                                <VariableExample>
                                  {"{{telefone}}"}
                                </VariableExample>
                              </IconText>
                            </WhatsappMessageInfo>

                            <WhatsappMessage
                              value={whatsappMessage}
                              onChange={(e) => setWhatsappMessage(e.target.value)}
                              ref={whatsappMessageTextareaRef}
                            />
                          </>
                          :
                          whatsappChecked && <span style={{ marginLeft: "15px" }}>Você não possui integração com esse serviço. Para integrar <NavLink to={"/dashboard/integrations"}>Clique aqui.</NavLink></span>
                      }
                    </div>
                  </IntegrationsOptions>
                }

                <OptionLabel>
                  <Radio
                    checked={!hasIntegration}
                    onChange={() => setHasIntegration(!hasIntegration)}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
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

                  <CheckboxContent>
                    <Checkbox
                      checked={day.available}
                      onChange={() => handleAvailabilityChange(index, !day.available)}
                      size='small'
                      sx={{
                        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                        {
                          color: '#4339F2',
                        },
                      }}
                    />
                    <span>{day.day}</span>
                  </CheckboxContent>

                  {day.available && (

                    <TimeContainer>
                      <InputTimeContainer>
                        <HourglassTopIcon />
                        <Input
                          style={{ color: "#4339F2", border: "none" }}
                          type="time"
                          value={day.startTime}
                          onChange={(e) => handleStartTimeChange(index, e.target.value)}
                        />
                      </InputTimeContainer>

                      <InputTimeContainer>
                        <HourglassBottomIcon />
                        <Input
                          style={{ color: "#4339F2", border: "none" }}
                          type="time"
                          value={day.endTime}
                          onChange={(e) => handleEndTimeChange(index, e.target.value)}
                        />
                      </InputTimeContainer>

                    </TimeContainer>

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
              <h5>Configurar Horário e Duração do Evento</h5>
              <label>Fuso horário:</label>
              <Select
                IconComponent={KeyboardArrowDownIcon}
                size="medium"
                value={timezone === "America/Sao_Paulo" ? "America/Sao_Paulo (Horário de Brasília)" : timezone}
                onChange={(e) => handleTimezone(e.target.value)}
                sx={{
                  '.MuiSvgIcon-root ': {
                    fill: "#4339F2 !important",
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E0EAFF',
                  },
                }}
                style={{ marginBottom: "20px" }}
              >
                <MenuItem value="America/Sao_Paulo (Horário de Brasília)">America/Sao Paulo (Horário de Brasília)</MenuItem>
                {brazilTimezones.map((timezone, index) => (
                  <MenuItem key={index} value={timezone}>
                    {timezone}
                  </MenuItem>
                ))}
              </Select>

              <CountContainer>
                <EventConfig>
                  <h5>Duração do evento</h5>
                  <span>{`(em minutos)`}</span>
                </EventConfig>

                <TimeCount>
                  <RemoveIcon
                    onClick={() => {
                      if (eventDuration === 1 || !eventDuration) {
                        return;
                      } else {
                        setEventDuration(prevEventDuration => prevEventDuration - 1);
                      }
                    }}
                  />
                  <CountInput
                    type="text"
                    value={eventDuration}
                    onChange={(e) => handleEventDuration(e)}
                  />
                  <AddIcon
                    style={{ color: "#4339F2" }}
                    onClick={() => setEventDuration(prevEventDuration => prevEventDuration + 1)}
                  />
                </TimeCount>
              </CountContainer>

              <CountContainer>
                <EventConfig>
                  <h5>Intervalo entre os eventos</h5>
                  <span>{`(em minutos)`}</span>
                </EventConfig>

                <TimeCount>
                  <RemoveIcon
                    onClick={() => {
                      if (eventInterval === 0 || !eventInterval) {
                        return;
                      } else {
                        setEventInterval(prevEventInterval => prevEventInterval - 1);
                      }
                    }}
                  />
                  <CountInput
                    type="text"
                    value={eventInterval}
                    onChange={(e) => handleEventInterval(e)}
                  />
                  <AddIcon
                    style={{ color: "#4339F2" }}
                    onClick={() => setEventInterval(prevEventInterval => prevEventInterval + 1)}
                  />
                </TimeCount>
              </CountContainer>

              <label>Horário de Início do Almoço:</label>
              <Input
                type="time"
                value={lunchStartTime}
                onChange={(e) => setLunchStartTime(e.target.value)}
              />
              <label style={{ marginTop: "20px" }}>Horário de Término do Almoço:</label>
              <Input
                type="time"
                value={lunchEndTime}
                onChange={(e) => setLunchEndTime(e.target.value)}
              />

            </ContentContainer>
          </Accordion>

          <SaveButtonContainer>
            <SaveButton onClick={() => saveCalendar()}>
              {
                isLoading ? <Ring size={30} color="#fff" /> : "Salvar agenda"
              }
            </SaveButton>
          </SaveButtonContainer>

          {/* <ContentContainer style={{ marginTop: 40 }}>
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
          </ContentContainer> */}
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