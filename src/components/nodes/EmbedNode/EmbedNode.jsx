/* eslint-disable react/prop-types */
import { NodeContainer, AddLink, LinkInput } from "./EmbedNode.style"
import { useState } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import AttachmentIcon from '@mui/icons-material/Attachment';

function EmbedNode({ data, id }) {

  const { setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <NodeContainer>

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>

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