import { NodeContainer } from "./DefaultNode.style";
import { Handle, Position } from "reactflow";


export function DefaultNode(props) {
  return (
    <NodeContainer>
      <Handle id="right" type="source" position={Position.Right} />
      <Handle id="bottom" type="target" position={Position.Bottom} />
    </NodeContainer>
  )
}