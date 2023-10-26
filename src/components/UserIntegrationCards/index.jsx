/* eslint-disable react/prop-types */
import { Container, DescriptionContainer, IconContainer, ImgContainer, IntegrationImg, Modal, ModalContent, CloseButton, DeleteIntegration } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { Ring } from "@uiball/loaders";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../../contexts/ContextProvider";
import api from "../../api";

function UserIntegrationCard({ img, description, id, name }) {

  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [integrationModalIsVisible, setIntegrationModalIsVisible] = useState(false);
  const { getIntegrations, user } = useStateContext();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const deleteIntegration = async () => {

    try {
      setDeleteIsLoading(true);
      const response = await api.delete(`/integrations/delete-integration/${user.id}/${id}`, { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success("Dados da integração excluídos com sucesso!");
        getIntegrations();
        setDeleteIsLoading(false);
        setIntegrationModalIsVisible(false);
      }
    } catch (error) {
      if (error.response & error.response.status === 500) {
        toast.error("Erro ao deletar integração. Tente novamente.");
      }
      setDeleteIsLoading(false);
      return;
    }
  }

  const openModal = () => {
    setIntegrationModalIsVisible(true);
  }

  return (
    <Container>
      <ImgContainer>
        <IntegrationImg src={img} alt="Imagem" />
      </ImgContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <IconContainer>
        <EditIcon onClick={() => navigate(`/dashboard/integrations/edit-integration/${name}/${id}`)} />
        <DeleteIcon onClick={() => openModal()} />
      </IconContainer>

      <Modal isvisible={integrationModalIsVisible} onClick={(e) => e.stopPropagation()}>
        <ModalContent height={70}>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setIntegrationModalIsVisible(false)
            }}
          >
            <ClearIcon />
          </CloseButton>

          <DeleteIntegration>
            <span>Tem certeza que deseja deletar essa integração?</span>
            <button
              onClick={() => deleteIntegration()}
              disabled={deleteIsLoading}
            >
              {deleteIsLoading ? <Ring size={20} color="#fff" /> : "Deletar"}
            </button>
          </DeleteIntegration>
        </ModalContent>
      </Modal>

    </Container>
  )
}

export default UserIntegrationCard;