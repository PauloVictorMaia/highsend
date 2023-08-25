/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Container, ScheduleCard, CardTitle, CardDetails, ButtonCard, ButtonText, TitleContainer, CardColor, DropMenuCard, MenuCardButtons, SwitchContainer, Modal, ModalContent, DeleteCalendar, CloseButton, Buttons, Button } from "./styles";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState, useRef } from "react";
import { months } from "../../../data/menus";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import api from "../../../api";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Switch } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import clipboardCopy from "clipboard-copy";

function SchedulesList() {
  const [indexDrop, setIndexDrop] = useState(null);
  const [calendarsData, setCalendarsData] = useState([]);
  const navigate = useNavigate();
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRefs = useRef([]);
  const BASE_URL = "http://localhost:5173/agendar-evento/"

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getCalendars();
    }
  }, [user]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function getCalendars() {
    try {
      const response = await api.get(`/calendars/get-calendars/${user.id}`, { headers: { authorization: token } });
      if (response.status === 201) {
        setCalendarsData(response.data.filteredCalendars);
      }
    } catch {
      toast.error('Erro ao buscar agendas.');
    }
  }

  async function cloneCalendar(calendarID) {
    try {
      const response = await api.post(`/calendars/clone-calendar/${user.id}/${calendarID}`, {}, { headers: { authorization: token } });
      if (response.status === 200) {
        getCalendars();
      }
    } catch {
      toast.error('Erro ao clonar agenda.');
    }
  }

  const deleteCalendar = async (calendarID) => {
    try {
      const response = await api.delete(`/calendars/delete-calendar/${user.id}/${calendarID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Agenda excluída.');
        setModalIsVisible(false);
        getCalendars();
      }
    } catch {
      toast.error('Erro ao deletar calendário.');
    }
  };

  async function handleActive(calendarID, active) {
    try {
      const response = await api.patch(`/calendars/handle-active/${user.id}/${calendarID}`, { active }, { headers: { authorization: token } });
      if (modalIsVisible) {
        setModalIsVisible(false);
      }
      if (response.status === 200) {
        getCalendars();
      }
    } catch {
      toast.error('Erro ao desativar agenda.');
    }
  }

  const handleMenuClick = (event, index) => {
    event.stopPropagation();
    if (indexDrop !== index) {
      setIndexDrop(index);
    } else {
      setIndexDrop(null);
    }
  };

  const openDeleteModal = () => {
    setIndexDrop(null);
    setModalIsVisible(true);
  };

  const handleClickOutside = event => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRefs.current.some(buttonRef => buttonRef.contains(event.target))
    ) {
      setIndexDrop(null);
    }
  };

  const copyCalendarURL = (url) => {
    try {
      clipboardCopy(url);
      toast.success('Link copiado.');
    } catch {
      toast.error('Erro ao copiar link.');
    }
  }

  return (
    <Container>
      {calendarsData && calendarsData.map((calendar, index) => (
        <ScheduleCard key={index} active={calendar.room.active}>
          <TitleContainer>
            <CardTitle onClick={() => navigate(`/dashboard/add-schedule/${calendar.room.id}`)}>{calendar.room.title}</CardTitle>
            <ButtonText
              onClick={(event) =>
                handleMenuClick(event, index)}
              hover
              ref={ref => (buttonRefs.current[index] = ref)}
            >
              <SettingsApplicationsIcon />
              <ArrowDropDownIcon />
            </ButtonText>
          </TitleContainer>
          <div>
            <CardDetails>{calendar.room.eventDuration} min, Individual</CardDetails>
            <CardDetails marginTop={15}>
              Tempo de agendamento:
              {calendar.calendar.type === 'daysAhead' && ` ${calendar.calendar.daysAhead}
              ${calendar.calendar.daysAhead > 1 ? 'dias' : 'dia'} a frente`}

              {calendar.calendar.type === 'specificDate' &&
                <>
                  <br />
                  <span>de:
                    {' '}{new Date(calendar.calendar.startDate).getDate()}{' '}
                    de {months[new Date(calendar.calendar.startDate).getMonth()]}{' '}
                    de {new Date(calendar.calendar.startDate).getFullYear()}
                  </span>
                  <br />
                  <span>Até:
                    {' '}{new Date(calendar.calendar.endDate).getDate()}{' '}
                    de {months[new Date(calendar.calendar.endDate).getMonth()]}{' '}
                    de {new Date(calendar.calendar.endDate).getFullYear()}
                  </span>
                </>}

            </CardDetails>
          </div>
          <ButtonCard margin={calendar.calendar.type === 'specificDate' ? '10px' : '35px'}>
            <ButtonText>
              <CopyAllIcon style={{ color: "#6666ff" }} />
              <span onClick={() => copyCalendarURL(`${BASE_URL}${user.id}/${calendar.room.id}`)}>Copiar Link</span>
            </ButtonText>
            <CardColor color={calendar.room.color}></CardColor>
          </ButtonCard>
          {indexDrop === index &&
            <DropMenuCard ref={menuRef}>
              <MenuCardButtons onClick={() => navigate(`/dashboard/add-schedule/${calendar.room.id}`)}>
                <EditOutlinedIcon />
                <span>Edit</span>
              </MenuCardButtons>

              <MenuCardButtons onClick={() => cloneCalendar(calendar.room.id)}>
                <ContentCopyOutlinedIcon />
                <span>Clonar</span>
              </MenuCardButtons>

              <MenuCardButtons onClick={() => openDeleteModal()}>
                <DeleteOutlineOutlinedIcon />
                <span>Excluir</span>
              </MenuCardButtons>

              <SwitchContainer>
                <span>on/off</span>
                <Switch
                  size="small"
                  defaultChecked={calendar.room.active}
                  onChange={(e) => handleActive(calendar.room.id, e.target.checked)}
                />
              </SwitchContainer>

            </DropMenuCard>
          }
          <Modal isvisible={modalIsVisible}>
            <ModalContent>
              <CloseButton onClick={() => setModalIsVisible(false)}>
                <ClearIcon />
              </CloseButton>

              <DeleteCalendar>
                <span>Tem certeza que deseja excluir a agenda "{calendar.room.title}" ?</span>
                <Buttons>
                  <Button color="green" onClick={() => handleActive(calendar.room.id, false)}>Desativar</Button>
                  <Button color="red" onClick={() => deleteCalendar(calendar.room.id)}>Excluir</Button>
                </Buttons>
              </DeleteCalendar>
            </ModalContent>
          </Modal>
        </ScheduleCard>
      ))}
    </Container>
  )
}

export default SchedulesList;