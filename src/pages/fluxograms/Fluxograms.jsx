/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { Buttons, Container, Content, FluxogramCard, Modal, ModalContent, NewFluxogramCard, CloseButton, EditFlowName, DeleteFlow } from "./Fluxograms.style";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import api from '../../api';
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { flowMenu } from "../../data/menus";
import CustomPageHeader from "../../components/CustomPageHeader";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import clipboardCopy from 'clipboard-copy';

function Fluxograms() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const [flows, setFlows] = useState([]);
  const [modalEditIsVisible, setModalEditIsVisible] = useState(false);
  const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState(false);
  const [flowName, setFlowName] = useState("");
  const BASE_URL = "http://localhost:5173/fluxo-de-bot/";

  const createFlow = async () => {
    try {
      const response = await api.post(`/flows/create-flow/${user.id}`, {}, { headers: { authorization: token } });
      if (response.status === 201) {
        navigate(`/dashboard/fluxograms/edit/${response.data.id}`);
      }
    } catch {
      toast.error('Erro ao criar novo flow.');
    }
  }

  const getFlows = async () => {
    try {
      const response = await api.get(`/flows/get-flows/${user.id}`, { headers: { authorization: token } });
      setFlows(response.data);
    } catch {
      toast.error('Erro ao carregar flows.');
    }
  };

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

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getFlows();
    }
  }, [user]);

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
            <FluxogramCard key={index}>
              <Buttons>
                <CopyAllIcon style={{ fontSize: "1.6rem" }} onClick={() => copyFlowURL(`${BASE_URL}${user.id}/${flow.id}`)} />
                <EditIcon onClick={() => setModalEditIsVisible(true)} />
                <ControlPointDuplicateIcon onClick={() => cloneFlow(flow.id)} />
                <DeleteIcon onClick={() => setModalDeleteIsVisible(true)} />
              </Buttons>
              <Content onClick={() => navigate(`/dashboard/fluxograms/edit/${flow.id}`)}>
                <span>{flow.name}</span>
              </Content>

              <Modal isvisible={modalEditIsVisible}>
                <ModalContent>
                  <CloseButton onClick={() => closeEditModal()}>
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

              <Modal isvisible={modalDeleteIsVisible}>
                <ModalContent>
                  <CloseButton onClick={() => setModalDeleteIsVisible(false)}>
                    <ClearIcon />
                  </CloseButton>

                  <DeleteFlow>
                    <span>Tem certeza que deseja deletar o flow "{flow.name}" ?</span>
                    <button onClick={() => deleteFlow(flow.id)}>Deletar</button>
                  </DeleteFlow>
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