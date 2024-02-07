import { FlagIcon, Label, NodeContainer, StartDiv } from "./Start.style";
import { Position } from "reactflow";
import { RightHandle } from "./Start.style";

// eslint-disable-next-line react/prop-types
export function StartNode({ selected }) {
  return (
    <NodeContainer selected={selected}>

      <RightHandle
        id="right"
        type="source"
        position={Position.Right}
      />

      <Label>Start</Label>

      <StartDiv>
        <FlagIcon />
        <Label>Start</Label>
      </StartDiv>

    </NodeContainer>
  )
}