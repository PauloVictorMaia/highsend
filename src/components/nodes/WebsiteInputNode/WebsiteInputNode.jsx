/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer } from "./WebsiteInputNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function WebsiteInputNode({ data, id }) {
  const { createNewVariable, variables } = useStateContext();
  const { setNodes } = useReactFlow();
  const [isVisible, setIsVisible] = useState(false)
  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const [newVariable, setNewVariable] = useState("")
  const [placeholder, setPlaceholder] = useState(data.placeholder || "Type a URL...")
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Send")
  const [assignedVariable, setAssignedVariable] = useState(data.variable || "")
  const [retryMessage, setRetryMessage] = useState(data.retryMessage || "This URL doesn't seem to be valid. Can you type it again?")

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
            placeholder: placeholder,
            buttonLabel: buttonLabel,
            variable: assignedVariable,
            retryMessage: retryMessage,
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
  }, [placeholder, buttonLabel, assignedVariable, retryMessage]);

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

      <InputPreview onClick={() => setIsVisible(!isVisible)}>
        <MouseOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>{placeholder}</span>
      </InputPreview>

      <InputConfig isvisible={isVisible ? "true" : "false"}>
        <span>Placeholder:</span>
        <input
          type="text"
          placeholder={placeholder}
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <span>Button Label:</span>
        <input
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
        />
        <span>Retry message:</span>
        <input
          type="text"
          placeholder={retryMessage}
          value={retryMessage}
          onChange={(e) => setRetryMessage(e.target.value)}
        />
        <span>Create new variable:</span>
        <input
          type="text"
          placeholder="set name of new variable"
          onChange={(e) => setNewVariable(e.target.value)}
        />
        <button onClick={sendNewVariable}>Create</button>

        <span>Assign variable to this input</span>
        <select value={assignedVariable} onChange={(e) => setAssignedVariable(e.target.value)}>
          <option value="">Select variable</option>
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