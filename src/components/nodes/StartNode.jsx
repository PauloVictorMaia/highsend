import { FlagIcon, Label, NodeContainer, StartDiv } from "./StartNode.style";
import { Position } from "reactflow";
import { BottomHandle } from "./StartNode.style";


export function StartNode() {
  return (
    <NodeContainer>

      <BottomHandle
        id="bottom"
        type="source"
        position={Position.Bottom}
      />

      <Label>Start</Label>

      <StartDiv>
        <FlagIcon />
        <Label>Start</Label>
      </StartDiv>

    </NodeContainer>
  )
}