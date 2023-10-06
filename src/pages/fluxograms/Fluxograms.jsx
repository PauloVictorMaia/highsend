/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Buttons,
  Container,
  Content,
  FluxogramCard,
  Modal,
  ModalContent,
  NewFluxogramCard,
  CloseButton,
  EditFlowName,
  DeleteFlow,
  IconContainer,
  ActiveComponent
} from "./Fluxograms.style";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import api from '../../api';
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { flowMenu } from "../../data/menus";
import CustomPageHeader from "../../components/CustomPageHeader";
import { toast } from "react-toastify";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import clipboardCopy from 'clipboard-copy';
import Tooltip from '@mui/material/Tooltip';
import CodeIcon from '@mui/icons-material/Code';
import CopyEmbed from "../../components/CopyEmbedCode";

function Fluxograms() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();
  const { user, getFlows, flows } = useStateContext();
  const token = localStorage.getItem('token');
  const [modalEditIsVisible, setModalEditIsVisible] = useState(false);
  const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState(false);
  const [modalEmbedIsVisible, setModalEmbedIsVisible] = useState(false);
  const [indexModal, setIndexModal] = useState(null);
  const [flowName, setFlowName] = useState("");
  const BASE_URL = `${import.meta.env.OPEN_FRONT_URL}/fluxo-de-bot/`;

  const createFlow = async () => {
    try {
      const response = await api.post(`/flows/create-flow/${user.id}`, {}, { headers: { authorization: token } });
      if (response.status === 201) {
        navigate(`/dashboard/fluxograms/edit/${response.data.id}`);
        getFlows();
      }
    } catch {
      toast.error('Erro ao criar novo flow.');
    }
  }

  const editFlowName = async (flowID) => {
    if (!flowName) return;
    try {
      const response = await api.patch(`/flows/edit-flow/${user.id}/${flowID}`, { flowName }, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Alterações salvas.')
        getFlows();
        closeEditModal();
      }
    } catch {
      toast.error('Erro ao editar o nome do flow.');
    }
  };

  const cloneFlow = async (flowID) => {
    try {
      const response = await api.post(`/flows/clone-flow/${user.id}/${flowID}`, {}, { headers: { authorization: token } });
      if (response.status === 200) {
        getFlows();
        closeEditModal();
      }
    } catch {
      toast.error('Erro ao clonar flow.');
    }
  };

  const deleteFlow = async (flowID) => {
    try {
      const response = await api.delete(`/flows/delete-flow/${user.id}/${flowID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Flow deletado.')
        getFlows();
        setModalDeleteIsVisible(false);
      }
    } catch {
      toast.error('Erro ao deletar flow.');
    }
  };

  const closeEditModal = () => {
    setFlowName("");
    setModalEditIsVisible(false);
  }

  const copyFlowURL = (url) => {
    try {
      clipboardCopy(url);
      toast.success('Link copiado.');
    } catch {
      toast.error('Erro ao copiar link.');
    }
  }

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={flowMenu}
          name={'Fluxos de atendimento'}
          setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
        />
      }
    >

      <Container>
        <NewFluxogramCard onClick={createFlow}>
          <AddIcon style={{ fontSize: "2.2rem" }} />
          <span>Novo Flow</span>
        </NewFluxogramCard>

        {
          flows &&
          flows.map((flow, index) => (
            <FluxogramCard key={index} onClick={() => navigate(`/dashboard/fluxograms/edit/${flow.id}`)}>
              <Buttons>
                <Tooltip title="Copiar link">
                  <CopyAllIcon style={{ fontSize: "1.6rem" }} onClick={(e) => {
                    e.stopPropagation();
                    copyFlowURL(`${BASE_URL}${user.id}/${flow.id}`)
                  }
                  } />
                </Tooltip>
                <ActiveComponent>Ativo</ActiveComponent>
                <Tooltip title="Duplicar">
                  <ControlPointDuplicateIcon onClick={(e) => {
                    e.stopPropagation();
                    cloneFlow(flow.id)
                  }
                  } />
                </Tooltip>
              </Buttons>
              <Content>
                <span>{flow.name}</span>
              </Content>
              <IconContainer>

                <Tooltip title="Inserir em site">
                  <CodeIcon style={{ marginRight: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalEmbedIsVisible(true);
                      setIndexModal(index);
                    }
                    } />
                </Tooltip>
                <Tooltip title="Editar nome">
                  <DriveFileRenameOutlineIcon style={{ marginRight: 10 }} onClick={(e) => {
                    e.stopPropagation();
                    setModalEditIsVisible(true);
                    setIndexModal(index);
                  }
                  } />
                </Tooltip>
                <Tooltip title="Deletar fluxo">
                  <DeleteOutlineIcon onClick={(e) => {
                    e.stopPropagation();
                    setModalDeleteIsVisible(true);
                    setIndexModal(index);
                  }
                  } />
                </Tooltip>
              </IconContainer>

              <Modal onClick={(e) => e.stopPropagation()} isvisible={modalEditIsVisible && index == indexModal}>
                <ModalContent>
                  <CloseButton onClick={(e) => {
                    e.stopPropagation()
                    closeEditModal()
                  }
                  }>
                    <ClearIcon />
                  </CloseButton>

                  <EditFlowName>
                    <span>flow name:</span>
                    <input
                      type="text"
                      defaultValue={flow.name}
                      onChange={(e) => setFlowName(e.target.value)}
                    />
                    <button onClick={() => editFlowName(flow.id)}>Salvar</button>
                  </EditFlowName>
                </ModalContent>
              </Modal>

              <Modal onClick={(e) => e.stopPropagation()} isvisible={modalDeleteIsVisible && index == indexModal}>
                <ModalContent>
                  <CloseButton onClick={(e) => {
                    e.stopPropagation();
                    setModalDeleteIsVisible(false)
                  }
                  }>
                    <ClearIcon />
                  </CloseButton>

                  <DeleteFlow>
                    <span>Tem certeza que deseja deletar o flow "{flow.name}" ?</span>
                    <button onClick={() => deleteFlow(flow.id)}>Deletar</button>
                  </DeleteFlow>
                </ModalContent>
              </Modal>

              <Modal onClick={(e) => e.stopPropagation()} isvisible={modalEmbedIsVisible && index == indexModal}>
                <ModalContent width={600} height={400}>
                  <h2>Copie o códido do flow e insira no seu site</h2>
                  <CloseButton onClick={(e) => {
                    e.stopPropagation();
                    setModalEmbedIsVisible(false)
                  }
                  }>
                    <ClearIcon />
                  </CloseButton>

                  <CopyEmbed flowId={flow.id} userId={user.id} />
                </ModalContent>
              </Modal>
            </FluxogramCard>
          ))
        }

      </Container>

    </ContentPageContainer>
  )
}

export default Fluxograms;