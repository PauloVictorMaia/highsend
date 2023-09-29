/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, AddLink, LinkInput, LinkInputContainer } from "./RedirectNode.style"
import { useState, useEffect } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function RedirectNode({ data, id, selected }) {

  const [nodeValue, setNodeValue] = useState(data.value || "")
  const [buttonName, setButtonName] = useState(data.buttonName || "Ir para link");
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
          node.data.buttonName = buttonName
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
  }, [nodeValue, buttonName]);

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

      <AddLink>
        <LaunchIcon />
        {buttonName}
      </AddLink>

      <LinkInputContainer isvisible={selected}>
        <span>Link</span>
        <LinkInput
          type="text"
          value={nodeValue}
          placeholder="Cole aqui o link de redirecionamento."
          onChange={(e) => setNodeValue(e.target.value)}
        />
        <span>Nome do botão</span>
        <LinkInput
          type="text"
          value={buttonName}
          placeholder="Ex: Ir para link"
          onChange={(e) => setButtonName(e.target.value)}
        />
      </LinkInputContainer>

    </NodeContainer>
  )
}

export default RedirectNode;