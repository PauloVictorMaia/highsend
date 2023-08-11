/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer } from "./WebsiteInputNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import LanguageIcon from '@mui/icons-material/Language';

export function WebsiteInputNode({ data, id }) {
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

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>

      <InputPreview onClick={() => setIsVisible(!isVisible)}>
        <LanguageIcon style={{ fontSize: "large", color: "#E67200" }} />
        {data.placeholder ?
          <span>{data.placeholder}</span>
          :
          <span>Type a URL...</span>
        }
      </InputPreview>

      <InputConfig isvisible={isVisible ? "true" : "false"}>
        <span>Placeholder:</span>
        <input
          type="text"
          placeholder={data.placeholder ? data.placeholder : "Type a URL"}
          defaultValue={data.placeholder ? data.placeholder : "Type a URL"}
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