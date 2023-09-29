/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, Delay, Input, InputContainer } from "./DelayLogicNode.style"
import { useState, useEffect } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function DelayLogicNode({ data, id, selected }) {

  const [nodeValue, setNodeValue] = useState(data.value || null)
  const { setNodes } = useReactFlow();
  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const handleInputChange = (e) => {
    // Remove qualquer caractere não numérico usando uma expressão regular
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
    setNodeValue(sanitizedValue);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode;
          const parentNodes = nds.filter((node) => node.parentNode === groupID);
          const valueToNumber = parseInt(nodeValue);
          node.data.value = valueToNumber;
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === groupID) {
                node.data.blocks = [...parentNodes];
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

      <Delay>
        <TimelapseIcon />
        {nodeValue === null ?
          <span>Click para editar...</span>
          :
          <span>{`${nodeValue}s`}</span>
        }
      </Delay>

      <InputContainer isvisible={selected}>
        <span>Segundos de delay</span>
        <Input
          type="text"
          value={nodeValue}
          onChange={(e) => handleInputChange(e)}
        />
      </InputContainer>

    </NodeContainer>
  )
}

export default DelayLogicNode;