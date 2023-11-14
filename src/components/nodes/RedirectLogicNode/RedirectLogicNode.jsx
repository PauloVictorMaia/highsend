/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, AddLink, LinkInput, LinkInputContainer, CustomToolbar, CloseButton } from "./RedirectLogicNode.style"
import { useState, useEffect } from "react";
import { useReactFlow } from "reactflow";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';
import { useStateContext } from "../../../contexts/ContextProvider";

function RedirectLogicNode({ data, id, groupID }) {

  const [nodeValue, setNodeValue] = useState(data.value || "")
  const { setNodes } = useReactFlow();
  const [isVisible, setIsVisible] = useState(false);
  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
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

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [nodeMenuIsOpen]);

  const deleteNode = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === groupID) {
          const deletedBlock = node.data.blocks.find(block => block.id === id);
          const deletedBlockHeight = deletedBlock.style.height;
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
            style: {
              width: 250,
              height: node.style.height - deletedBlockHeight - 10,
              padding: '0px',
              borderRadius: '8px',
              border: "none"
            }
          };
        }
        return node;
      }).filter(Boolean);
    });
  };

  const openMenu = () => {
    if (isVisible) {
      setIsVisible(false);
      return;
    }
    setNodeMenuIsOpen(!nodeMenuIsOpen);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }

  return (
    <NodeContainer
      onClick={() => openMenu()}
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

      <AddLink>
        <LaunchIcon />
        Redirect
      </AddLink>

      <LinkInputContainer isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }
          }>
          <ClearIcon />
        </CloseButton>
        <span>Link</span>
        <LinkInput
          type="text"
          value={nodeValue}
          placeholder="Cole aqui o link de redirecionamento."
          onChange={(e) => setNodeValue(e.target.value)}
        />
      </LinkInputContainer>

    </NodeContainer>
  )
}

export default RedirectLogicNode;