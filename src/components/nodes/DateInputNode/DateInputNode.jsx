/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, IsRangeInputContainer, LabelsInputContainer, NodeContainer } from "./DateInputNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function DateInputNode({ data, id, selected }) {
  const { createNewVariable, variables } = useStateContext();
  const { setNodes } = useReactFlow();
  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const [newVariable, setNewVariable] = useState("")
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Enviar")
  const [assignedVariable, setAssignedVariable] = useState(data.variable || "")
  const [isRange, setIsRange] = useState(data.isRange || false)
  const [hasTime, setHasTime] = useState(data.hasTime || false)
  const [to, setTo] = useState(data.to || 'To')
  const [from, setFrom] = useState(data.from || 'From')

  const sendNewVariable = async () => {
    try {
      await createNewVariable(newVariable)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data = {
            ...node.data,
            buttonLabel: buttonLabel,
            variable: assignedVariable,
            isRange: isRange,
            hasTime: hasTime,
            from: from,
            to: to,
          };
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
  }, [buttonLabel, assignedVariable, isRange, hasTime, to, from]);

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
        <IsRangeInputContainer>
          <span>Com intervalo?</span>
          <input
            type="checkbox"
            checked={isRange}
            onChange={() => setIsRange(!isRange)}
          />
        </IsRangeInputContainer>
        <IsRangeInputContainer>
          <span>Com horário?</span>
          <input
            type="checkbox"
            checked={hasTime}
            onChange={() => setHasTime(!hasTime)}
          />
        </IsRangeInputContainer>
        <LabelsInputContainer isvisible={isRange}>
          <span>De:</span>
          <input
            type="text"
            placeholder={from}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span>Até:</span>
          <input
            type="text"
            placeholder={to}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </LabelsInputContainer>
        <span>Nome do botão:</span>
        <input
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
        />
        <span>Criar nova variável:</span>
        <input
          type="text"
          placeholder="Defina o nome da nova variável"
          onChange={(e) => setNewVariable(e.target.value)}
        />
        <button onClick={sendNewVariable}>Criar</button>

        <span>Atribuir variável a esse input</span>
        <select value={assignedVariable} onChange={(e) => setAssignedVariable(e.target.value)}>
          <option value="">Selecionar variável</option>
          {variables &&
            variables.map((variable, index) => (
              <option key={index} value={variable.id}>{variable.name}</option>
            ))
          }
        </select>
      </InputConfig>

    </NodeContainer>
  )
}