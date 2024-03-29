/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputConfig, InputPreview, NodeContainer, MenuInput, MenuButton, CustomToolbar, CloseButton } from "./PhoneInputNode.style";
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import countries from 'countries-list';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

export function PhoneInputNode({ data, id, groupID }) {
  const { createNewVariable, variables, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const variablePhone = variables.find(variable => variable.name === 'phone' || variable.name === 'Telefone');
  const variablePhoneId = variablePhone.id;
  const { setNodes, deleteElements } = useReactFlow();
  const [newVariable, setNewVariable] = useState("");
  const [placeholder, setPlaceholder] = useState(data.placeholder || "Número de telefone...");
  const [buttonLabel, setButtonLabel] = useState(data.buttonLabel || "Enviar");
  const [assignedVariable, setAssignedVariable] = useState(data.variable || variablePhoneId);
  const [retryMessage, setRetryMessage] = useState(data.retryMessage || "Esse não é um número de telefone válido.");
  const [phoneCode, setPhoneCode] = useState(data.phoneCode || "+55");
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

  const countryCodes = Object.keys(countries.countries).map((countryCode) => {
    const country = countries.countries[countryCode];
    return { label: `${country.name} (+${country.phone})`, code: `+${country.phone}` };
  });

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.placeholder = placeholder
              nodeOnBlock.data.buttonLabel = buttonLabel
              nodeOnBlock.data.variable = assignedVariable
              nodeOnBlock.data.retryMessage = retryMessage
              nodeOnBlock.data.phoneCode = phoneCode
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [placeholder, buttonLabel, assignedVariable, retryMessage, phoneCode]);

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [nodeMenuIsOpen]);

  const handleAssignedVariable = (variableValue) => {
    setAssignedVariable(variableValue);
  }

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
        <PhoneIphoneOutlinedIcon style={{ fontSize: "large", color: "#E67200" }} />
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
          maxLength={25}
        />
        <span>Nome do botão:</span>
        <MenuInput
          type="text"
          placeholder={buttonLabel}
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
          maxLength={10}
        />
        <span>País padrão:</span>
        <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
          <option value="">Selecione o código do país</option>
          {countryCodes &&
            countryCodes.map((country, index) => (
              <option key={index} value={country.code}>{country.label}</option>
            ))
          }
        </select>
        <span>Mensagem de nova tentativa:</span>
        <MenuInput
          type="text"
          placeholder={retryMessage}
          value={retryMessage}
          onChange={(e) => setRetryMessage(e.target.value)}
          maxLength={50}
        />
        <span>Criar nova variável:</span>
        <div>
          <MenuInput
            width="80%"
            type="text"
            placeholder="Defina o nome da nova variável"
            onChange={(e) => setNewVariable(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendNewVariable();
              }
            }}
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