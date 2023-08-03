/* eslint-disable react/prop-types */
import { NodeContainer, TopHandle, BottomHandle, Label } from "./AudioNode.style"
import { Position } from "reactflow";
import Toolbar from '../../Toolbar/Toolbar'
import { useStateContext } from "../../../contexts/ContextProvider";

function AudioNode({ selected, data, id }) {

  const { setNodeLabel, setNodeValue } = useStateContext();

  const deleteThisNode = () => {
    data.deleteNode(id)
  }


  return (
    <NodeContainer selected={selected}>

      <Toolbar
        deleteFunction={deleteThisNode}
        selected={selected === true ? "true" : "false"}
      />

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

export default AudioNode;