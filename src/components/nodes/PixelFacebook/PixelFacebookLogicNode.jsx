/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, NodePreview, InputContainer, Navigation, ListTabs, Tabs, Inputs, Textarea } from "./PixelFacebookLogicNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

function PixelFacebookLogicNode({ data, id, selected }) {

  const [nodeValue, setNodeValue] = useState(data.value || "");
  const [tab, setTab] = useState("pixel");
  const { deleteElements } = useReactFlow();
  const { setNodes } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data.value = nodeValue
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
  }, [nodeValue]);

  return (
    <NodeContainer>

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#595959',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '3px',
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <NodePreview>
        <FacebookOutlinedIcon />
        {
          nodeValue === "" ?
            "Click para adicionar pixel"
            :
            "Editar pixel"
        }
      </NodePreview>

      <InputContainer isvisible={selected}>
        <Navigation>
          <ListTabs>
            <Tabs
              onClick={() => setTab("pixel")}
              activetab={tab === "pixel"}
            >
              Pixel
            </Tabs>
          </ListTabs>
        </Navigation>
        <Inputs>

          <Textarea
            type="text"
            placeholder="Cole aqui o pixel do Facebook"
            value={nodeValue}
            onChange={(e) => setNodeValue(e.target.value)}
          />

        </Inputs>
      </InputContainer>

    </NodeContainer>
  )
}

export default PixelFacebookLogicNode;