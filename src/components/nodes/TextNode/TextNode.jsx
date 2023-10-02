/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeContainer } from "./TextNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState, useEffect } from "react";

export function TextNode({ data, id }) {
  const [nodeValue, setNodeValue] = useState(data.value || "")
  const { deleteElements } = useReactFlow();
  const { setNodes } = useReactFlow();
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
    <>
      <NodeContainer value={nodeValue} onChange={(e) => setNodeValue(e.target.value)} />

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#595959',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '3px',
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>
    </>
  )
}

