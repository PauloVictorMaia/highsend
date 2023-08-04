/* eslint-disable react/prop-types */
import { NodeContainer, TopHandle, BottomHandle, Label, AddLink, LinkInput } from "./EmbedNode.style"
import { useState } from "react";
import { Position, useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import AttachmentIcon from '@mui/icons-material/Attachment';
import useDetachNodes from '../../../useDetachNodes'

function EmbedNode({ selected, data, id }) {

  const { setNodeLabel, setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);

  return (
    <NodeContainer selected={selected}>

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>

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