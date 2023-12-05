/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeToolbar, useReactFlow, Position } from 'reactflow';
import { getId } from '../../../utils';
import { Label, LeftHandle, NodeContainer } from './ButtonsGroup.style';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useEffect } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function ButtonsGroup({ data, id, selected }) {


  const [nodeLabel, setNodeLabel] = useState(data.label)
  const { deleteElements } = useReactFlow();
  const { setNodes, getEdges } = useReactFlow();
  const blocks = [...data.blocks]
  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
  const [hasButton, setHasButton] = useState(false);
  const dragHandleStyle = {
    color: '#333',
    position: 'absolute',
    right: '10px'
  };

  useEffect(() => {
    const parentNodes = blocks.filter((node) => node.parentNode === id);
    const hasButtonNode = parentNodes.some(node => node.type === "button");
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

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data.label = nodeLabel
        }
        return node;
      })
    );
  }, [nodeLabel]);

  return (
    <NodeContainer selected={selected}>
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

      <Label defaultValue={data.label} onChange={(e) => setNodeLabel(e.target.value)} />
    </NodeContainer>
  );
}