/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer } from "./NumberInputNode.style";
import { useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import useDetachNodes from '../../../useDetachNodes'
import NumbersIcon from '@mui/icons-material/Numbers';

export function NumberInputNode({ data, id }) {
  const { setPlaceholder, setButtonLabel } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);

  return (
    <NodeContainer>

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>

      <InputPreview onClick={() => setIsVisible(!isVisible)}>
        <NumbersIcon style={{ fontSize: "large", color: "#E67200" }} />
        {data.placeholder ?
          <span>{data.placeholder}</span>
          :
          <span>Type a number</span>
        }
      </InputPreview>

      <InputConfig isvisible={isVisible ? "true" : "false"}>
        <span>Placeholder:</span>
        <input
          type="text"
          placeholder={data.placeholder ? data.placeholder : "Type a number"}
          defaultValue={data.placeholder ? data.placeholder : "Type a number"}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <span>Button Label:</span>
        <input
          type="text"
          placeholder={data.buttonLabel ? data.buttonLabel : "Send"}
          defaultValue={data.buttonLabel ? data.buttonLabel : "Send"}
          onChange={(e) => setButtonLabel(e.target.value)}
        />
      </InputConfig>

    </NodeContainer>
  )
}