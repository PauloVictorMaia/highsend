/* eslint-disable react/prop-types */
import { BottomHandle, InputConfig, InputPreview, Label, NodeContainer, TopHandle } from "./TextInputNode.style";
import { Position } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import Toolbar from "../../Toolbar/Toolbar";
import TitleIcon from '@mui/icons-material/Title';

export function TextInputNode({ selected, data, id }) {
  const { setNodeLabel, placeholder, setPlaceholder, buttonLabel, setButtonLabel } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const deleteThisNode = () => {
    data.deleteNode(id)
  }

  return (
    <NodeContainer selected={selected} >

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

      <InputPreview onClick={() => setIsVisible(!isVisible)}>
        <TitleIcon style={{ fontSize: "large", color: "#E67200" }} />
        {data.placeholder ?
          <span>{data.placeholder}</span>
          :
          <span>{placeholder}</span>
        }
      </InputPreview>

      <InputConfig isvisible={isVisible ? "true" : "false"}>
        <span>Placeholder:</span>
        <input
          type="text"
          placeholder={placeholder}
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <span>Button Label:</span>
        <input
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
        />
      </InputConfig>

    </NodeContainer>
  )
}