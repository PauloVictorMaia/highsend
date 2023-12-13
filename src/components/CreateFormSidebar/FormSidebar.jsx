/* eslint-disable react/display-name */
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BusinessIcon from '@mui/icons-material/Business';
import NumbersIcon from '@mui/icons-material/Numbers';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { NodesContainer, NodeDraggable, NodesType, SidebarContainer } from "./FormSidebar.style";
import { useStateContext } from '../../contexts/ContextProvider';
import DoneAllIcon from '@mui/icons-material/DoneAll';

/* eslint-disable react-refresh/only-export-components */
export default () => {

  const onDragStart = (event, nodeType, nodeSubType, height) => {
    setNodeMenuIsOpen(!nodeMenuIsOpen);
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/subtype', nodeSubType);
    event.dataTransfer.setData('application/reactflow/height', height);
    event.dataTransfer.effectAllowed = 'move';
  };

  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();

  return (
    <SidebarContainer onClick={() => setNodeMenuIsOpen(!nodeMenuIsOpen)}>

      <NodesType>Inputs</NodesType>
      <NodesContainer>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'name', '40')} draggable>
          <TextFieldsIcon style={{ fontSize: "large", color: "#E67200" }} />
          Nome
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'email', '40')} draggable>
          <EmailOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Email
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'shortAnswer', '40')} draggable>
          <ShortTextIcon style={{ fontSize: "large", color: "#E67200" }} />
          Resp curta
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'longAnswer', '40')} draggable>
          <NotesIcon style={{ fontSize: "large", color: "#E67200" }} />
          Resp longa
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'phone', '40')} draggable>
          <PhoneIphoneOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Telefone
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'date', '40')} draggable>
          <EditCalendarOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Data
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'schedule', '40')} draggable>
          <ScheduleIcon style={{ fontSize: "large", color: "#E67200" }} />
          Agenda
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'link', '40')} draggable>
          <LinkOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Link
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'cpf', '40')} draggable>
          <PermIdentityIcon style={{ fontSize: "large", color: "#E67200" }} />
          CPF
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'cnpj', '40')} draggable>
          <BusinessIcon style={{ fontSize: "large", color: "#E67200" }} />
          CNPJ
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'number', '40')} draggable>
          <NumbersIcon style={{ fontSize: "large", color: "#E67200" }} />
          Número
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'address', '40')} draggable>
          <HomeOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Endereço
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'multChoice', '40')} draggable>
          <TaskAltOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Mult esc
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'satisfaction', '40')} draggable>
          <SentimentSatisfiedAltOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Satisfação
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'thank', '40')} draggable>
          <DoneAllIcon style={{ fontSize: "large", color: "#E67200" }} />
          Obrigado
        </NodeDraggable>

      </NodesContainer>

    </SidebarContainer>
  );
};