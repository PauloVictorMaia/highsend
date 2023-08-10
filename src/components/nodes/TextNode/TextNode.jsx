/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeContainer } from "./TextNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";

export function TextNode({ selected, data, id }) {

  const { setNodeValue } = useStateContext();

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <>
      <NodeContainer type="textarea" selected={selected} defaultValue={data.label ? data.label : "padrao"} onChange={(e) => setNodeValue(e.target.value)} />

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>
    </>
  )
}

