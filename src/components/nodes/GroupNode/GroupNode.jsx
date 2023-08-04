/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { getRectOfNodes, NodeToolbar, useReactFlow, useStore, useStoreApi } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import useDetachNodes from '../../../useDetachNodes';

const lineStyle = { borderColor: 'white' };
const padding = 25;

export default function GroupNode({ id, selected }) {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();
  const { minWidth, minHeight, hasChildNodes } = useStore((store) => {
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
    <div style={{ minWidth: "100%", minHeight: "100%", backgroundColor: "blue" }}>
      <NodeResizer handleStyle={{ width: "5px", height: "5px" }} isVisible={selected} lineStyle={lineStyle} minWidth={minWidth} minHeight={minHeight} />
      <NodeToolbar >
        <button onClick={onDelete}>Delete</button>
        {hasChildNodes && <button onClick={onDetach}>Ungroup</button>}
      </NodeToolbar>
    </div>
  );
}

function isEqual(prev, next) {
  return (
    prev.minWidth === next.minWidth && prev.minHeight === next.minHeight && prev.hasChildNodes === next.hasChildNodes
  );
}

