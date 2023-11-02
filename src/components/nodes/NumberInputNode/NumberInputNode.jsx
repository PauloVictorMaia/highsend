/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, MenuInput, MenuButton, CustomToolbar, CloseButton } from "./NumberInputNode.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import NumbersIcon from '@mui/icons-material/Numbers';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

export function NumberInputNode({ data, id, groupID }) {
  const { createNewVariable, variables } = useStateContext();
  const { setNodes } = useReactFlow();
  const [newVariable, setNewVariable] = useState("");
  const [placeholder, setPlaceholder] = useState(data.placeholder || "Digite um número...");
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Enviar");
  const [assignedVariable, setAssignedVariable] = useState(data.variable || "");
  const [minNumber, setMinNumber] = useState(data.min || null);
  const [maxNumber, setMaxNumber] = useState(data.max || null);
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

  const sendNewVariable = async () => {
    try {
      await createNewVariable(newVariable)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMinNumber = (e) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      setMinNumber(null);
    } else {
      setMinNumber(number);
    }
  }

  const handleMaxNumber = (e) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      setMaxNumber(null);
    } else {
      setMaxNumber(number);
    }
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.placeholder = placeholder
              nodeOnBlock.data.buttonLabel = buttonLabel
              nodeOnBlock.data.variable = assignedVariable
              nodeOnBlock.data.min = minNumber
              nodeOnBlock.data.max = maxNumber
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [placeholder, buttonLabel, assignedVariable, minNumber, maxNumber]);

  const handleAssignedVariable = (variableValue) => {
    setAssignedVariable(variableValue);
  }

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

      <InputPreview>
        <NumbersIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>{placeholder}</span>
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
        <span>Placeholder:</span>
        <MenuInput
          type="text"
          placeholder={placeholder}
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <span>Nome do botão:</span>
        <MenuInput
          type="text"
          placeholder={buttonLabel}
          defaultValue={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
        />
        <span>Min:</span>
        <MenuInput
          type="text"
          value={minNumber === null ? "" : minNumber}
          onChange={(e) => handleMinNumber(e)}
        />
        <span>Max:</span>
        <MenuInput
          type="text"
          value={maxNumber === null ? "" : maxNumber}
          onChange={(e) => handleMaxNumber(e)}
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