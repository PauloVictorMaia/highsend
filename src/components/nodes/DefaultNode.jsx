/* eslint-disable react/prop-types */
import { BottomHandle, Label, NodeContainer, TopHandle } from "./DefaultNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";


// eslint-disable-next-line react/prop-types
export function DefaultNode({ selected, data, nodes, setNodes, id }) {
  const { setNodeLabel } = useStateContext();
  const [nodesValue, setNodesValue] = useState(nodes)
  return (
    <NodeContainer selected={selected}>

      <TopHandle
        id="top"
        type="target"
        position={Position.Top}
      />

      <BottomHandle
        id="bottom"
        type="source"
        position={Position.Bottom}
      />


      <Label defaultValue={data.label} onChange={(e) => setNodeLabel(e.target.value)} />

      <input value={data.value} type="textarea" onChange={(e) => e.target.value} />

    </NodeContainer>
  )
}