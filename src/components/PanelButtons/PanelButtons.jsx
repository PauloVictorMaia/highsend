/* eslint-disable react/prop-types */
import { Container, Label, Button, DropDownMenu, ProfileImage, ProfileImageContainer, TemplateContainer, Modal, ModalContent, CloseButton, ProfileNameInput } from "./PanelButtons.style"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import InputDropZone from "../InputDropZone";
import api from "../../api";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Ring } from "@uiball/loaders";
import { useStateContext } from "../../contexts/ContextProvider";

function PanelButtons({
  save, hasChanges, dropDownMenuIsVisible, setDropDownMenuIsVisible, profileImage, setProfileImage, template, setTemplate, profileName, setProfileName, copyURL, isLoading, exportToJson
}) {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await api.post('/flows/upload-avatar', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      if (response.status === 201) {
        console.log(response.data.imageUrl);
        setProfileImage(response.data.imageUrl);
        setModalIsVisible(false);
        setUploading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error.response);
      }
      setUploading(false);
      return;
    }
  }

  return (
    <Container onClick={() => setNodeMenuIsOpen(!nodeMenuIsOpen)}>
      <Button disabled={!hasChanges} onClick={() => save()} color={hasChanges}>
        {isLoading ? <Ring color="#333" /> : <SaveOutlinedIcon />}
        <Label color={hasChanges}>Salvar</Label>
      </Button>

      <Button onClick={() => copyURL()}>
        <CopyAllIcon />
        <Label>Link</Label>
      </Button>

      <Button onClick={() => setDropDownMenuIsVisible(!dropDownMenuIsVisible)}>
        {dropDownMenuIsVisible ? <CloseIcon /> : <SettingsIcon />}
        <Label>Configurar</Label>
      </Button>

      <Button onClick={() => exportToJson()}>
        <IosShareIcon />
        <Label>Exportar</Label>
      </Button>

      <DropDownMenu isvisible={dropDownMenuIsVisible}>
        <span>Personalize o seu flow</span>

        <ProfileImageContainer onClick={() => setModalIsVisible(true)}>
          <span>Avatar</span>
          <ProfileImage loading={uploading} loader={<Ring />} src={profileImage} alt="Avatar"></ProfileImage>
          <span>Clique para editar</span>
        </ProfileImageContainer>
        <TemplateContainer>
          <span>Template</span>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="whatsapp">Whatsapp</option>
          </select>
        </TemplateContainer>
        {
          template === "whatsapp" &&
          <TemplateContainer>
            <span>Nome do perfil</span>
            <ProfileNameInput
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              maxLength={25}
            />
          </TemplateContainer>
        }
      </DropDownMenu>
      <Modal onClick={(e) => e.stopPropagation()} isvisible={modalIsVisible}>
        <ModalContent width={300} height={200}>

          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setModalIsVisible(false)
            }
            }>
            <ClearIcon />
          </CloseButton>

          {uploading ?
            <Ring />
            :
            <InputDropZone sendFile={uploadImage} acceptedFileType="image/*" width={190} height={130} />
          }

        </ModalContent>
      </Modal>
    </Container>
  )
}

export default PanelButtons;