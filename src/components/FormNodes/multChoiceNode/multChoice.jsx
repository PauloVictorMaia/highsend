/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, MenuInput, MenuButton, CustomToolbar, CloseButton, ConfigContainer, ConfigButtonContainer, ConfigLabel, EditConfigContainer, EditConfigInputs } from "./multChoice.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useStateContext } from "../../../contexts/ContextProvider";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export function MultChoice({ data, id, groupID }) {
  const { setNodes, deleteElements } = useReactFlow();
  const { createNewVariable, variables, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const [newVariable, setNewVariable] = useState("");
  const [question, setQuestion] = useState(data.question || "Digite a pergunta aqui...");
  const [description, setDescription] = useState(data.description || "");
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Responder");
  const [assignedVariable, setAssignedVariable] = useState(data.variable || "");
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState(data.options || []);
  const [optionsIsVisible, setOptionsIsVisible] = useState(true);
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
              nodeOnBlock.data.options = options
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [buttonLabel, assignedVariable, question, description, options]);

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

  const addNewOption = () => {
    const newOption = {
      id: uuidv4(),
      value: ""
    }

    setOptions((options) => [...options, newOption]);

  }

  const handleOptionValue = (id, value) => {
    const updatedOptions = options.map((option) => {

      if (option.id === id) {
        return { ...option, value: value };
      }

      return option;
    });

    setOptions(updatedOptions);
  }

  const deleteOption = (id) => {
    const newOptionsArray = options.filter(param => param.id !== id);
    setOptions(newOptionsArray);
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
        <TaskAltOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
        <span>Multipla escolha</span>
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

        <span>Nome do botão:</span>
        <MenuInput
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
        />

        <ConfigContainer>
          <ConfigLabel onClick={() => setOptionsIsVisible(!optionsIsVisible)}>
            <span>Opções</span>
            {optionsIsVisible ?
              <KeyboardArrowUpIcon />
              :
              <KeyboardArrowDownIcon />
            }
          </ConfigLabel>

          {
            optionsIsVisible &&
            <>
              {
                options && options.length > 0 &&
                options.map((option) => (
                  <EditConfigContainer key={option.id}>
                    <DeleteOutlineIcon onClick={() => deleteOption(option.id)} />
                    <EditConfigInputs>
                      <span>Opção</span>
                      <input
                        type="text"
                        value={option.value}
                        onChange={(e) => handleOptionValue(option.id, e.target.value)}
                      />
                    </EditConfigInputs>
                  </EditConfigContainer>
                ))
              }
              <ConfigButtonContainer>
                <button onClick={() => addNewOption()}>Adicionar</button>
              </ConfigButtonContainer>
            </>
          }
        </ConfigContainer>

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