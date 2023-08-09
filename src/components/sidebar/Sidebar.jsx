/* eslint-disable react/display-name */
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { NodesContainer, NodeDraggable, NodesType, SidebarContainer } from "./Sidebar.style";
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import TitleIcon from '@mui/icons-material/Title';
import NumbersIcon from '@mui/icons-material/Numbers';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LanguageIcon from '@mui/icons-material/Language';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

/* eslint-disable react-refresh/only-export-components */
export default () => {
  const onDragStart = (event, nodeType, nodeSubType) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/subtype', nodeSubType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <NodesType>Bubbles</NodesType>
      <NodesContainer>
        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'textNode')} draggable>
          <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "large" }} />
          Text
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'imageNode')} draggable>
          <ImageOutlinedIcon style={{ fontSize: "large" }} />
          Image
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'videoNode')} draggable>
          <TheatersOutlinedIcon style={{ fontSize: "large" }} />
          Video
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'embedNode')} draggable>
          <AttachmentOutlinedIcon style={{ fontSize: "large" }} />
          Embed
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'audioNode')} draggable>
          <HeadphonesOutlinedIcon style={{ fontSize: "large" }} />
          Audio
        </NodeDraggable>


      </NodesContainer>

      <NodesType>Inputs</NodesType>
      <NodesContainer>
        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'textInputNode')} draggable>
          <TitleIcon style={{ fontSize: "large", color: "#E67200" }} />
          Text
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'numberInputNode')} draggable>
          <NumbersIcon style={{ fontSize: "large", color: "#E67200" }} />
          Number
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'emailInputNode')} draggable>
          <AlternateEmailIcon style={{ fontSize: "large", color: "#E67200" }} />
          Email
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'websiteInputNode')} draggable>
          <LanguageIcon style={{ fontSize: "large", color: "#E67200" }} />
          Website
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'dateInputNode')} draggable>
          <DateRangeIcon style={{ fontSize: "large", color: "#E67200" }} />
          Date
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'phoneInputNode')} draggable>
          <LocalPhoneIcon style={{ fontSize: "large", color: "#E67200" }} />
          Phone
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'buttonInputNode')} draggable>
          <CheckBoxOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Button
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'picChoiceInputNode')} draggable>
          <ImageOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Pic choice
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'paymentInputNode')} draggable>
          <PaymentIcon style={{ fontSize: "large", color: "#E67200" }} />
          Payment
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'ratingInputNode')} draggable>
          <StarBorderOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          Rating
        </NodeDraggable>

        <NodeDraggable onDragStart={(event) => onDragStart(event, 'group', 'fileInputNode')} draggable>
          <BackupOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
          File
        </NodeDraggable>

      </NodesContainer>
    </SidebarContainer>
  );
};
