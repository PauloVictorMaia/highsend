/* eslint-disable react/prop-types */
import { BottomHandle, InputConfig, InputPreview, Label, NodeContainer, TopHandle } from "./NumberInputNode.style";
import { Position, useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import useDetachNodes from '../../../useDetachNodes'
import NumbersIcon from '@mui/icons-material/Numbers';

export function NumberInputNode({ selected, data, id }) {
  const { setNodeLabel, setPlaceholder, setButtonLabel } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);

  return (
    <NodeContainer selected={selected} >

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>

      <TopHandle
        id="top"
        type="target"
        position={Position.Top}
      />

      <BottomHandle
        id="bottom"
        type="source"
        position={Position.Bottom}
      />


      <Label defaultValue={data.label} onChange={(e) => setNodeLabel(e.target.value)} />

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