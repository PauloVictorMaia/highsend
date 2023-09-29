/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer } from "./DateInputNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function DateInputNode({ data, id, selected }) {
  const { calendarsData, createCalendar } = useStateContext();
  const [nodeValue, setNodeValue] = useState(data.value || "")
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

      <InputPreview>
        <EditCalendarOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Escolha uma data...</span>
      </InputPreview>

      <InputConfig isvisible={selected}>

        {
          calendarsData && calendarsData.length > 0 ?
            <>
              <span>Escolha uma de suas agendas</span>
              <select value={nodeValue} onChange={(e) => setNodeValue(e.target.value)}>
                <option value="">Selecionar agenda</option>
                {calendarsData &&
                  calendarsData.map((calendar) => (
                    <option key={calendar.room.id} value={calendar.room.id}>{calendar.room.title}</option>
                  ))
                }
              </select>
            </>
            :
            <>
              <span>Você ainda não possui uma agenda.</span>
              <button onClick={() => createCalendar()}>Criar primeira agenda</button>
            </>
        }

      </InputConfig>

    </NodeContainer>
  )
}