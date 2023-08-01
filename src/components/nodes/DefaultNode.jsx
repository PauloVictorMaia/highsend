/* eslint-disable react/prop-types */
import { BottomHandle, Label, NodeContainer, TopHandle } from "./DefaultNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";
import Toolbar from "../Toolbar/Toolbar";

export function DefaultNode({ selected, data, id }) {
  const { setNodeLabel, setNodeValue } = useStateContext();

  const deleteThisNode = () => {
    data.deleteNode(id)
  }

  return (
    <NodeContainer selected={selected} style={{ minWidth: data.style.minWidth, minHeight: data.style.minHeight }}>

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

      <input defaultValue={data.value} type="textarea" onChange={(e) => setNodeValue(e.target.value)} />

    </NodeContainer>
  )
}