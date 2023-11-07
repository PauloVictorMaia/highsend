/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  NodeContainer, AudioPreview,
  AudioNodeMenu, SendAudio,
  Tabs, Navigation,
  ListTabs, ChooseFileButton,
  FileInput, LinkInput, CustomToolbar, CloseButton, SwitchContainer, InputsContainer, UploadButtonContainer
} from "./AudioNode.style"
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../../../api';
import { toast } from "react-toastify";
import { Ring } from "@uiball/loaders";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';
import { useStateContext } from "../../../contexts/ContextProvider";
import { Switch } from "@mui/material";

function AudioNode({ data, id, groupID }) {

  const [nodeValue, setNodeValue] = useState(data.value || "")
  const { setNodes } = useReactFlow();
  const [activeTab, setActiveTab] = useState("tab1");
  const [uploading, setUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const [autoplay, setAutoplay] = useState(data.autoplay || false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px"
  }

  const uploadAudio = async (e) => {
    const file = e.target.files[0];
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('nodeAudio', file);
      const response = await api.post('/flows/upload-audio', formData,
        {
          headers: { 'Content-Type': 'audio/mpeg' }
        });
      if (response.status === 201) {
        setNodeValue(response.data.audioUrl);
        toast.success('Upload realizado com sucesso.');
        setUploading(false);
      }
    } catch {
      toast.error('Erro ao realizar upload da imagem.');
      setUploading(false);
    }
  };

  const deleteNode = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === groupID) {
          const deletedBlock = node.data.blocks.find(block => block.id === id);
          const deletedBlockHeight = deletedBlock.style.height;
          const updatedBlocks = node.data.blocks.filter((block) => block.id !== id);
          if (updatedBlocks.length === 0) {
            return null;
          }
          return {
            ...node,
            data: {
              ...node.data,
              blocks: updatedBlocks,
            },
            style: {
              width: 250,
              height: node.style.height - deletedBlockHeight - 10,
              padding: '0px',
              borderRadius: '8px',
              border: "none"
            }
          };
        }
        return node;
      }).filter(Boolean);
    });
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.value = nodeValue
              nodeOnBlock.data.autoplay = autoplay
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue]);

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [nodeMenuIsOpen]);

  const openMenu = () => {
    if (isVisible) {
      setIsVisible(false);
      return;
    }
    setNodeMenuIsOpen(!nodeMenuIsOpen);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }

  return (
    <NodeContainer
      onClick={() => openMenu()}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >

      <CustomToolbar
        isvisible={isVisible}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={() => deleteNode()} />
      </CustomToolbar>

      <AudioPreview>
        <AudioFileOutlinedIcon />
        {nodeValue === "" ?
          <span>Click para editar...</span>
          :
          <audio controls>
            <source src={nodeValue} type="audio/mpeg" />
            <source src={nodeValue} type="audio/wav" />
          </audio>
        }
      </AudioPreview>

      <AudioNodeMenu isvisible={isVisible} onClick={(e) => e.stopPropagation()} >
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }}
        >
          <ClearIcon />
        </CloseButton>
        <Navigation>
          <ListTabs>
            <Tabs
              onClick={() => setActiveTab("tab1")}
              activetab={activeTab === "tab1" ? "true" : "false"}
            >
              Link
            </Tabs>
            <Tabs
              onClick={() => setActiveTab("tab2")}
              activetab={activeTab === "tab2" ? "true" : "false"}
            >
              Upload
            </Tabs>
          </ListTabs>
        </Navigation>
        <SendAudio>
          {activeTab === "tab1" && (
            <InputsContainer>
              <LinkInput
                type="text"
                placeholder="Cole aqui o link do áudio"
                onChange={(e) => setNodeValue(e.target.value)}
                value={nodeValue}
              />
              <SwitchContainer>
                <span>Auto-play</span>
                <Switch
                  size="small"
                  defaultChecked={autoplay}
                  onChange={() => setAutoplay(!autoplay)}
                />
              </SwitchContainer>
            </InputsContainer>
          )}
          {activeTab === "tab2" && (
            <InputsContainer>
              <UploadButtonContainer>
                <ChooseFileButton
                  htmlFor={id}
                >
                  {uploading ? <Ring color="#fff" size={25} /> : "Escolher arquivo"}
                </ChooseFileButton>
                <FileInput
                  type="file"
                  id={id}
                  onChange={uploadAudio}
                  accept=".mp3, .wav"
                />
              </UploadButtonContainer>
              <SwitchContainer>
                <span>Auto-play</span>
                <Switch
                  size="small"
                  defaultChecked={autoplay}
                  onChange={() => setAutoplay(!autoplay)}
                />
              </SwitchContainer>
            </InputsContainer>
          )}
        </SendAudio>
      </AudioNodeMenu>

    </NodeContainer>
  )
}

export default AudioNode;