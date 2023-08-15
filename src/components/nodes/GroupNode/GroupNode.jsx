/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeToolbar, useReactFlow, Position } from 'reactflow';

import { Label, LeftHandle, NodeContainer, RightHandle } from './GroupNode.style';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState, useEffect } from 'react';

export default function GroupNode({ id, data, selected }) {
  const [nodeLabel, setNodeLabel] = useState(data.label)
  const { deleteElements } = useReactFlow();
  const { setNodes } = useReactFlow();

  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
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

        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
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

      <Label defaultValue={data.label} onChange={(e) => setNodeLabel(e.target.value)} />
    </NodeContainer>
  );
}
