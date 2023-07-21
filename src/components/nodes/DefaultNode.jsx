/* eslint-disable react/prop-types */
import { BottomHandle, Label, NodeContainer, TopHandle } from "./DefaultNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";


// eslint-disable-next-line react/prop-types
export function DefaultNode({ selected, data }) {
  const { setNodeLabel } = useStateContext();
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

    </NodeContainer>
  )
}