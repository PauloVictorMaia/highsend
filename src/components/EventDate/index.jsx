/* eslint-disable react/prop-types */
import { Container } from "./styles";


function EventDate({ date }) {

  const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  const formattedDate = new Date(date);
  const dayOfWeek = days[formattedDate.getDay()];
  const dayOfMonth = formattedDate.getDate();
  const month = months[formattedDate.getMonth()];
  const year = formattedDate.getFullYear();

  return (
    <Container>
      {`${dayOfWeek}, ${dayOfMonth} de ${month} de ${year}`}
    </Container>
  )
}

export default EventDate;