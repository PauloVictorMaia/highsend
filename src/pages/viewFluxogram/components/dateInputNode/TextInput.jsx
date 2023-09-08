import ScheduleEvent from '../../../scheduleEvent';
import { Container } from './styles';

function DateInputNode({ data, onSend, onChange, variables }) {

  return (
    <Container>
      <ScheduleEvent onSend={onSend} userId={"6bd89158-c9c0-4c03-97b8-8a29bc128a6a"} calendarId={"a4ab440c-2797-4d44-980d-a360679ef43b"} />
    </Container>
  );
}

export default DateInputNode;
