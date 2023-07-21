import { FlagIcon, Label, NodeContainer, StartDiv } from "./StartNode.style";
import { Position } from "reactflow";
import { BottomHandle } from "./StartNode.style";


// eslint-disable-next-line react/prop-types
export function StartNode({ selected }) {
  return (
    <NodeContainer selected={selected}>

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