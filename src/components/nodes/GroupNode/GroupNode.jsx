/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeToolbar, useReactFlow, Position } from 'reactflow';

import { Label, LeftHandle, NodeContainer, RightHandle } from './GroupNode.style';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function GroupNode({ id, data, selected }) {
  const { setNodeLabel } = useStateContext();
  const { deleteElements } = useReactFlow();

  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <NodeContainer selected={selected}>
      <NodeToolbar >
        <button onClick={onDelete}>Delete</button>
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
