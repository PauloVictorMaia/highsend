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
  ActiveComponent,
  InputItem,
  CreationOptions,
  FlowNameInput,
  CreationOptionsTitle,
  FlowOption,
  FileInput,
  TemplateCard,
  TemplatesContainer,
  ToggleContainer,
  OptionLabel
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
import { Ring } from "@uiball/loaders";
import { Skeleton } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import PublishIcon from '@mui/icons-material/Publish';
import Radio from '@mui/material/Radio';

function Fluxograms() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();
  const { user, getFlows, flows, loadingFlows, openMenu } = useStateContext();
  const token = localStorage.getItem('token');
  const [modalEditIsVisible, setModalEditIsVisible] = useState(false);
  const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState(false);
  const [modalEmbedIsVisible, setModalEmbedIsVisible] = useState(false);
  const [modalNewFlowIsVisible, setModalNewFlowIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deleteFlowIsLoading, setDeleteFlowIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState(flows.map(() => false));
  const [editFlowNameIsLoading, setEditFlowNameIsLoading] = useState(false);
  const [indexModal, setIndexModal] = useState(null);
  const [flowName, setFlowName] = useState("");
  const [newFlowName, setNewFlowName] = useState("My flow");
  const [flowType, setFlowType] = useState("bot");
  const BASE_URL = `${import.meta.env.VITE_OPEN_FRONT_URL}`;

  const createFlow = async () => {
    if (!newFlowName) {
      toast.warning("Escolha um nome para o seu fluxo");
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post(`/flows/create-flow/${user.id}`, { flowName: newFlowName, flowType }, { headers: { authorization: token } });
      if (response.status === 200) {
        if (response.data.flow.type === "bot") {
          navigate(`/dashboard/fluxograms/edit/${response.data.id}`);
        } else {
          navigate(`/dashboard/fluxograms/form/edit/${response.data.id}`);
        }
        getFlows();
        setIsLoading(false);
        setModalNewFlowIsVisible(false);
      }
    } catch {
      toast.error('Erro ao criar novo flow.');
      setIsLoading(false);
    }
  }

  const createFlowWithJsonFile = async (event) => {
    if (!newFlowName) {
      toast.warning("Escolha um nome para o seu fluxo");
      return;
    }
    try {
      setUploadingFile(true);
      const fileInput = event.target;
      const jsonFile = fileInput.files[0];
      const formData = new FormData();
      formData.append('flowJson', jsonFile);
      const response = await api.post(`/flows/create-flow-with-json/${user.id}/${newFlowName}/${flowType}`, formData,
        {
          headers: {
            authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        });
      if (response.status === 200) {
        if (flowType === "bot") {
          navigate(`/dashboard/fluxograms/edit/${response.data.id}`);
        } else {
          navigate(`/dashboard/fluxograms/form/edit/${response.data.id}`);
        }
        getFlows();
        setUploadingFile(false);
        setModalNewFlowIsVisible(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setUploadingFile(false);
        return;
      }
      toast.error('Erro ao processar arquivo.');
      setUploadingFile(false);
    }
  }

  const editFlowName = async (flowID) => {
    if (!flowName) return;
    try {
      setEditFlowNameIsLoading(true);
      const response = await api.patch(`/flows/edit-flow/${user.id}/${flowID}`, { flowName }, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Alterações salvas.')
        getFlows();
        closeEditModal();
        setEditFlowNameIsLoading(false);
      }
    } catch {
      toast.error('Erro ao editar o nome do flow.');
      setEditFlowNameIsLoading(false);
    }
  };

  const cloneFlow = async (flowID, index) => {
    try {
      const existingFlows = flows.length;
      let planLimit;
      const planType = user.accountType;

      switch (planType) {
        case 'STARTER':
          planLimit = 2
          break;
        case 'PRO':
          planLimit = 5
          break;
        case 'ENTERPRISE':
          planLimit = 10
          break;
      }

      if (existingFlows >= planLimit) {
        toast.warning("Você já atingiu o limite de criação de flows para o seu plano atual.", {
          autoClose: 5000
        })
        return;
      }
      const updatedLoadingStates = [...loadingStates];
      updatedLoadingStates[index] = true;
      setLoadingStates(updatedLoadingStates);
      const response = await api.post(`/flows/clone-flow/${user.id}/${flowID}`, {}, { headers: { authorization: token } });
      if (response.status === 200) {
        getFlows();
        closeEditModal();
        updatedLoadingStates[index] = false;
        setLoadingStates(updatedLoadingStates);
      }
    } catch {
      toast.error('Erro ao clonar flow.');
      const updatedLoadingStates = [...loadingStates];
      updatedLoadingStates[index] = false;
      setLoadingStates(updatedLoadingStates);
    }
  };

  const deleteFlow = async (flowID) => {
    try {
      setDeleteFlowIsLoading(true);
      const response = await api.delete(`/flows/delete-flow/${user.id}/${flowID}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Flow deletado.')
        getFlows();
        setModalDeleteIsVisible(false);
        setDeleteFlowIsLoading(false);
      }
    } catch {
      toast.error('Erro ao deletar flow.');
      setDeleteFlowIsLoading(false);
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

  const openModalNewFlow = () => {
    const existingFlows = flows.length;
    let planLimit;
    const planType = user.accountType;

    switch (planType) {
      case 'STARTER':
        planLimit = 2
        break;
      case 'PRO':
        planLimit = 5
        break;
      case 'ENTERPRISE':
        planLimit = 10
        break;
    }

    if (existingFlows >= planLimit) {
      toast.warning("Você já atingiu o limite de criação de flows para o seu plano atual.", {
        autoClose: 5000
      })
      return;
    }
    setModalNewFlowIsVisible(true);
  }

  const closeModalNewFlow = (e) => {
    e.stopPropagation();
    setModalNewFlowIsVisible(false);
    setNewFlowName("My flow");
    setFlowType("bot");
  }

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={flowMenu}
          name={'Flows'}
          setMenuComponent={setMenuComponent}
          menuComponent={menuComponent}
        />
      }
    >

      <Container openmenu={openMenu}>
        <NewFluxogramCard onClick={() => openModalNewFlow()}>
          <AddIcon style={{ fontSize: "2.2rem" }} />
          <span>Novo Flow</span>
        </NewFluxogramCard>

        {loadingFlows &&
          <>
            <Skeleton width={'100%'} height={270} animation="wave" variant="rectangular" style={{ borderRadius: '8px' }} />
            <Skeleton width={'100%'} height={270} animation="wave" variant="rectangular" style={{ borderRadius: '8px' }} />
            <Skeleton width={'100%'} height={270} animation="wave" variant="rectangular" style={{ borderRadius: '8px' }} />
          </>
        }

        {
          flows &&
          flows.map((flow, index) => (
            <FluxogramCard
              key={index}
              onClick={() => {
                if (flow.type && flow.type !== "bot") {
                  navigate(`/dashboard/fluxograms/form/edit/${flow.id}`);
                } else {
                  navigate(`/dashboard/fluxograms/edit/${flow.id}`);
                }
              }}
            >
              <Buttons>
                <Tooltip title="Copiar link">
                  <CopyAllIcon style={{ fontSize: "1.6rem" }} onClick={(e) => {
                    e.stopPropagation();
                    copyFlowURL(`${BASE_URL}/fluxo-de-${flow.type ? flow.type : "bot"}/${user.id}/${flow.id}`)
                  }
                  } />
                </Tooltip>
                <ActiveComponent>Ativo</ActiveComponent>
                <Tooltip title="Duplicar">
                  {loadingStates[index] ?
                    <Ring size={20} color="#333" />
                    :
                    <ControlPointDuplicateIcon onClick={(e) => {
                      e.stopPropagation();
                      cloneFlow(flow.id, index)
                    }
                    } />
                  }
                </Tooltip>
              </Buttons>
              <Content>
                <Tooltip title={flow.name}>
                  <span>{flow.name}</span>
                </Tooltip>
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
                    <div className="modal-edit-content">
                      <InputItem
                        type="text"
                        label="Nome do fluxo"
                        variant="outlined"
                        defaultValue={flow.name}
                        onChange={(e) => setFlowName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            editFlowName(flow.id);
                          }
                        }}
                      />
                      <button
                        disabled={editFlowNameIsLoading}
                        onClick={() => editFlowName(flow.id)}
                      >
                        {editFlowNameIsLoading ? <Ring color="#fff" size={20} /> : "Salvar"}
                      </button>
                    </div>
                  </EditFlowName>
                </ModalContent>
              </Modal>

              <Modal onClick={(e) => e.stopPropagation()} isvisible={modalDeleteIsVisible && index == indexModal}>
                <ModalContent>
                  <CloseButton onClick={(e) => {
                    e.stopPropagation();
                    setModalDeleteIsVisible(false);
                  }
                  }>
                    <ClearIcon />
                  </CloseButton>

                  <DeleteFlow>
                    <span>Tem certeza que deseja deletar o flow "{flow.name}" ? Todos os leads desse flow também serão excluídos!</span>
                    <button
                      onClick={() => deleteFlow(flow.id)}
                      disabled={deleteFlowIsLoading}
                    >
                      {deleteFlowIsLoading ? <Ring size={20} color="#fff" /> : "Deletar"}
                    </button>
                  </DeleteFlow>
                </ModalContent>
              </Modal>

              <Modal onClick={(e) => e.stopPropagation()} isvisible={modalEmbedIsVisible && index == indexModal}>
                <ModalContent width={600} height={400}>
                  <h2>Copie o códido do flow e insira no seu site</h2>
                  <CloseButton onClick={(e) => {
                    e.stopPropagation();
                    setModalEmbedIsVisible(false);
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

        <Modal onClick={(e) => e.stopPropagation()} isvisible={modalNewFlowIsVisible}>
          <ModalContent width={600} height={500}>
            <CloseButton onClick={(e) => closeModalNewFlow(e)}>
              <ClearIcon />
            </CloseButton>

            <CreationOptions>

              <FlowNameInput>
                <InputItem
                  type="text"
                  label="Nome do fluxo"
                  variant="outlined"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                />
              </FlowNameInput>

              <ToggleContainer>
                <OptionLabel>
                  <Radio
                    value="bot"
                    checked={flowType === 'bot'}
                    onChange={() => setFlowType("bot")}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      }
                    }}
                  />
                  Fluxo de bot
                </OptionLabel>

                <OptionLabel>
                  <Radio
                    value="formulario"
                    checked={flowType === 'formulário'}
                    onChange={() => setFlowType("formulário")}
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                      {
                        color: '#4339F2',
                      },
                    }}
                  />
                  Fluxo de formulário
                </OptionLabel>
              </ToggleContainer>

              <CreationOptionsTitle>
                <h2>Opções de criação</h2>
              </CreationOptionsTitle>

              <FlowOption onClick={createFlow}>
                {
                  isLoading ? <Ring color="#333" size={30} /> : <BuildIcon />
                }
                <span>Em branco</span>
              </FlowOption>

              <FlowOption htmlFor="importJSON">
                {
                  uploadingFile ? <Ring color="#333" size={30} /> : <PublishIcon style={{ fontSize: "1.9rem" }} />
                }
                <span>Importar JSON</span>
                <FileInput
                  type="file"
                  id="importJSON"
                  onChange={createFlowWithJsonFile}
                  accept=".json"
                />
              </FlowOption>

              <CreationOptionsTitle>
                <h2>Templates</h2>
              </CreationOptionsTitle>

              <TemplatesContainer>
                <TemplateCard disabled>
                  <h2>Vendas</h2>
                  <h2>Em breve</h2>
                </TemplateCard>

                <TemplateCard disabled>
                  <h2>Prospec</h2>
                  <h2>Em breve</h2>
                </TemplateCard>

                <TemplateCard disabled>
                  <h2>Promo</h2>
                  <h2>Em breve</h2>
                </TemplateCard>
              </TemplatesContainer>

            </CreationOptions>

          </ModalContent>
        </Modal>
      </Container>

    </ContentPageContainer>
  )
}

export default Fluxograms;