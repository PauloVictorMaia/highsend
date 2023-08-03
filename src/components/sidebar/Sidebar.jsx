/* eslint-disable react/display-name */
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { BubblesContainer, NodeDraggable, NodesType, SidebarContainer } from "./Sidebar.style";
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';

/* eslint-disable react-refresh/only-export-components */
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <NodesType>Bubbles</NodesType>
      <BubblesContainer>
        <NodeDraggable onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
          <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "large" }} />
          Text
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'imageNode')} draggable>
          <ImageOutlinedIcon style={{ fontSize: "large" }} />
          Image
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'videoNode')} draggable>
          <TheatersOutlinedIcon style={{ fontSize: "large" }} />
          Video
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'embedNode')} draggable>
          <AttachmentOutlinedIcon style={{ fontSize: "large" }} />
          Embed
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'audioNode')} draggable>
          <HeadphonesOutlinedIcon style={{ fontSize: "large" }} />
          Audio
        </NodeDraggable>

      </BubblesContainer>
    </SidebarContainer>
  );
};
