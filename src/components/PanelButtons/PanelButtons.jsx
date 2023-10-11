/* eslint-disable react/prop-types */
import { Container, Label, Button, DropDownMenu, ProfileImage, ProfileImageContainer, TemplateContainer } from "./PanelButtons.style"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
// import { useState } from "react";

function PanelButtons({
  save, hasChanges, dropDownMenuIsVisible, setDropDownMenuIsVisible, profileImage, setProfileImage, template, setTemplate
}) {

  return (
    <Container>
      <Button disabled={!hasChanges} onClick={() => save()} color={hasChanges}>
        <SaveOutlinedIcon />
        <Label color={hasChanges}>Salvar</Label>
      </Button>

      <Button>
        <IosShareIcon />
        <Label>Exportar</Label>
      </Button>

      <Button onClick={() => setDropDownMenuIsVisible(!dropDownMenuIsVisible)}>
        {dropDownMenuIsVisible ? <CloseIcon /> : <SettingsIcon />}
        <Label>Configurar</Label>
      </Button>

      <DropDownMenu isvisible={dropDownMenuIsVisible}>
        <span>Personalize o seu flow</span>
        <ProfileImageContainer>
          <span>Avatar</span>
          <ProfileImage img={profileImage}></ProfileImage>
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
      </DropDownMenu>
    </Container>
  )
}

export default PanelButtons;