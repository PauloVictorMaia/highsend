/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, MenuInput, CustomToolbar, CloseButton } from "./thank.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';


export function Thank({ data, id, groupID }) {
  const { setNodes, deleteElements } = useReactFlow();
  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const [message, setMessage] = useState(data.message || "Obrigado por participar!");
  const [description, setDescription] = useState(data.description || "");
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
    if (isVisible) {
      setIsVisible(false);
    }
  }, [nodeMenuIsOpen]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.message = message
              nodeOnBlock.data.description = description
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [message, description]);

  const deleteNode = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === groupID) {
          const deletedBlock = node.data.blocks.find(block => block.id === id);
          const deletedBlockHeight = deletedBlock.style.height;
          const updatedBlocks = node.data.blocks.filter((block) => block.id !== id);
          if (updatedBlocks.length === 0) {
            const id = groupID
            deleteElements({ nodes: [{ id }] });
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

      <InputPreview>
        <DoneAllIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Obrigado</span>
      </InputPreview>

      <InputConfig isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }}
        >
          <ClearIcon />
        </CloseButton>
        <span>Mensagem:</span>
        <MenuInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <span>Descrição:</span>
        <MenuInput
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputConfig>

    </NodeContainer>
  )
}