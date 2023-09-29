/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeToolbar, useReactFlow, Position } from 'reactflow';
import { getId } from '../../../utils';
import { Label, LeftHandle, NodeContainer, RightHandle } from './GroupNode.style';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useEffect } from 'react';

export default function GroupNode({ data, id, selected }) {
  const [nodeLabel, setNodeLabel] = useState(data.label)
  const { deleteElements } = useReactFlow();
  const { setNodes } = useReactFlow();
  const blocks = [...data.blocks]
  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
  const [hasButton, setHasButton] = useState(false);

  useEffect(() => {
    const parentNodes = blocks.filter((node) => node.parentNode === id);
    const hasButtonNode = parentNodes.some(node => node.type === "buttonInputNode");
    if (hasButtonNode && !hasButton) {
      setHasButton(true);
    } else if (!hasButtonNode && hasButton) {
      setHasButton(false);
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
      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#000',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '8px',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "45px",
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

      {
        hasButton === false &&
        <RightHandle
          id="Right"
          type="source"
          position={Position.Right}
        />
      }

      <Label defaultValue={data.label} onChange={(e) => setNodeLabel(e.target.value)} />
    </NodeContainer>
  );
}
