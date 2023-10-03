/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, Delay, Input, InputContainer } from "./DelayLogicNode.style"
import { useState, useEffect } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function DelayLogicNode({ data, id, selected }) {

  const [nodeValue, setNodeValue] = useState(data.value || 2)
  const { setNodes } = useReactFlow();
  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const handleInputChange = (e) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      setNodeValue(null);
    } else {
      setNodeValue(number);
    }
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode;
          const parentNodes = nds.filter((node) => node.parentNode === groupID);
          node.data.value = nodeValue;
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
          color: '#595959',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '3px',
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <Delay>
        <TimelapseIcon />
        {nodeValue === null || nodeValue === 0 ?
          <span>Click para editar...</span>
          :
          <span>{`${nodeValue}s`}</span>
        }
      </Delay>

      <InputContainer isvisible={selected}>
        <span>Segundos de delay</span>
        <Input
          type="text"
          value={nodeValue === null || nodeValue === 0 ? "" : nodeValue}
          onChange={(e) => handleInputChange(e)}
        />
      </InputContainer>

    </NodeContainer>
  )
}

export default DelayLogicNode;