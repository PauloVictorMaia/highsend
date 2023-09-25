import ScheduleEvent from '../../../scheduleEvent';
import { Container } from './styles';

function DateInputNode({ onSend, data }) {

  return (
    <Container>
      <ScheduleEvent 
       onSend={onSend}
       userId={"0519222c-ad01-420c-a3ee-8b469a314df4"}
       calendarId={"c105ddee-4fcd-4622-8e41-31aeef9e8b41"}
      />
    </Container>
  );
}

export default DateInputNode;
