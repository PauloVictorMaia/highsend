/* eslint-disable react/prop-types */
import { Container, Modal, ModalContent, CloseButton, LeadsContentContainer, LeadContent, VariableContent, DeleteLeadButton, ConfirmDeleteLead, ConfirmDeleteButtons, ConfirmDeleteButton, WhatsappMessageContainer, WhatsappButton, WhatsappMessage, DeleteButtonContainer, WhatsappMessageInfo, IconText, VariableExample } from "./styles";
import Tooltip from '@mui/material/Tooltip';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, useContext, useState, useEffect } from "react";
import KanbanContext from "../../contexts/kanbanContext";
import ClearIcon from '@mui/icons-material/Clear';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useStateContext } from "../../contexts/ContextProvider";
import { Ring } from "@uiball/loaders";
import api from "../../api";
import { toast } from "react-toastify";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function KanbanLeadsCard({ data, listIndex, cardIndex, listId, listName }) {

  const ref = useRef();
  const { moveCard, moveCardInDb, deleteLead, deleteCardInDb } = useContext(KanbanContext);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [showConfirmDeleteLead, setShowConfirmDeleteLead] = useState(false);
  const [phone, setPhone] = useState("");
  const [showWhatsappOptions, setShowWhatsappOptions] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const IntegrationPlaceholder = "Selecione uma integração";
  const [whatsappIntegrationSelected, setWhatsappIntegrationSelected] = useState("");
  const { integrations } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data.variables && Array.isArray(data.variables)) {
      const telefoneObject = data.variables.find(
        (variable) => variable.name.toLowerCase() === 'telefone' || variable.name.toLowerCase() === 'phone'
      );

      if (telefoneObject && telefoneObject.value) {
        setPhone(telefoneObject.value);
      }
    }
  }, [data.variables]);

  function getTitleFromVariables(variables) {

    const preferredOrder = ["Nome", "Email", "Telefone"];

    for (const preferredName of preferredOrder) {
      const variable = variables.find((v) => v.name === preferredName);

      if (variable && variable.value !== "") {
        return variable.value;
      }
    }

    return "";
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { cardIndex, listIndex, listId, cardID: data.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop(item, monitor) {
      const draggedIndex = item.cardIndex;
      const targetIndex = cardIndex;
      const draggedList = item.listIndex;
      const targetListIndex = listIndex;
      const draggedID = item.cardID;

      if (draggedIndex === targetIndex && draggedList === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      moveCard(draggedIndex, targetIndex, draggedList, targetListIndex, draggedID, listName);
      moveCardInDb(draggedIndex, targetIndex, draggedList, targetListIndex);
      item.cardIndex = targetIndex;
      item.listIndex = targetListIndex;
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  dragRef(dropRef(ref));

  const closeModal = () => {
    setModalIsVisible(false);
    setShowConfirmDeleteLead(false);
    setShowWhatsappOptions(false);
  }

  const sendWhatsappMessage = async () => {
    setIsLoading(true);
    try {

      let newStr = whatsappMessage;

      data.variables.forEach(variable => {
        const regex = new RegExp(`{{${variable.name}}}`, 'g');
        newStr = newStr.replace(regex, variable.value);
      });

      const response = await api.post('/integrations/whatsapp-node', { message: newStr, integration: whatsappIntegrationSelected, phone });
      if (response.status === 200) {
        toast.success('Mensagem enviada');
        setIsLoading(false);
        setShowWhatsappOptions(false);
      }
    } catch (error) {
      console.log("Erro", error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container
        ref={ref}
        isdragging={isDragging}
        isOver={isOver}
        onClick={() => setModalIsVisible(true)}
      >
        <span>
          <Tooltip title={getTitleFromVariables(data.variables)}>
            {getTitleFromVariables(data.variables)}
          </Tooltip>
        </span>

      </Container>
      <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible}>
        <ModalContent width={500} height={200}>

          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              closeModal()
            }
            }>
            <ClearIcon />
          </CloseButton>

          <LeadsContentContainer>
            <h3>Variables</h3>
            {
              data.variables.map((variable) => (
                <LeadContent key={variable.id}>
                  <VariableContent>
                    <span>{variable.name}</span>
                  </VariableContent>
                  <VariableContent>
                    <span>{variable.value ? variable.value : "Não respondido"}</span>
                  </VariableContent>
                </LeadContent>
              ))
            }
            <h3>Query Params</h3>
            {
              data.queryParams && data.queryParams.length > 0 && data.queryParams.map((queryParam, index) => (
                <LeadContent key={index}>
                  {Object.entries(queryParam).map(([key, value]) => (
                    <>
                      <VariableContent key={key}>
                        <span>{key}</span>
                      </VariableContent>

                      <VariableContent key={key}>
                        <span>{value}</span>
                      </VariableContent>
                    </>
                  ))}
                </LeadContent>
              ))
            }
            <WhatsappMessageContainer isvisible={phone}>
              <WhatsappButton
                onClick={() => setShowWhatsappOptions(!showWhatsappOptions)}
                background="#075e54"
              >
                {showWhatsappOptions ? <ClearIcon /> : <WhatsAppIcon />}
                <span>{showWhatsappOptions ? "Cancelar" : "Mensagem por Whatsapp"}</span>
              </WhatsappButton>

              {
                showWhatsappOptions && integrations.filter(integration => integration.type === "whatsapp").length > 0 ? (

                  <Select
                    IconComponent={KeyboardArrowDownIcon}
                    value={whatsappIntegrationSelected}
                    size="small"
                    onChange={(e) => setWhatsappIntegrationSelected(e.target.value)}
                    autoFocus
                    sx={{
                      '& .MuiSelect-select .notranslate::after': IntegrationPlaceholder
                        ? {
                          content: `"${IntegrationPlaceholder}"`,
                          opacity: 0.72,
                        }
                        : {},
                      '.MuiSvgIcon-root ': {
                        fill: "#4339F2 !important",
                      }
                    }}
                  >
                    {integrations && integrations.filter(integration => integration.type === "whatsapp").length > 0 &&
                      integrations.filter(integration => integration.type === "whatsapp").map((integration, index) => (
                        <MenuItem key={index} value={integration.id}>{integration.name}</MenuItem >
                      ))
                    }
                  </Select>
                )
                  :
                  (
                    showWhatsappOptions && integrations.filter(integration => integration.type === "whatsapp").length < 1 &&
                    <span>Você ainda não possui uma integração com o Whatsapp. Crie uma no menu de integrações.</span>
                  )
              }

              {
                showWhatsappOptions && whatsappIntegrationSelected &&
                <>
                  <WhatsappMessageInfo>
                    <IconText>
                      <InfoOutlinedIcon />
                      <span style={{ fontWeight: "600" }}>Escritas automáticas</span>
                    </IconText>
                    <IconText>
                      <span>
                        Em sua mensagem você pode utilizar escritas automáticas. Basta colocar o nome da variavel entre duas chaves conforme exemplo abaixo. OBS: Existe diferença entre letras maiúsculas e minúsculas.
                      </span>
                    </IconText>

                    <IconText>
                      <VariableExample>
                        {"{{name}}"}
                      </VariableExample>

                      <VariableExample>
                        {"{{Email}}"}
                      </VariableExample>

                      <VariableExample>
                        {"{{phone}}"}
                      </VariableExample>

                      <VariableExample>
                        {"{{outra}}"}
                      </VariableExample>
                    </IconText>
                  </WhatsappMessageInfo>

                  {
                    showWhatsappOptions && whatsappIntegrationSelected &&
                    <WhatsappButton
                      onClick={() => sendWhatsappMessage()}
                      style={{ margin: 0 }}
                      background="#25d366"
                      disabled={!whatsappMessage || !whatsappIntegrationSelected}
                    >
                      {isLoading ? <Ring size={25} color="#fff" /> : <WhatsAppIcon />}
                      <span>Enviar mensagem</span>
                    </WhatsappButton>
                  }

                  <WhatsappMessage
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="Digite a sua mensagem"
                  />
                </>
              }


            </WhatsappMessageContainer>

            <DeleteButtonContainer>
              <DeleteLeadButton
                background="#ff4d4d"
                onClick={() => setShowConfirmDeleteLead(true)}
                isvisible={!showConfirmDeleteLead}
              >
                Deletar lead
              </DeleteLeadButton>
            </DeleteButtonContainer>

            <ConfirmDeleteLead isvisible={showConfirmDeleteLead}>
              <span>Tem certeza que quer deletar esse lead?</span>
              <ConfirmDeleteButtons>
                <ConfirmDeleteButton
                  background="#E67200"
                  onClick={() => setShowConfirmDeleteLead(false)}
                >
                  Cancelar
                </ConfirmDeleteButton>

                <ConfirmDeleteButton
                  background="#4339F2"
                  onClick={() => {
                    deleteLead(listIndex, cardIndex);
                    deleteCardInDb(listIndex, cardIndex);
                    setTimeout(() => {
                      closeModal();
                    }, 500);
                  }}
                >
                  Quero deletar
                </ConfirmDeleteButton>
              </ConfirmDeleteButtons>

            </ConfirmDeleteLead>
          </LeadsContentContainer>


        </ModalContent>
      </Modal>
    </>
  )
}

export default KanbanLeadsCard;