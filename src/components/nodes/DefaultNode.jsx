import { BottomHandle, Label, NodeContainer, TopHandle } from "./DefaultNode.style";
import { Position } from "reactflow";


// eslint-disable-next-line react/prop-types
export function DefaultNode({ selected }) {
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

      <Label>Default</Label>
    </NodeContainer>
  )
}