/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { NodeToolbar, useReactFlow, Position } from 'reactflow';
import { getId } from '../../../utils';
import { Label, LeftHandle, NodeContainer, RightHandle } from './GroupNode.style';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { ImageNode } from '../ImageNode/ImageNode';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TextNode } from '../TextNode/TextNode';
import { VideoNode } from '../VideoNode/VideoNode';
import EmbedNode from '../EmbedNode/EmbedNode';
import AudioNode from '../AudioNode/AudioNode';
import { TextInputNode } from '../TextInputNode/TextInputNode';
import { NumberInputNode } from '../NumberInputNode/NumberInputNode';
import { EmailInputNode } from '../EmailInputNode/EmailInputNode';
import { WebsiteInputNode } from '../WebsiteInputNode/WebsiteInputNode';
import { DateInputNode } from '../DateInputNode/DateInputNode';
import { PhoneInputNode } from '../PhoneInputNode/PhoneInputNode';
import LinkButtonInputNode from '../LInkButtonInputNode/LinkButtonInputNode';
import DelayLogicNode from '../DelayLogicNode/DelayLogicNode';
import RedirectLogicNode from '../RedirectLogicNode/RedirectLogicNode';
import WhatsappMessageLogicNode from '../WhatsappMessageLogicNode/WhatsappMessageLogicNode';
import PixelFacebookLogicNode from '../PixelFacebook/PixelFacebookLogicNode';
import WebhookLogicNode from '../WebhookLogicNode/WebhookLogicNode';

export default function GroupNode(props) {

  const [nodeLabel, setNodeLabel] = useState(props.data.label)
  const { deleteElements } = useReactFlow();
  const { setNodes, getEdges, getNodes } = useReactFlow();
  const [blocks, setBlocks] = useState([...props.data.blocks]);
  const [drag, setDrag] = useState(false);
  const id = props.id;
  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
  const [hasButton, setHasButton] = useState(false);
  const dragHandleStyle = {
    color: '#333',
    position: 'absolute',
    right: '10px'
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const sensors = useSensors(mouseSensor)

  useEffect(() => {
    const filteredBlocks = props.data.blocks.filter(blocks => blocks.type !== "buttonInputNode");
    setBlocks(filteredBlocks);
  }, [props]);


  useEffect(() => {
    const nodes = getNodes();
    const node = nodes.find(node => node.id === props.id);
    const filteredBlocks = node.data.blocks.filter(blocks => blocks.type !== "buttonInputNode");
    setBlocks(filteredBlocks);
  }, [drag]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === props.id) {
          node.data.label = nodeLabel
        }
        return node;
      })
    );
  }, [nodeLabel]);

  useEffect(() => {
    const hasButtonNode = blocks.some(node => node.type === "buttonInputNode");
    const edges = getEdges();
    const edge = edges.find(edge => edge.source === id);
    if (hasButtonNode && !hasButton) {
      setHasButton(true);
    } else if (!hasButtonNode && hasButton) {
      setHasButton(false);
    }
    if (hasButtonNode && edge) {
      const id = edge.id;
      deleteElements({ edges: [{ id }] });
    }

  }, [blocks]);

  const cloneGroup = () => {
    setNodes((nodes) => {
      const originalNode = nodes.find((node) => node.id === id);
      const parentNodes = nodes.filter((node) => node.parentNode === id);

      if (!originalNode) {
        return nodes;
      }

      const clonedNode = {
        ...originalNode,
        id: getId(),
        position: { x: originalNode.position.x + 260, y: originalNode.position.y + 30 },
        positionAbsolute: {
          x: originalNode.positionAbsolute.x + 260,
          y: originalNode.positionAbsolute.y + 30,
        },
        selected: false,
        data: {
          ...originalNode.data,
          blocks: [],
        },
      };

      const clonedChildren = parentNodes.map((child) => {
        const clonedChild = {
          ...child,
          id: getId(),
          parentNode: clonedNode.id,
        };

        clonedNode.data.blocks.push(clonedChild.id);

        return clonedChild;
      });

      return [...nodes, clonedNode, ...clonedChildren];
    });
  };

  const handleDragEnd = (e) => {
    const { active, over } = e
    const oldIndex = blocks.findIndex(node => node.id === active.id)
    const newIndex = blocks.findIndex(node => node.id === over.id)

    const newOrder = arrayMove(blocks, oldIndex, newIndex)
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === props.id) {
          node.data.blocks = [...newOrder]
        }
        return node;
      })
    )
    setDrag(!drag);
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >

      <NodeContainer selected={props.selected}>
        <DragIndicatorIcon className="custom-drag-handle" style={dragHandleStyle} />
        <NodeToolbar
          offset={5}
          align='end'
          style={{
            backgroundColor: '#fff',
            color: '#595959',
            border: '0.5px solid rgba(0,0,0,0.15)',
            borderRadius: '3px',
            padding: "5px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60px",
            height: "30px"
          }}
        >
          <ContentCopyIcon style={{ cursor: 'pointer', fontSize: 'medium' }} onClick={() => cloneGroup()} />
          <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={() => onDelete()} />
        </NodeToolbar>

        <LeftHandle
          id="left"
          type="target"
          position={Position.Left}
        />

        <RightHandle
          id="Right"
          type="source"
          position={Position.Right}
          hasbutton={hasButton}
        />

        <Label defaultValue={props.data.label} onChange={(e) => setNodeLabel(e.target.value)} />

        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((node) => {
            switch (node.type) {
              case 'textNode':
                return <TextNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'imageNode':
                return <ImageNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'videoNode':
                return <VideoNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'embedNode':
                return <EmbedNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'audioNode':
                return <AudioNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'textInputNode':
                return <TextInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'numberInputNode':
                return <NumberInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'emailInputNode':
                return <EmailInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'websiteInputNode':
                return <WebsiteInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'dateInputNode':
                return <DateInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'phoneInputNode':
                return <PhoneInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'linkButtonInputNode':
                return <LinkButtonInputNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'delayLogicNode':
                return <DelayLogicNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'redirectLogicNode':
                return <RedirectLogicNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'whatsappMessageLogicNode':
                return <WhatsappMessageLogicNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'pixelFacebookLogicNode':
                return <PixelFacebookLogicNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'webhookLogicNode':
                return <WebhookLogicNode key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              default:
                return null;
            }
          })}
        </SortableContext>
      </NodeContainer>
    </DndContext>
  );
}
