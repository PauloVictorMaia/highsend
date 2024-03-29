/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { NodeToolbar, useReactFlow, Position } from 'reactflow';
import { getId } from '../../../utils';
import { Label, LeftHandle, NodeContainer, RightHandle } from './Group.style';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import WhatsappMessage from '../WhatsappMessageNode/WhatsappMessage';

export default function Group(props) {

  const [nodeLabel, setNodeLabel] = useState(props.data.label)
  const { deleteElements } = useReactFlow();
  const { setNodes, getNodes } = useReactFlow();
  const [blocks, setBlocks] = useState([...props.data.blocks]);
  const [drag, setDrag] = useState(false);
  const id = props.id;
  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
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

  const sensors = useSensors(mouseSensor);

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

  const cloneGroup = () => {
    const nodes = getNodes();
    const node = nodes.find(node => node.id === props.id);

    const clonedBlocks = blocks.map(node => {
      return { ...node, id: getId() };
    });

    const clonedNode = {
      ...node,
      id: getId(),
      position: { x: node.position.x + 260, y: node.position.y + 30 },
      positionAbsolute: {
        x: node.positionAbsolute.x + 260,
        y: node.positionAbsolute.y + 30,
      },
      selected: false,
      data: {
        ...node.data,
        blocks: clonedBlocks,
      },
    };

    setNodes(nds => [...nds, clonedNode]);
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
        />

        <Label defaultValue={props.data.label} onChange={(e) => setNodeLabel(e.target.value)} />

        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((node) => {
            switch (node.type) {

              case 'whatsapp':
                return <WhatsappMessage key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              default:
                return null;
            }
          })}
        </SortableContext>
      </NodeContainer>
    </DndContext>
  );
}