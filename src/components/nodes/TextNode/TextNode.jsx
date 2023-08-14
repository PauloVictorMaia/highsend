/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeContainer } from "./TextNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function TextNode({ selected, data, id }) {

  const { setNodeValue } = useStateContext();

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <>
      <NodeContainer type="textarea" selected={selected} defaultValue={data.label ? data.label : "padrao"} onChange={(e) => setNodeValue(e.target.value)} />

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
    </>
  )
}

