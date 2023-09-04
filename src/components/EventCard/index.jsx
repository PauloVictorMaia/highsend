/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ButtonContainer, ButtonContent, CancelEvent, CloseButton, Container, Content, DeleteButton, DetailsContainer, EventColor, EventDetails, EventTime, InviteeEmail, Modal, ModalContent, ScheduledTime } from "./styles";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

function EventCard({ color, start, end, eventDuration, inviteeName, inviteeEmail, inviteePhone, cancelEvent, calendarID, eventID }) {

  const [openDetails, setOpenDetails] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const cancelEventAndCloseModal = async (calendarID, eventID) => {
    try {
      await cancelEvent(calendarID, eventID);
      setModalIsVisible(false);
    } catch {
      return;
    }
  }

  return (
    <Container>
      <Modal isvisible={modalIsVisible}>
        <ModalContent>
          <CloseButton onClick={() => setModalIsVisible(false)}>
            <ClearIcon />
          </CloseButton>

          <CancelEvent>
            <span>Tem certeza que deseja cancelar o evento agendado com {inviteeName}?</span>
            <button onClick={() => cancelEventAndCloseModal(calendarID, eventID)}>Cancelar evento</button>
          </CancelEvent>
        </ModalContent>
      </Modal>
      <Content onClick={() => setOpenDetails(!openDetails)}>
        <ScheduledTime>
          <EventColor color={color} />
          <EventTime>
            {`${start} - ${end}`}
          </EventTime>
        </ScheduledTime>
        <EventDetails>
          <h2>{inviteeName}</h2>
          <h4>{`Reunião de ${eventDuration} minutos`}</h4>
        </EventDetails>
        <ButtonContainer>
          <ButtonContent>
            {openDetails ?
              <ArrowDropDownIcon />
              :
              <ArrowRightIcon />
            }
            <span>Detalhes</span>
          </ButtonContent>
        </ButtonContainer>
      </Content>
      {openDetails &&
        <DetailsContainer>
          <span>{`Telefone: ${inviteePhone}`}</span>
          <InviteeEmail>
            <span>{`Email: ${inviteeEmail}`}</span>
          </InviteeEmail>
          <DeleteButton onClick={() => setModalIsVisible(true)}>
            <CancelOutlinedIcon />
            <span>Cancelar</span>
          </DeleteButton>
        </DetailsContainer>
      }
    </Container>
  )
}

export default EventCard;