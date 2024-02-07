/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useReactFlow } from "reactflow";
import { Label, NodeContainer, InputConfig, MessageInput, CustomToolbar, CloseButton, InputConfigButton, SwitchContainer, Input, SpecificMomentContainer, SpecificDateContent, TimeInput, TimerContainer, DaysOfTheWeekContainer, PeriodContainer } from "./WhatsappMessage.style";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';
import { Switch } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';

function WhatsappMessage({ data, id, groupID }) {

  const { setNodes, deleteElements } = useReactFlow();
  const [nodeValue, setNodeValue] = useState(data.integration || "");
  const [message, setMessage] = useState(data.message || "");
  const { integrations, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const whatsappIntegrations = integrations.filter(integrations => integrations.type === 'whatsapp');
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [specificMoment, setSpecificMoment] = useState(data.specificMoment || false);
  const [specificDate, setSpecificDate] = useState(data.specificDate || "");
  const [specificTime, setSpecificTime] = useState(data.specificTime || "");
  const [unitOfTime, setUnitOfTime] = useState(data.unitOfTime || "minute");
  const [time, setTime] = useState(data.time || null);
  const daysOfTheWeekObject = {
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false
  }
  const [daysOfTheWeek, setDaysOfTheWeek] = useState(data.daysOfTheWeek || daysOfTheWeekObject);
  const [start, setStart] = useState(data.start || "08:00");
  const [end, setEnd] = useState(data.end || "18:00");

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
              nodeOnBlock.data.integration = nodeValue
              nodeOnBlock.data.message = message
              nodeOnBlock.data.specificMoment = specificMoment
              nodeOnBlock.data.specificDate = specificDate
              nodeOnBlock.data.specificTime = specificTime
              nodeOnBlock.data.unitOfTime = unitOfTime
              nodeOnBlock.data.time = time
              nodeOnBlock.data.daysOfTheWeek = daysOfTheWeek
              nodeOnBlock.data.start = start
              nodeOnBlock.data.end = end
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue, message, specificDate, specificMoment, specificTime, time, daysOfTheWeek, start, end, unitOfTime]);

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

  const handleTime = (e) => {
    const number = parseInt(e.target.value);
    if (isNaN(number)) {
      setTime(null);
    } else {
      setTime(number);
    }
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

      <Label>
        <WhatsAppIcon style={{ fontSize: "large", color: "#128C7E" }} />
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
            <MessageInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mensagem..."
            />
            <SwitchContainer style={{ margin: "10px 0" }}>
              <span>Momento específico</span>
              <Switch
                size="small"
                defaultChecked={specificMoment}
                onChange={() => setSpecificMoment(!specificMoment)}
              />
            </SwitchContainer>
          </>
        }
        {
          specificMoment &&
          <SpecificMomentContainer>
            <SpecificDateContent>
              <DateRangeIcon />
              <Input
                mask="99/99/9999"
                maskChar=""
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                placeholder="99/99/9999"
              />
            </SpecificDateContent>
            <SpecificDateContent>
              <AccessTimeIcon />
              <TimeInput
                type="time"
                value={specificTime}
                onChange={(e) => setSpecificTime(e.target.value)}
              />
            </SpecificDateContent>
          </SpecificMomentContainer>
        }
        {
          !specificMoment && nodeValue &&
          <>
            <TimerContainer style={{ marginBottom: "10px" }}>
              <span>Unidade de tempo</span>
              <select value={unitOfTime} onChange={(e) => setUnitOfTime(e.target.value)}>
                <option value="minute">Minuto</option>
                <option value="hour">Hora</option>
                <option value="day">Dia</option>
              </select>
            </TimerContainer>
            <TimerContainer>
              <span>Tempo</span>
              <input
                type="text"
                value={time === null ? "" : time}
                onChange={(e) => handleTime(e)}
              />
            </TimerContainer>

            <DaysOfTheWeekContainer>
              <SwitchContainer>
                <span>Domingo</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.sunday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, sunday: !prevDaysOfTheWeek.sunday }))}
                />
              </SwitchContainer>

              <SwitchContainer>
                <span>Segunda</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.monday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, monday: !prevDaysOfTheWeek.monday }))}
                />
              </SwitchContainer>

              <SwitchContainer>
                <span>Terça</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.tuesday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, tuesday: !prevDaysOfTheWeek.tuesday }))}
                />
              </SwitchContainer>

              <SwitchContainer>
                <span>Quarta</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.wednesday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, wednesday: !prevDaysOfTheWeek.wednesday }))}
                />
              </SwitchContainer>

              <SwitchContainer>
                <span>Quinta</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.thursday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, thursday: !prevDaysOfTheWeek.thursday }))}
                />
              </SwitchContainer>

              <SwitchContainer>
                <span>Sexta</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.friday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, friday: !prevDaysOfTheWeek.friday }))}
                />
              </SwitchContainer>

              <SwitchContainer>
                <span>Sábado</span>
                <Switch
                  size="small"
                  defaultChecked={daysOfTheWeek.saturday}
                  onChange={() => setDaysOfTheWeek(prevDaysOfTheWeek => ({ ...prevDaysOfTheWeek, saturday: !prevDaysOfTheWeek.saturday }))}
                />
              </SwitchContainer>
            </DaysOfTheWeekContainer>

            <PeriodContainer>
              <span style={{ marginRight: "10px", fontSize: "0.9rem" }}>Das:</span>
              <TimeInput
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
              <span style={{ margin: "0 10px 0 20px", fontSize: "0.9rem" }}>às:</span>
              <TimeInput
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </PeriodContainer>
          </>
        }
      </InputConfig>

    </NodeContainer>
  )
}

export default WhatsappMessage;
