/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { NodeToolbar, useReactFlow, Position } from 'reactflow';
import { getId } from '../../../utils';
import { Label, LeftHandle, NodeContainer, RightHandle } from './GroupNode.style';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { ImageNode } from '../ImageNode/ImageNode';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TextNode } from '../TextNode/TextNode';

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
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

  useEffect(() => {
    setBlocks(props.data.blocks);
  }, [props]);


  useEffect(() => {
    const nodes = getNodes();
    const node = nodes.find(node => node.id === props.id);
    setBlocks(node.data.blocks);
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
    // const parentNodes = blocks.filter((node) => node.parentNode === id);
    // const hasButtonNode = parentNodes.some(node => node.type === "buttonInputNode");
    // const edges = getEdges();
    // const edge = edges.find(edge => edge.source === id);
    // if (hasButtonNode && !hasButton) {
    //   setHasButton(true);
    // } else if (!hasButtonNode && hasButton) {
    //   setHasButton(false);
    // }
    // if (hasButtonNode && edge) {
    //   const id = edge.id;
    //   deleteElements({ edges: [{ id }] });
    // }

    // console.log("Grupo renderizado.")

    // setNodes((nds) =>
    //   nds.map((node) => {
    //     if (node.id === props.id) {
    //       node.data.blocks = [...blocks]
    //     }
    //     return node;
    //   })
    // )

  }, [blocks]);

  const cloneGroup = () => {
    setNodes((nodes) => {
      const originalNode = nodes.find((node) => node.id === props.id);
      const parentNodes = nodes.filter((node) => node.parentNode === props.id);

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

              default:
                return null;
            }
          })}
        </SortableContext>
      </NodeContainer>
    </DndContext>
  );
}
