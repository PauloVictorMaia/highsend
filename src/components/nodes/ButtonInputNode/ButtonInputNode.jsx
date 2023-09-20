/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, MultipleChoiceInput, NodeContainer, RightHandle } from "./ButtonInputNode.style";
import { useReactFlow, NodeToolbar, Position } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function ButtonInputNode({ data, id, selected }) {
  const { createNewVariable, variables } = useStateContext();
  const { setNodes } = useReactFlow();
  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const [newVariable, setNewVariable] = useState("")
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Click para editar...")
  const [assignedVariable, setAssignedVariable] = useState(data.variable || "")
  const [multipleChoice, setMultipleChoice] = useState(data.multipleChoice || false)

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
            multipleChoice: multipleChoice,
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
  }, [buttonLabel, assignedVariable, multipleChoice]);

  const handleAssignedVariable = (variableValue) => {
    setAssignedVariable(variableValue);
  }

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

      <RightHandle
        id="Right"
        type="source"
        position={Position.Right}
      />

      <InputPreview>
        <TaskAltOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <input
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
          style={{ border: "none", outline: "none" }}
        />
      </InputPreview>

      <InputConfig isvisible={selected}>
        <MultipleChoiceInput>
          <span>Multipla escolha?</span>
          <input
            type="checkbox"
            checked={multipleChoice}
            onChange={() => setMultipleChoice(!multipleChoice)}
          />
        </MultipleChoiceInput>
        <span>Criar nova variável:</span>
        <input
          type="text"
          placeholder="Defina o nome da nova variável"
          onChange={(e) => setNewVariable(e.target.value)}
        />
        <button onClick={sendNewVariable}>Criar</button>

        <span>Atribuir variável a esse input</span>
        <select value={assignedVariable} onChange={(e) => handleAssignedVariable(e.target.value)}>
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