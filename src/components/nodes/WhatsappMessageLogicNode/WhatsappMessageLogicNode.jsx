/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useReactFlow } from "reactflow";
import { Label, NodeContainer, InputConfig, MessageInput, CustomToolbar, CloseButton, InputConfigButton } from "./WhatsappMessageLogicNode.style";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

function WhatsappMessageLogicNode({ data, id, groupID }) {

  const { setNodes, deleteElements } = useReactFlow();
  const [nodeValue, setNodeValue] = useState(data.value || "");
  const [message, setMessage] = useState(data.message || "");
  const { integrations, variables, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const variablePhone = variables.filter(variable => variable.name === 'Telefone');
  const [assignedVariable, setAssignedVariable] = useState(data.variable || variablePhone[0].id);
  const whatsappIntegrations = integrations.filter(integrations => integrations.type === 'whatsapp');
  const navigate = useNavigate();
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
              nodeOnBlock.data.message = message
              nodeOnBlock.data.variable = assignedVariable
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue, message, assignedVariable]);

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [nodeMenuIsOpen]);

  const createWhatsappIntegration = () => {
    navigate('/dashboard/integrations');
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

      <Label>
        <WhatsAppIcon style={{ fontSize: "large", color: "#9999FF" }} />
        <span>{message ? "Ver mensagem" : "Clique para editar..."}</span>
      </Label>

      <InputConfig isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }}
        >
          <ClearIcon />
        </CloseButton>

        {
          whatsappIntegrations && whatsappIntegrations.length > 0 ?
            <>
              <span>Escolha uma das suas integrações whatsapp:</span>
              <select value={nodeValue} onChange={(e) => setNodeValue(e.target.value)}>
                <option value="">Selecionar Whatsapp</option>
                {whatsappIntegrations &&
                  whatsappIntegrations.map((integration) => (
                    <option key={integration.id} value={integration.id}>{integration.name}</option>
                  ))
                }
              </select>
            </>
            :
            <>
              <span>Você ainda não possui uma integração Whatsapp.</span>
              <InputConfigButton
                onClick={() => createWhatsappIntegration()}
              >
                Criar primeira integração
              </InputConfigButton>
            </>
        }
        {
          nodeValue &&
          <>
            <span>Atribuir variável a esse input</span>
            <select value={assignedVariable} onChange={(e) => setAssignedVariable(e.target.value)}>
              {variables &&
                variables.map((variable, index) => (
                  <option key={index} value={variable.id}>{variable.name}</option>
                ))
              }
            </select>
            <MessageInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mensagem..."
            />
          </>
        }
      </InputConfig>

    </NodeContainer>
  )
}

export default WhatsappMessageLogicNode