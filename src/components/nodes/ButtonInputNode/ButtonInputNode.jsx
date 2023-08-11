/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, RightHandle } from "./ButtonInputNode.style";
import { useReactFlow, NodeToolbar, Position } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export function ButtonInputNode({ data, id }) {
  const {
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

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>

      <RightHandle
        id="Right"
        type="source"
        position={Position.Right}
      />

      <InputPreview onClick={() => setIsVisible(!isVisible)}>
        <CheckBoxOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Click to edit</span>
      </InputPreview>

      <InputConfig isvisible={isVisible ? "true" : "false"}>
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