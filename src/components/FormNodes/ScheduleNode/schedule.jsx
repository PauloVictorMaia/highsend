/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, MenuInput, CustomToolbar, CloseButton, InputConfigButton } from "./schedule.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';


export function Schedule({ data, id, groupID }) {
  const { setNodes, deleteElements } = useReactFlow();
  const { nodeMenuIsOpen, setNodeMenuIsOpen, createCalendar, calendarsData } = useStateContext();
  const [question, setQuestion] = useState(data.question || "Digite a pergunta aqui...");
  const [description, setDescription] = useState(data.description || "");
  const [nodeValue, setNodeValue] = useState(data.value || "");
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
              nodeOnBlock.data.question = question
              nodeOnBlock.data.description = description
              nodeOnBlock.data.value = nodeValue
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue, question, description]);

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
        <ScheduleIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Escolha uma agenda...</span>
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
        <span>Pergunta:</span>
        <MenuInput
          type="text"
          placeholder={question}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <span>Descrição:</span>
        <MenuInput
          type="text"
          placeholder="Adicione uma descrição caso queira."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {
          calendarsData && calendarsData.length > 0 ?
            <>
              <span>Escolha uma de suas agendas</span>
              <select style={{ marginBottom: "10px" }} value={nodeValue} onChange={(e) => setNodeValue(e.target.value)}>
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
      </InputConfig>

    </NodeContainer>
  )
}