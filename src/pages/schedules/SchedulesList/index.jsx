
import { Container, ScheduleCard, CardTitle, CardDetails, ButtonCard, ButtonText, TitleContainer, CardColor, DropMenuCard, MenuCardButtons, SwitchContainer, Modal, ModalContent, DeleteCalendar, CloseButton, Buttons, Button } from "./styles";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import SettingsIcon from '@mui/icons-material/Settings';
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
import { Skeleton, Switch } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import clipboardCopy from "clipboard-copy";
import { Ring } from "@uiball/loaders";
import Tooltip from '@mui/material/Tooltip';

function SchedulesList() {
  const [indexDrop, setIndexDrop] = useState(null);
  const navigate = useNavigate();
  const { user, calendarsData, getCalendars, schedulesDataLoaded, loadingCalendars, openMenu } = useStateContext();
  const token = localStorage.getItem('token');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRefs = useRef([]);
  const BASE_URL = `${import.meta.env.VITE_OPEN_FRONT_URL}/agendar-evento/`
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [desativeIsLoading, setDesativeIsLoading] = useState(false);
  const [cloning, setCloning] = useState(false);
  const [indexModal, setIndexModal] = useState(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function cloneCalendar(calendarID) {
    try {
      setCloning(true);
      const response = await api.post(`/calendars/clone-calendar/${user.id}/${calendarID}`, {}, { headers: { authorization: token } });
      if (response.status === 200) {
        getCalendars();
        setCloning(false);
      }
    } catch {
      toast.error('Erro ao clonar agenda.');
      setCloning(false);
    }
  }

  const deleteCalendar = async (calendarID) => {
    try {
      setDeleteIsLoading(true);
      const response = await api.delete(`/calendars/delete-calendar/${user.id}/${calendarID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Agenda excluída.');
        setModalIsVisible(false);
        getCalendars();
        setDeleteIsLoading(false);
      }
    } catch {
      toast.error('Erro ao deletar calendário.');
      setDeleteIsLoading(false);
    }
  };

  async function handleActive(calendarID, active) {
    try {
      setDesativeIsLoading(true);
      const response = await api.patch(`/calendars/handle-active/${user.id}/${calendarID}`, { active }, { headers: { authorization: token } });
      if (modalIsVisible) {
        setModalIsVisible(false);
      }
      if (response.status === 200) {
        getCalendars();
        setDesativeIsLoading(false);
      }
    } catch {
      toast.error('Erro ao desativar agenda.');
      setDesativeIsLoading(false);
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
    <Container openmenu={openMenu}>
      {loadingCalendars &&
        <>
          <Skeleton width={320} height={250} animation="wave" variant="rectangular" style={{ borderRadius: '8px' }} />
          <Skeleton width={320} height={250} animation="wave" variant="rectangular" style={{ borderRadius: '8px' }} />
        </>
      }

      {calendarsData.length >= 1 ? calendarsData.map((calendar, index) => (
        <ScheduleCard onClick={() => navigate(`/dashboard/schedules/edit/${calendar.room.id}`)} key={index} active={calendar.room.active}>
          <TitleContainer>
            <Tooltip title={calendar.room.title}>
              <CardTitle>{calendar.room.title}</CardTitle>
            </Tooltip>
            <ButtonText
              onClick={(event) =>
                handleMenuClick(event, index)}
              hover
              ref={ref => (buttonRefs.current[index] = ref)}
            >
              <SettingsIcon fontSize="100px" />
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
                {cloning ? <Ring color="#333" size={20} /> : <ContentCopyOutlinedIcon />}
                <span>Clonar</span>
              </MenuCardButtons>

              <MenuCardButtons
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal();
                  setIndexModal(index);
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
          <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible && index === indexModal}>
            <ModalContent>
              <CloseButton onClick={() => setModalIsVisible(false)}>
                <ClearIcon />
              </CloseButton>

              <DeleteCalendar>
                <span>Tem certeza que deseja excluir a agenda "{calendar.room.title}" ?</span>
                <Buttons>
                  <Button
                    color="#91D6AC"
                    onClick={() => handleActive(calendar.room.id, false)}
                    disabled={desativeIsLoading}
                  >
                    {desativeIsLoading ? <Ring color="#fff" size={30} /> : "Desativar"}
                  </Button>
                  <Button
                    disabled={deleteIsLoading}
                    color="#ff4d4d"
                    onClick={() => deleteCalendar(calendar.room.id)}
                  >
                    {deleteIsLoading ? <Ring color="#fff" size={30} /> : "Excluir"}
                  </Button>
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