/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, NodePreview, InputContainer, Navigation, ListTabs, Tabs, Inputs, Textarea, CloseButton, CustomToolbar } from "./PixelFacebookLogicNode.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

function PixelFacebookLogicNode({ data, id, groupID }) {

  const [nodeValue, setNodeValue] = useState(data.value || "");
  const [tab, setTab] = useState("pixel");
  const { setNodes } = useReactFlow();
  const [isVisible, setIsVisible] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px"
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.value = nodeValue
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue]);

  const deleteNode = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === groupID) {
          const updatedBlocks = node.data.blocks.filter((block) => block.id !== id);
          if (updatedBlocks.length === 0) {
            return null;
          }
          return {
            ...node,
            data: {
              ...node.data,
              blocks: updatedBlocks,
            },
          };
        }
        return node;
      }).filter(Boolean);
    });
  };

  return (
    <NodeContainer
      onClick={() => setIsVisible(!isVisible)}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >

      <CustomToolbar
        isvisible={isVisible}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={() => deleteNode()} />
      </CustomToolbar>

      <NodePreview>
        <FacebookOutlinedIcon />
        {
          nodeValue === "" ?
            "Click para adicionar pixel"
            :
            "Editar pixel"
        }
      </NodePreview>

      <InputContainer isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }}
        >
          <ClearIcon />
        </CloseButton>
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