/* eslint-disable react/prop-types */
import { NodeContainer, TopHandle, BottomHandle, Label, AddLink, LinkInput } from "./EmbedNode.style"
import { useState } from "react";
import { Position } from "reactflow";
import Toolbar from '../../Toolbar/Toolbar'
import { useStateContext } from "../../../contexts/ContextProvider";
import AttachmentIcon from '@mui/icons-material/Attachment';

function EmbedNode({ selected, data, id }) {

  const { setNodeLabel, setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

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

      <AddLink onClick={() => setIsVisible(!isVisible)}>
        <AttachmentIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <span>Show embed</span>
        }
      </AddLink>

      <LinkInput
        isvisible={isVisible ? "true" : "false"}
        type="text"
        value={data.value}
        placeholder="Paste the link"
        onChange={(e) => setNodeValue(e.target.value)}
      />

    </NodeContainer>
  )
}

export default EmbedNode