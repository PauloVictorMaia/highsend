import { useState } from "react";
import CustomPageHeader from "../../components/CustomPageHeader";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { scheduleMenu } from "../../data/menus";
import SchedulesList from "./SchedulesList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import api from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";

function Schedules() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();
  const { user } = useStateContext();
  const token = localStorage.getItem('token');

  const createCalendar = async () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
    futureDate.setDate(futureDate.getDate() + 30);
    const format = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00.000Z`;
    };
    const formattedCurrentDate = format(currentDate);
    const formattedFutureDate = format(futureDate);
    const calendar = {
      room: {
        id: uuidv4(),
        type: "oneaone",
        vacancies: 1,
        active: true,
        color: "#ff6699",
        title: "Meu calendario de eventos",
        eventDuration: 40,
        eventInterval: 10
      },
      calendar: {
        lunchStartTime: "12:00",
        lunchEndTime: "13:00",
        type: "daysAhead",
        startDate: formattedCurrentDate,
        endDate: formattedFutureDate,
        eventsIntervals: [
          {
            day: "segunda",
            eventCount: 7,
            eventTimes: [
              {
                start: "09:00",
                end: "09:40"
              },
              {
                start: "09:50",
                end: "10:30"
              },
              {
                start: "10:40",
                end: "11:20"
              },
              {
                start: "13:10",
                end: "13:50"
              },
              {
                start: "14:00",
                end: "14:40"
              },
              {
                start: "14:50",
                end: "15:30"
              },
              {
                start: "15:40",
                end: "16:20"
              }
            ]
          },
          {
            day: "terça",
            eventCount: 7,
            eventTimes: [
              {
                start: "09:00",
                end: "09:40"
              },
              {
                start: "09:50",
                end: "10:30"
              },
              {
                start: "10:40",
                end: "11:20"
              },
              {
                start: "13:10",
                end: "13:50"
              },
              {
                start: "14:00",
                end: "14:40"
              },
              {
                start: "14:50",
                end: "15:30"
              },
              {
                start: "15:40",
                end: "16:20"
              }
            ]
          },
          {
            day: "quarta",
            eventCount: 7,
            eventTimes: [
              {
                start: "09:00",
                end: "09:40"
              },
              {
                start: "09:50",
                end: "10:30"
              },
              {
                start: "10:40",
                end: "11:20"
              },
              {
                start: "13:10",
                end: "13:50"
              },
              {
                start: "14:00",
                end: "14:40"
              },
              {
                start: "14:50",
                end: "15:30"
              },
              {
                start: "15:40",
                end: "16:20"
              }
            ]
          },
          {
            day: "quinta",
            eventCount: 7,
            eventTimes: [
              {
                start: "09:00",
                end: "09:40"
              },
              {
                start: "09:50",
                end: "10:30"
              },
              {
                start: "10:40",
                end: "11:20"
              },
              {
                start: "13:10",
                end: "13:50"
              },
              {
                start: "14:00",
                end: "14:40"
              },
              {
                start: "14:50",
                end: "15:30"
              },
              {
                start: "15:40",
                end: "16:20"
              }
            ]
          },
          {
            day: "sexta",
            eventCount: 7,
            eventTimes: [
              {
                start: "09:00",
                end: "09:40"
              },
              {
                start: "09:50",
                end: "10:30"
              },
              {
                start: "10:40",
                end: "11:20"
              },
              {
                start: "13:10",
                end: "13:50"
              },
              {
                start: "14:00",
                end: "14:40"
              },
              {
                start: "14:50",
                end: "15:30"
              },
              {
                start: "15:40",
                end: "16:20"
              }
            ]
          }
        ],
        daysOfTheWeek: [
          {
            day: "domingo",
            available: false,
            dayValue: 0,
            startTime: "09:00",
            endTime: "17:00"
          },
          {
            day: "segunda",
            available: true,
            dayValue: 1,
            startTime: "09:00",
            endTime: "17:00"
          },
          {
            day: "terça",
            available: true,
            dayValue: 2,
            startTime: "09:00",
            endTime: "17:00"
          },
          {
            day: "quarta",
            available: true,
            dayValue: 3,
            startTime: "09:00",
            endTime: "17:00"
          },
          {
            day: "quinta",
            available: true,
            dayValue: 4,
            startTime: "09:00",
            endTime: "17:00"
          },
          {
            day: "sexta",
            available: true,
            dayValue: 5,
            startTime: "09:00",
            endTime: "17:00"
          },
          {
            day: "sábado",
            available: false,
            dayValue: 6,
            startTime: "09:00",
            endTime: "17:00"
          }
        ],
        daysAhead: "3"
      },
      events: []
    };

    try {
      const response = await api.post(`calendars/create-calendar/${user.id}`, { calendar }, { headers: { authorization: token } })
      if (response.status === 201) {
        navigate(`/dashboard/add-schedule/${response.data.id}`)
      }
    } catch {
      toast.error('Erro ao criar nova agenda.')
    }
  }

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={scheduleMenu}
          name={'Agendas'}
          menuComponent={menuComponent}
          setMenuComponent={setMenuComponent}
          buttonName={'Criar Agenda'}
          button={() => createCalendar()}
        />
      }
    >
      {menuComponent == 0 &&
        <SchedulesList />
      }
    </ContentPageContainer>
  )
}

export default Schedules;