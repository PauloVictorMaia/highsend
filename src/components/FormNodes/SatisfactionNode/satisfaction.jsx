/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, MenuInput, MenuButton, CustomToolbar, CloseButton } from "./satisfaction.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';


export function Satisfaction({ data, id, groupID }) {
  const { setNodes, deleteElements } = useReactFlow();
  const { createNewVariable, variables, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const [newVariable, setNewVariable] = useState("");
  const [question, setQuestion] = useState(data.question || "Digite a pergunta aqui...");
  const [description, setDescription] = useState(data.description || "");
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Responder");
  const [minNumber, setMinNumber] = useState(data.min || 0);
  const [maxNumber, setMaxNumber] = useState(data.max || 10);
  const [minSubtitle, setMinSubtitle] = useState(data.minSubtitle || "Ruim");
  const [middleSubtitle, setMiddleSubtitle] = useState(data.middleSubtitle || "Regular");
  const [maxSubtitle, setMaxSubtitle] = useState(data.maxSubtitle || "Ótimo");
  const [assignedVariable, setAssignedVariable] = useState(data.variable || "");
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
              nodeOnBlock.data.buttonLabel = buttonLabel
              nodeOnBlock.data.variable = assignedVariable
              nodeOnBlock.data.min = minNumber
              nodeOnBlock.data.max = maxNumber
              nodeOnBlock.data.minSubtitle = minSubtitle
              nodeOnBlock.data.middleSubtitle = middleSubtitle
              nodeOnBlock.data.maxSubtitle = maxSubtitle
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [assignedVariable, question, description, buttonLabel, minNumber, maxNumber, minSubtitle, middleSubtitle, maxSubtitle]);

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

  const sendNewVariable = async () => {
    try {
      await createNewVariable(newVariable)
    } catch (error) {
      return;
    }
  }

  const handleAssignedVariable = (variableValue) => {
    setAssignedVariable(variableValue);
  }

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
        <SentimentSatisfiedAltOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Escala de satisfação</span>
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
          value={description}
          placeholder="Adicione uma descrição caso queira."
          onChange={(e) => setDescription(e.target.value)}
        />

        <span>Nome do botão:</span>
        <MenuInput
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
        />

        <span>Intervalo de:</span>
        <select style={{ marginBottom: "10px" }} value={minNumber} onChange={(e) => setMinNumber(e.target.value)}>
          <option value={0}>0</option>
          <option value={1}>1</option>
        </select>

        <span>Até:</span>
        <select style={{ marginBottom: "10px" }} value={maxNumber} onChange={(e) => setMaxNumber(e.target.value)}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>

        <span>Legenda para valor mínimo:</span>
        <MenuInput
          type="text"
          value={minSubtitle}
          onChange={(e) => setMinSubtitle(e.target.value)}
        />

        <span>Legenda para valor médio:</span>
        <MenuInput
          type="text"
          value={middleSubtitle}
          onChange={(e) => setMiddleSubtitle(e.target.value)}
        />

        <span>Legenda para valor máximo:</span>
        <MenuInput
          type="text"
          value={maxSubtitle}
          onChange={(e) => setMaxSubtitle(e.target.value)}
        />

        <span>Criar nova variável:</span>
        <div>
          <MenuInput
            width="80%"
            type="text"
            placeholder="Defina o nome da nova variável"
            onChange={(e) => setNewVariable(e.target.value)}
          />
          <MenuButton onClick={sendNewVariable}>Criar</MenuButton>
        </div>

        <span>Atribuir variável a esse input</span>
        <select value={assignedVariable} onChange={(e) => handleAssignedVariable(e.target.value)}>
          <option value="">Selecionar variável</option>
          {variables &&
            variables.map((variable, index) => (
              <option key={index} value={variable.id}>{variable.name}</option>
            ))
          }
        </select>
      </InputConfig>

    </NodeContainer>
  )
}