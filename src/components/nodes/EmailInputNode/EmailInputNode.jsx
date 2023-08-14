/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer } from "./EmailInputNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function EmailInputNode({ data, id }) {
  const {
    setPlaceholder,
    setButtonLabel,
    createNewVariable,
    variables,
    setAssignedVariable
  } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)
  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const [newVariable, setNewVariable] = useState("")

  const sendNewVariable = async () => {
    try {
      await createNewVariable(newVariable)
    } catch (error) {
      console.log(error)
    }
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

      <InputPreview onClick={() => setIsVisible(!isVisible)}>
        <EmailOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        {data.placeholder ?
          <span>{data.placeholder}</span>
          :
          <span>Type your email...</span>
        }
      </InputPreview>

      <InputConfig isvisible={isVisible ? "true" : "false"}>
        <span>Placeholder:</span>
        <input
          type="text"
          placeholder={data.placeholder ? data.placeholder : "Type your email"}
          defaultValue={data.placeholder ? data.placeholder : "Type your email"}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <span>Button Label:</span>
        <input
          type="text"
          placeholder={data.buttonLabel ? data.buttonLabel : "Send"}
          defaultValue={data.buttonLabel ? data.buttonLabel : "Send"}
          onChange={(e) => setButtonLabel(e.target.value)}
        />
        <span>Create new variable:</span>
        <input
          type="text"
          placeholder="set name of new variable"
          value={newVariable}
          onChange={(e) => setNewVariable(e.target.value)}
        />
        <button onClick={sendNewVariable}>Create</button>

        <span>Assign variable to this input</span>
        <select defaultValue={data.variable ? data.variable : ""} onChange={(e) => setAssignedVariable(e.target.value)}>
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