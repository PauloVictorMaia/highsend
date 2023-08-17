/* eslint-disable react/prop-types */
import { Container, ScheduleCard, CardTitle, CardDetails, ButtonCard, ButtonText, TitleContainer, CardColor, DropMenuCard } from "./styles";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from "react";
import { calendars } from "../../../data/calendar";
import { months } from "../../../data/menus";

function SchedulesList() {
  const [indexDrop, setIndexDrop] = useState(null);
  const [calendarsData, setCalendarsData] = useState([]);

  useEffect(() => {
    setCalendarsData(calendars);
  }, [])

  const openMenuDropDown = (index) => {
    if (index === indexDrop) return setIndexDrop(null);
    setIndexDrop(index);
  };

  return (
    <Container>
      {calendarsData.map((calendar, index) => (
        <ScheduleCard key={index}>
          <TitleContainer>
            <CardTitle>{calendar.room.title}</CardTitle>
            <ButtonText onClick={() => openMenuDropDown(index)} hover>
              <SettingsApplicationsIcon />
              <ArrowDropDownIcon />
            </ButtonText>
          </TitleContainer>
          <div>
            <CardDetails>{calendar.room.eventDuration} min, Individual</CardDetails>
            <CardDetails marginTop={15}>
              Tempo de agendamento: 
              {calendar.calendar.type === 'daysAhead' && ` ${calendar.calendar.daysAhead}
              ${calendar.calendar.daysAhead > 1? 'dias' : 'dia'} a frente`}

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
          <ButtonCard margin={calendar.calendar.type === 'specificDate'}>
            <ButtonText>
              <CopyAllIcon style={{ color: "#6666ff" }} />
              <span>Copiar Link</span>
            </ButtonText>
            <CardColor color={calendar.room.color}></CardColor>
          </ButtonCard>
          {indexDrop === index &&
            <DropMenuCard>
              a
            </DropMenuCard>
          }
        </ScheduleCard>
      ))}
    </Container>
  )
}

export default SchedulesList;