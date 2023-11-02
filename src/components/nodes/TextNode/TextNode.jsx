/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { NodeContainer, CustomToolbar, Container } from "./TextNode.style";
import { useReactFlow } from "reactflow";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export function TextNode({ data, id, groupID }) {

  const [nodeValue, setNodeValue] = useState(data.value || "");
  const [isVisible, setIsVisible] = useState(false);
  const { setNodes } = useReactFlow();
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

  const handleVisibility = () => {
    setTimeout(() => {
      setIsVisible(false)
    }, 100);
  }

  return (
    <Container
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <NodeContainer
        value={nodeValue}
        onChange={(e) => setNodeValue(e.target.value)}
        onFocus={() => setIsVisible(true)}
        onBlur={handleVisibility}
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

