import { Container, DescriptionContainer, IconContainer, ImgContainer, IntegrationImg, Modal, ModalContent, CloseButton, DeleteIntegration } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

function UserIntegrationCard({ img, description, id, name, deleteIntegration }) {

  const navigate = useNavigate();
  const [modalIsVisible, setModalIsVisible] = useState();

  return (
    <Container>
      <ImgContainer>
        <IntegrationImg src={img} alt="Imagem" />
      </ImgContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <IconContainer>
        <EditIcon onClick={() => navigate(`/dashboard/integrations/edit-integration/${name}/${id}`)} />
        <DeleteIcon onClick={() => setModalIsVisible(true)} />
      </IconContainer>

      <Modal isvisible={modalIsVisible} onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setModalIsVisible(false)
            }}
          >
            <ClearIcon />
          </CloseButton>

          <DeleteIntegration>
            <span>Tem certeza que deseja deletar essa integração?</span>
            <button onClick={() => deleteIntegration(id)}>Deletar</button>
          </DeleteIntegration>
        </ModalContent>
      </Modal>

    </Container>
  )
}

export default UserIntegrationCard;