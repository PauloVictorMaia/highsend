/* eslint-disable react/display-name */
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { NodesContainer, NodeDraggable, NodesType, SidebarContainer } from "./Sidebar.style";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import NumbersIcon from '@mui/icons-material/Numbers';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import PaymentIcon from '@mui/icons-material/Payment';
// import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
// import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

/* eslint-disable react-refresh/only-export-components */
export default () => {
  const onDragStart = (event, nodeType, nodeSubType, height) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/subtype', nodeSubType);
    event.dataTransfer.setData('application/reactflow/height', height);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <NodesType>Mensagens</NodesType>
      <NodesContainer>
        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'textNode', '80')} draggable>
          <TextFieldsIcon style={{ fontSize: "large", color: "#0042DA" }} />
          Texto
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'imageNode', '150')} draggable>
          <PhotoCameraOutlinedIcon style={{ fontSize: "large", color: "#0042DA" }} />
          Imagem
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'videoNode', '150')} draggable>
          <MovieCreationOutlinedIcon style={{ fontSize: "large", color: "#0042DA" }} />
          Video
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'embedNode', '40')} draggable>
          <LanguageIcon style={{ fontSize: "large", color: "#0042DA" }} />
          Embed site
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'audioNode', '40')} draggable>
          <AudioFileOutlinedIcon style={{ fontSize: "large", color: "#0042DA" }} />
          Audio
        </NodeDraggable>

      </NodesContainer>

      <NodesType>Inputs</NodesType>
      <NodesContainer>
        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'textInputNode', '40')} draggable>
          <TextFieldsIcon style={{ fontSize: "large", color: "#E67200" }} />
          Texto
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'numberInputNode', '40')} draggable>
          <NumbersIcon style={{ fontSize: "large", color: "#E67200" }} />
          Numero
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'emailInputNode', '40')} draggable>
          <EmailOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Email
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'websiteInputNode', '40')} draggable>
          <MouseOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Website
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'dateInputNode', '40')} draggable>
          <EditCalendarOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Data
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'phoneInputNode', '40')} draggable>
          <PhoneIphoneOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Telefone
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'buttonInputNode', '40')} draggable>
          <TaskAltOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Botão
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'linkButtonInputNode', '40')} draggable>
          <LinkOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Botão link
        </NodeDraggable>

      </NodesContainer>

      <NodesType>Lógica</NodesType>
      <NodesContainer>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'delayLogicNode', '40')} draggable>
          <TimelapseIcon style={{ fontSize: "large", color: "#9999FF" }} />
          Delay
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'redirectLogicNode', '40')} draggable>
          <LaunchIcon style={{ fontSize: "large", color: "#9999FF" }} />
          Redirect
        </NodeDraggable>

        <NodeDraggable
          onDragStart={(event) => onDragStart(event, 'group', 'whatsappMessageLogicNode', '40')}
          draggable
        >
          <WhatsAppIcon style={{ fontSize: "large", color: "#9999FF" }} />
          Whatsapp msg
        </NodeDraggable>

      </NodesContainer>
    </SidebarContainer>
  );
};
