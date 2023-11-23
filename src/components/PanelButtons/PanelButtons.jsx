/* eslint-disable react/prop-types */
import { Container, Label, Button, DropDownMenu, ProfileImage, ProfileImageContainer, TemplateContainer, Modal, ModalContent, CloseButton, ProfileNameInput, SwitchContainer, IntegrationsEmptyContainer, AddTagsButton, TagsExibitionContainer, Tag, TagsContainer, InputTagsContainer, InputItem, DeleteTagButton } from "./PanelButtons.style"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import InputDropZone from "../InputDropZone";
import api from "../../api";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Ring } from "@uiball/loaders";
import { useStateContext } from "../../contexts/ContextProvider";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

function PanelButtons({
  save, hasChanges, dropDownMenuIsVisible, setDropDownMenuIsVisible, config, setConfig, copyURL, isLoading, exportToJson, activeCampaignIntegrations
}) {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const [tagsModalIsVisible, setTagsModalIsVisible] = useState(false);
  const [newTag, setNewTag] = useState("");

  // useEffect(() => {
  //   if (config.activeCampaign) {
  //     setConfig(prevConfig => ({
  //       ...prevConfig,
  //       tags: [...config.tags]
  //     }));
  //   }
  // }, [config]);

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
        setConfig(prevConfig => ({
          ...prevConfig,
          profileImage: response.data.imageUrl
        }));
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

  const addNewTag = () => {
    if (!newTag) {
      toast.warning("Digite o nome da nova tag");
      return;
    }

    const newTagObject = {
      id: uuidv4(),
      tagName: newTag
    }

    setConfig(prevConfig => ({
      ...prevConfig,
      tags: [...config.tags, newTagObject]
    }));
    cleanInput();
  }

  const cleanInput = () => {
    setNewTag("");
  }

  const deleteTag = (id) => {
    const newTagsArray = config.tags.filter(tag => tag.id !== id);
    setConfig(prevConfig => ({
      ...prevConfig,
      tags: [...newTagsArray]
    }));
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
          <ProfileImage loading={uploading} loader={<Ring />} src={config.profileImage} alt="Avatar"></ProfileImage>
          <span>Clique para editar</span>
        </ProfileImageContainer>
        <TemplateContainer>
          <span>Template</span>
          <select
            value={config.template}
            onChange={(e) => {
              setConfig(prevConfig => ({
                ...prevConfig,
                template: e.target.value
              }));
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="whatsapp">Whatsapp</option>
          </select>
        </TemplateContainer>
        {
          config.template === "whatsapp" &&
          <TemplateContainer>
            <span>Nome do perfil</span>
            <ProfileNameInput
              type="text"
              value={config.profileName}
              onChange={(e) => {
                setConfig(prevConfig => ({
                  ...prevConfig,
                  profileName: e.target.value
                }));
              }}
              maxLength={25}
            />
          </TemplateContainer>
        }

        <SwitchContainer>
          <span>Active Campaign</span>
          <Switch
            size="small"
            checked={config.activeCampaign}
            onChange={(e) => {
              if (!e.target.checked) {
                const { activeCampaignIntegration, tags, ...newConfig } = config;
                setConfig({ ...newConfig, activeCampaign: false });
              } else {
                setConfig(prevConfig => ({
                  ...prevConfig,
                  activeCampaign: true,
                  tags: []
                }));
              }
            }}
          />
        </SwitchContainer>

        {
          config.activeCampaign && (
            activeCampaignIntegrations && activeCampaignIntegrations.length > 0 ? (
              <>
                <TemplateContainer>
                  <span>Selecionar integração</span>
                  <select
                    value={config.activeCampaignIntegration}
                    onChange={(e) => {
                      setConfig(prevConfig => ({
                        ...prevConfig,
                        activeCampaignIntegration: e.target.value
                      }));
                    }}
                  >
                    <option value="">Nenhuma</option>
                    {activeCampaignIntegrations.map((integration) => (
                      <option key={integration.id} value={integration.id}>{integration.name}</option>
                    ))}
                  </select>
                </TemplateContainer>

                <AddTagsButton onClick={() => setTagsModalIsVisible(true)}>
                  {config.tags && config.tags.length > 0 ? "Editar tags" : "Adicionar tags"}
                </AddTagsButton>
              </>
            ) : (
              <IntegrationsEmptyContainer>
                <span>Você não possui uma integração</span>
              </IntegrationsEmptyContainer>
            )
          )
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

      <Modal onClick={(e) => e.stopPropagation()} isvisible={tagsModalIsVisible}>
        <ModalContent width={450} height={200}>

          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setTagsModalIsVisible(false)
            }
            }>
            <ClearIcon />
          </CloseButton>

          <TagsContainer>
            <span>Tags:</span>
            <TagsExibitionContainer>

              {
                config.tags && config.tags.length > 0 &&
                config.tags.map((tag) => (
                  <Tag key={tag.id}>
                    <DeleteTagButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTag(tag.id)
                      }}
                    >
                      <ClearIcon />
                    </DeleteTagButton>
                    {tag.tagName}
                  </Tag>
                ))
              }


            </TagsExibitionContainer>
          </TagsContainer>

          <InputTagsContainer>
            <InputItem
              label="Nova tag"
              variant="outlined"
              type="text"
              name="newtag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addNewTag();
                }
              }}
            />
            <AddTagsButton
              style={{ width: "100px" }}
              onClick={() => addNewTag()}
            >
              Adicionar
            </AddTagsButton>
          </InputTagsContainer>

        </ModalContent>
      </Modal>
    </Container >
  )
}

export default PanelButtons;