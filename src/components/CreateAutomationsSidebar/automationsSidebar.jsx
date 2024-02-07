/* eslint-disable react/display-name */
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NodesContainer, NodeDraggable, NodesType, SidebarContainer } from "./automationsSidebar.style";
import { useStateContext } from '../../contexts/ContextProvider';

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

      <NodesType>Mensagens</NodesType>
      <NodesContainer>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'whatsapp', '40')} draggable>
          <WhatsAppIcon style={{ fontSize: "large", color: "#128C7E" }} />
          Zap Msg
        </NodeDraggable>

      </NodesContainer>

    </SidebarContainer>
  );
};