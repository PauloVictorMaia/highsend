/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { getRectOfNodes, NodeToolbar, useReactFlow, useStore, useStoreApi, Position } from 'reactflow';
import useDetachNodes from '../../../useDetachNodes';
import { Label, LeftHandle, RightHandle } from './GroupNode.style';
import { useStateContext } from '../../../contexts/ContextProvider';

const padding = 25;

export default function GroupNode({ id, data }) {
  const { setNodeLabel } = useStateContext();
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();
  const { hasChildNodes } = useStore((store) => {
    const childNodes = Array.from(store.nodeInternals.values()).filter((n) => n.parentNode === id);
    const rect = getRectOfNodes(childNodes);

    return {
      minWidth: rect.width + padding * 2,
      minHeight: rect.height + padding * 2,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const onDetach = () => {
    const childNodeIds = Array.from(store.getState().nodeInternals.values())
      .filter((n) => n.parentNode === id)
      .map((n) => n.id);

    detachNodes(childNodeIds, id);
  };



  return (
    <div
      style={
        {
          minWidth: "100%",
          minHeight: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "0px",
          color: "#000",
          display: "flex",
          flexDirection: "column"
        }
      }
    >

      <NodeToolbar >
        <button onClick={onDelete}>Delete</button>
        {hasChildNodes && <button onClick={onDetach}>Ungroup</button>}
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

    </div>
  );
}

function isEqual(prev, next) {
  return (
    prev.minWidth === next.minWidth && prev.minHeight === next.minHeight && prev.hasChildNodes === next.hasChildNodes
  );
}

