/* eslint-disable react-hooks/exhaustive-deps */
import { Buttons, Container, Content, FluxogramCard, Modal, ModalContent, NewFluxogramCard, CloseButton, EditFlowName } from "./Fluxograms.style";
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

function Fluxograms() {
  const [menuComponent, setMenuComponent] = useState(0);
  const navigate = useNavigate();
  const { user } = useStateContext();
  const token = localStorage.getItem('token');
  const [flows, setFlows] = useState([]);
  const [modalEditIsVisible, setModalEditIsVisible] = useState(false);
  const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState(false);
  const [flowName, setFlowName] = useState("");

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

  const closeEditModal = () => {
    setFlowName("");
    setModalEditIsVisible(false);
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
          <span>Create fluxogram</span>
        </NewFluxogramCard>

        {
          flows &&
          flows.map((flow, index) => (
            <FluxogramCard key={index}>
              <Buttons>
                <EditIcon onClick={() => setModalEditIsVisible(true)} />
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