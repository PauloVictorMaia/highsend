/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, SwitchContainer, CustomToolbar, CloseButton, InputConfigButton } from "./DateInputNode.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Switch } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

export function DateInputNode({ data, id, groupID }) {
  const { calendarsData, createCalendar, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const [nodeValue, setNodeValue] = useState(data.value || "")
  const { setNodes, deleteElements } = useReactFlow();
  const [interruptFlow, setInterruptFlow] = useState(data.interruptFlow || false);
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
              nodeOnBlock.data.interruptFlow = interruptFlow
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue, interruptFlow]);

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
        <EditCalendarOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Escolha uma agenda...</span>
      </InputPreview>

      <InputConfig isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }
          }>
          <ClearIcon />
        </CloseButton>

        {
          calendarsData && calendarsData.length > 0 ?
            <>
              <span>Escolha uma de suas agendas</span>
              <select value={nodeValue} onChange={(e) => setNodeValue(e.target.value)}>
                <option value="">Selecionar agenda</option>
                {calendarsData &&
                  calendarsData.map((calendar) => (
                    <option key={calendar.room.id} value={calendar.room.id}>{calendar.room.title}</option>
                  ))
                }
              </select>
            </>
            :
            <>
              <span>Você ainda não possui uma agenda.</span>
              <InputConfigButton onClick={() => createCalendar()}>Criar primeira agenda</InputConfigButton>
            </>
        }

        <SwitchContainer>
          <span>Interromper fluxo até o agendamento</span>
          <Switch
            size="small"
            defaultChecked={interruptFlow}
            onChange={() => setInterruptFlow(!interruptFlow)}
          />
        </SwitchContainer>

      </InputConfig>

    </NodeContainer>
  )
}