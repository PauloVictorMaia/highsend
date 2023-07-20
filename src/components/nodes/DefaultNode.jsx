import { NodeContainer, RightHandle, StyledNodeResizer, TopHandle } from "./DefaultNode.style";
import { Position } from "reactflow";


import '@reactflow/node-resizer/dist/style.css'


export function DefaultNode({ selected }) {
  return (
    <NodeContainer>

      <StyledNodeResizer
        isVisible={selected}
      />

      <RightHandle
        id="right"
        type="source"
        position={Position.Right}
      />
      <TopHandle
        id="top"
        type="target"
        position={Position.Top}
      />
    </NodeContainer>
  )
}