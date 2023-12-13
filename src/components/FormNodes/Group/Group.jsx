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
import { Name } from '../Name/name';
import { Email } from '../EmailNode/email';
import { ShortAnswer } from '../ShortAnswerNode/shortAnswer';
import { LongAnswer } from '../LongAnswerNode/longAnswer';
import { Phone } from '../PhoneNode/phone';
import { Date } from '../DateNode/date';
import { Schedule } from '../ScheduleNode/schedule';
import { Link } from '../LinkNode/link';
import { Cpf } from '../CpfNode/cpf';
import { Cnpj } from '../CnpjNode/cnpj';
import { Number } from '../NumberNode/number';
import { Address } from '../AddressNode/address';
import { Satisfaction } from '../SatisfactionNode/satisfaction';
import { MultChoice } from '../multChoiceNode/multChoice';
import { Thank } from '../thankNode/thank';

export default function Group(props) {

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
    const hasButtonNode = blocks.some(node => node.type === "button");
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
          hasbutton={hasButton}
        />

        <Label defaultValue={props.data.label} onChange={(e) => setNodeLabel(e.target.value)} />

        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((node) => {
            switch (node.type) {

              case 'name':
                return <Name key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'email':
                return <Email key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'shortAnswer':
                return <ShortAnswer key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'longAnswer':
                return <LongAnswer key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'phone':
                return <Phone key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'date':
                return <Date key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'schedule':
                return <Schedule key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'link':
                return <Link key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'cpf':
                return <Cpf key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'cnpj':
                return <Cnpj key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'number':
                return <Number key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'address':
                return <Address key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'satisfaction':
                return <Satisfaction key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'multChoice':
                return <MultChoice key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              case 'thank':
                return <Thank key={node.id} id={node.id} groupID={props.id} data={node.data} />;

              default:
                return null;
            }
          })}
        </SortableContext>
      </NodeContainer>
    </DndContext>
  );
}