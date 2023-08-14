/* eslint-disable react/prop-types */
import { NodeContainer, AddLink, LinkInput } from "./EmbedNode.style"
import { useState } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function EmbedNode({ data, id }) {

  const { setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <NodeContainer>

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#000',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '8px',

        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <AddLink onClick={() => setIsVisible(!isVisible)}>
        <LinkOutlinedIcon />
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