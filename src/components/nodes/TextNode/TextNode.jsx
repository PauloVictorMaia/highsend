/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { CustomToolbar, Container, StyledTextarea } from "./TextNode.style";
import { useReactFlow } from "reactflow";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useStateContext } from "../../../contexts/ContextProvider";

export function TextNode({ data, id, groupID }) {

  const [nodeValue, setNodeValue] = useState(data.value || "");
  const [isVisible, setIsVisible] = useState(false);
  const { setNodes } = useReactFlow();
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

  const handleVisibility = () => {
    setTimeout(() => {
      setIsVisible(false)
    }, 100);
  }

  const handleEditorChange = (content) => {
    setNodeValue(content);
  };

  return (
    <Container
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      onFocus={() => openMenu()}
      isvisible={isVisible}
    >
      <StyledTextarea
        value={nodeValue}
        onChange={handleEditorChange}
        onFocus={() => openMenu()}
        onBlur={handleVisibility}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike']
          ],
        }}
      />

      <CustomToolbar
        isvisible={isVisible}
      >
        <DeleteOutlineIcon
          style={{ cursor: 'pointer', fontSize: 'large' }}
          onClick={(e) => {
            e.stopPropagation();
            deleteNode()
          }
          }
        />
      </CustomToolbar>

    </Container>
  )
}

