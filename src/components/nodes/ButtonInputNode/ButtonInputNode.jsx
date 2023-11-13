/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, RightHandle, MenuInput, MenuButton, CustomToolbar, CloseButton, Container } from "./ButtonInputNode.style";
import { useReactFlow, Position } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

export function ButtonInputNode({ data, id, groupID }) {
  const { createNewVariable, variables } = useStateContext();
  const { setNodes } = useReactFlow();
  const [newVariable, setNewVariable] = useState("");
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Click para editar...");
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

  const sendNewVariable = async () => {
    try {
      await createNewVariable(newVariable)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.buttonLabel = buttonLabel
              nodeOnBlock.data.variable = assignedVariable
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [buttonLabel, assignedVariable]);

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
    <Container>

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
          <TaskAltOutlinedIcon style={{ fontSize: "large", color: "#4339F2" }} />
          <MenuInput
            type="text"
            placeholder={buttonLabel}
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            style={{ border: "none", outline: "none" }}
          />
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
      <RightHandle
        id="Right"
        type="source"
        position={Position.Right}
      />
    </Container>
  )
}