import { Container, DescriptionContainer, IconContainer, ImgContainer, IntegrationImg, Modal, ModalContent, CloseButton, DeleteIntegration } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { Ring } from "@uiball/loaders";

function UserIntegrationCard({ img, description, id, name, deleteIntegration, isLoading, integrationModalIsVisible, setIntegrationModalIsVisible }) {

  const navigate = useNavigate();

  return (
    <Container>
      <ImgContainer>
        <IntegrationImg src={img} alt="Imagem" />
      </ImgContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <IconContainer>
        <EditIcon onClick={() => navigate(`/dashboard/integrations/edit-integration/${name}/${id}`)} />
        <DeleteIcon onClick={() => setIntegrationModalIsVisible(true)} />
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
              onClick={() => deleteIntegration(id)}
              disabled={isLoading}
            >
              {isLoading ? <Ring size={20} color="#fff" /> : "Deletar"}
            </button>
          </DeleteIntegration>
        </ModalContent>
      </Modal>

    </Container>
  )
}

export default UserIntegrationCard;