import CustomPageHeader from "../../components/CustomPageHeader";
import { myProfileMenu } from "../../data/menus";
import { useRef, useState, useEffect } from "react";
import ContentPageContainer from "../../containers/ContentPageContainer";
import { Container, ProfileDataContent, ProfileImage, ProfileImageContainer, ProfileName, Modal, ModalContent, CloseButton, ProfileNameInputContainer, ProfileNameInput, ProfileNameButtonsContainer, ProfileNameSaveButton, PasswordContainer, ChangePasswordButton, PasswordInputs, PasswordInput, ShowPasswordContainer } from "./styles";
import { useStateContext } from "../../contexts/ContextProvider";
import Tooltip from '@mui/material/Tooltip';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import api from "../../api";
import ClearIcon from '@mui/icons-material/Clear';
import InputDropZone from "../../components/InputDropZone";
import { toast } from "react-toastify";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import lodash from 'lodash';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Ring } from "@uiball/loaders";

function MyProfile() {

  const [menuComponent, setMenuComponent] = useState(0);
  const { user, getUser } = useStateContext();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profileNameInputIsDisabled, setProfileNameInputIsDisabled] = useState(true);
  const profileNameInputRef = useRef(null);
  const [profileNameHasChanges, setProfileNameHasChanges] = useState(false);
  const [passwordInputsIsVisible, setPasswordInputsIsVisible] = useState(false);
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaveButtonIsDisabled, setPasswordSaveButtonIsDisabled] = useState(true);
  const confirmationPasswordInputRef = useRef(null);
  const newPasswordInputRef = useRef(null);
  const originalPasswordInputRef = useRef(null);

  useEffect(() => {
    if (originalPassword && newPassword && confirmationPassword) {
      setPasswordSaveButtonIsDisabled(false);
    } else {
      setPasswordSaveButtonIsDisabled(true);
    }
  }, [originalPassword, newPassword, confirmationPassword]);

  useEffect(() => {
    if (!profileNameInputIsDisabled) {
      profileNameInputRef.current.focus();
    }
  }, [profileNameInputIsDisabled]);

  useEffect(() => {

    const profileNameChanged = !lodash.isEqual(profileName, user.name);

    if (profileNameChanged) {
      setProfileNameHasChanges(true);
    } else {
      setProfileNameHasChanges(false);
    }

  }, [profileName, user]);

  const uploadImage = async (file) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('profileImage', file);
      const response = await api.post(`/users/upload-image/${user.id}`, formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      if (response.status === 201) {
        getUser(token);
        setIsLoading(false);
        setModalIsVisible(false);
      }
    } catch {
      toast.error('Erro ao realizar upload. Por favor, tente novamente.');
      setIsLoading(false);
      return;
    }
  }

  const editProfileName = async () => {

    if (!profileName) {
      toast.warning("Digite o seu nome.");
      profileNameInputRef.current.focus();
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/users/edit-username/${user.id}`,
        { profileName },
        { headers: { authorization: token } }
      );
      if (response.status === 200) {
        getUser(token);
        toast.success("Nome do usuário alterado com sucesso.");
        setProfileNameInputIsDisabled(true);
        setIsLoading(false);
      }
    } catch {
      toast.error('Erro ao alterar nome do usuário. Por favor, tente novamente.');
      setIsLoading(false);
      return;
    }
  }

  const editPassword = async () => {

    if (newPassword !== confirmationPassword) {
      toast.warning("Senhas diferentes! Verifique os dados e tente novamente.");
      confirmationPasswordInputRef.current.focus();
      return;
    }

    if (newPassword.length < 8) {
      toast.warning("A nova senha precisa ter pelo menos 8 dígitos.");
      newPasswordInputRef.current.focus();
      return;
    }

    if (originalPassword.length < 8) {
      toast.warning("A senha anterior precisa ter pelo menos 8 dígitos.");
      originalPasswordInputRef.current.focus();
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/users/edit-password/${user.id}`,
        { originalPassword, newPassword },
        { headers: { authorization: token } }
      );
      if (response.status === 200) {
        getUser(token);
        toast.success("Sua senha foi alterada com sucesso.");
        setPasswordInputsIsVisible(false);
        setIsLoading(false);
        if (showPassword) {
          setShowPassword(false);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning('A senha anterior informada está incorreta. Verifique os dados e tente novamente.');
        setIsLoading(false);
        return;
      } else {
        return
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={myProfileMenu}
          name={'Meu perfil'}
          menuComponent={menuComponent}
          setMenuComponent={setMenuComponent}
        />
      }
    >


      {menuComponent == 0 &&
        <Container>
          <ProfileDataContent>
            <ProfileImageContainer>
              <ProfileImage
                profileimage={user && user.profileImage}
              >
                {
                  Object.keys(user).length > 0 &&
                  !user.profileImage &&
                  user.name.charAt(0).toUpperCase()
                }

                <Tooltip
                  title="Editar foto de perfil"
                  style={{ color: "#333", position: "absolute", right: "-10px", top: "80px", cursor: "pointer" }}
                >
                  <DriveFileRenameOutlineIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalIsVisible(true);
                    }}
                  />
                </Tooltip>
              </ProfileImage>
              <ProfileName>{Object.keys(user).length > 0 && user.name}</ProfileName>
            </ProfileImageContainer>

            <ProfileNameInputContainer>
              <ProfileNameInput
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                disabled={profileNameInputIsDisabled}
                ref={profileNameInputRef}
              />
              <ProfileNameButtonsContainer>
                <Tooltip
                  title="Editar nome"
                  style={{ color: "#333", cursor: "pointer" }}
                >
                  <DriveFileRenameOutlineIcon
                    onClick={() => {
                      setProfileNameInputIsDisabled(false);
                    }}
                  />
                </Tooltip>

                <Tooltip
                  title="Salvar"
                  style={{ color: "#333", cursor: "pointer" }}
                >
                  <ProfileNameSaveButton
                    onClick={() => {
                      editProfileName();
                    }}
                    color={profileNameHasChanges}
                    disabled={!profileNameHasChanges}
                  >
                    {isLoading ? <Ring /> : <SaveOutlinedIcon />}
                  </ProfileNameSaveButton>
                </Tooltip>
              </ProfileNameButtonsContainer>
            </ProfileNameInputContainer>

            <PasswordContainer>
              {
                passwordInputsIsVisible &&
                <PasswordInputs>
                  <PasswordInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha anterior"
                    onChange={(e) => setOriginalPassword(e.target.value)}
                    maxLength={8}
                    onKeyDown={handleKeyDown}
                    ref={originalPasswordInputRef}
                  />
                  <PasswordInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    onChange={(e) => setNewPassword(e.target.value)}
                    ref={newPasswordInputRef}
                    maxLength={8}
                    onKeyDown={handleKeyDown}
                  />
                  <PasswordInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirme a senha"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    ref={confirmationPasswordInputRef}
                    maxLength={8}
                    onKeyDown={handleKeyDown}
                  />
                </PasswordInputs>
              }
              {
                passwordInputsIsVisible &&
                <Tooltip
                  title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  style={{ color: "#333", cursor: "pointer" }}
                >
                  <ShowPasswordContainer>
                    {
                      showPassword ?
                        <VisibilityIcon onClick={() => setShowPassword(false)} />
                        :
                        <VisibilityOffIcon onClick={() => setShowPassword(true)} />
                    }
                  </ShowPasswordContainer>
                </Tooltip>
              }
              {
                passwordInputsIsVisible &&
                <Tooltip
                  title="Salvar"
                  style={{ color: "#333", cursor: "pointer" }}
                >
                  <ProfileNameSaveButton
                    onClick={() => {
                      editPassword();
                    }}
                    color={originalPassword && newPassword && confirmationPassword}
                    disabled={passwordSaveButtonIsDisabled}
                  >
                    {isLoading ? <Ring /> : <SaveOutlinedIcon />}
                  </ProfileNameSaveButton>
                </Tooltip>
              }
              <ChangePasswordButton onClick={() => setPasswordInputsIsVisible(!passwordInputsIsVisible)}>
                {passwordInputsIsVisible ? "Cancelar" : "Alterar senha"}
              </ChangePasswordButton>
            </PasswordContainer>
          </ProfileDataContent>
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
              {
                isLoading ?
                  <Ring />
                  :
                  <InputDropZone sendFile={uploadImage} acceptedFileType="image/*" width={190} height={130} />
              }
            </ModalContent>
          </Modal>
        </Container>
      }
      {menuComponent == 1 &&
        <Container>
          <span>Meu plano</span>
        </Container>
      }
      {menuComponent == 2 &&
        <Container>
          <span>Configurações</span>
        </Container>
      }

    </ContentPageContainer>
  )
}

export default MyProfile;