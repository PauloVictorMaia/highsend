/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, AddLink, LinkInput } from "./EmbedNode.style"
import { useState, useEffect } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function EmbedNode({ data, id }) {

  const [nodeValue, setNodeValue] = useState(data.value || "")
  const [isVisible, setIsVisible] = useState(false)
  const { setNodes } = useReactFlow();
  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data.value = nodeValue
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === groupID) {
                node.data.blocks = [...parentNodes]
              }
              return node;
            })
          )
        }

        return node;
      })
    );
  }, [nodeValue]);

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
        {nodeValue === "" ?
          <span>Click to edit...</span>
          :
          <span>Show embed</span>
        }
      </AddLink>

      <LinkInput
        isvisible={isVisible ? "true" : "false"}
        type="text"
        value={nodeValue}
        placeholder="Paste the link"
        onChange={(e) => setNodeValue(e.target.value)}
      />

    </NodeContainer>
  )
}

export default EmbedNode