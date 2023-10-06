
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
import dotenv from 'dotenv';
dotenv.config();

function SchedulesList() {
  const [indexDrop, setIndexDrop] = useState(null);
  const navigate = useNavigate();
  const { user, calendarsData, getCalendars, schedulesDataLoaded } = useStateContext();
  const token = localStorage.getItem('token');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRefs = useRef([]);
  const BASE_URL = `${process.env.OPEN_FRONT_URL}/agendar-evento/`

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      {calendarsData.length >= 1 ? calendarsData.map((calendar, index) => (
        <ScheduleCard onClick={() => navigate(`/dashboard/schedules/edit/${calendar.room.id}`)} key={index} active={calendar.room.active}>
          <TitleContainer>
            <CardTitle>{calendar.room.title}</CardTitle>
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
              {calendar.calendar.type === 'daysAhead' &&
                <div>
                  {
                    `${calendar.calendar.daysAhead}
                    ${calendar.calendar.daysAhead === "1" ? 'dia' : 'dias'} a frente`
                  }
                </div>
              }
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
                </>
              }

              {
                calendar.calendar.type === 'indefinitely' && " Indefinidamente no futuro."
              }

            </CardDetails>
          </div>
          <ButtonCard margin={calendar.calendar.type === 'specificDate' ? '10px' : '35px'}>
            <ButtonText onClick={(e) => {
              e.stopPropagation();
              copyCalendarURL(`${BASE_URL}${user.id}/${calendar.room.id}`)
            }}>
              <CopyAllIcon style={{ color: "#6666ff" }} />
              <span>Copiar Link</span>
            </ButtonText>
            <CardColor color={calendar.room.color}></CardColor>
          </ButtonCard>
          {indexDrop === index &&
            <DropMenuCard
              onClick={(e) => {
                e.stopPropagation();
              }}
              ref={menuRef}>
              <MenuCardButtons onClick={() => navigate(`/dashboard/schedules/edit/${calendar.room.id}`)}>
                <EditOutlinedIcon />
                <span>Edit</span>
              </MenuCardButtons>

              <MenuCardButtons onClick={() => cloneCalendar(calendar.room.id)}>
                <ContentCopyOutlinedIcon />
                <span>Clonar</span>
              </MenuCardButtons>

              <MenuCardButtons
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal();
                }}
              >
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
          <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible}>
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
      ))
        :
        schedulesDataLoaded && <span>Não há agendas. Crie sua primeira agenda!</span>
      }
    </Container>
  )
}

export default SchedulesList;