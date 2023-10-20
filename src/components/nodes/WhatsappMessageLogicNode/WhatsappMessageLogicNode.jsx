/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useReactFlow, NodeToolbar } from "reactflow";
import { Label, NodeContainer, InputConfig, MessageInput } from "./WhatsappMessageLogicNode.style";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function WhatsappMessageLogicNode({ data, id, selected }) {

  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const { setNodes } = useReactFlow();
  const [nodeValue, setNodeValue] = useState(data.value || "");
  const [message, setMessage] = useState(data.message || "");
  const { integrations } = useStateContext();
  const whatsappIntegrations = integrations.filter(integrations => integrations.type === 'whatsapp');
  const navigate = useNavigate();

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data = {
            ...node.data,
            value: nodeValue,
            message: message,
          };
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === groupID) {
                node.data.blocks = [...parentNodes]
              }
              return node;
            })
          )
        }

        return node;
      })
    );
  }, [nodeValue, message]);

  const createWhatsappIntegration = () => {
    navigate('/dashboard/integrations');
  }

  return (
    <NodeContainer>

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#595959',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '3px',
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <Label>
        <WhatsAppIcon style={{ fontSize: "large", color: "#9999FF" }} />
        <span>{message ? "Ver mensagem" : "Clique para editar..."}</span>
      </Label>

      <InputConfig isvisible={selected}>

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
              <button onClick={() => createWhatsappIntegration()}>Criar primeira integração</button>
            </>
        }
        {
          nodeValue &&
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensagem..."
          />
        }
      </InputConfig>

    </NodeContainer>
  )
}

export default WhatsappMessageLogicNode