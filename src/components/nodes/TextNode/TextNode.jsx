/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeContainer } from "./TextNode.style";
import { useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import useDetachNodes from '../../../useDetachNodes'

export function TextNode({ selected, data, id }) {
  const { setNodeValue } = useStateContext();

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);


  return (
    <>
      <NodeContainer type="textarea" selected={selected} defaultValue={data.label ? data.label : "padrao"} onChange={(e) => setNodeValue(e.target.value)} />

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>
    </>
  )
}

