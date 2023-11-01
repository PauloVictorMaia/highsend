/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Image, ImageNodeMenu,
  ImagePreview, NodeContainer,
  Navigation, ListTabs,
  Tabs, SendImages,
  LinkInput, ChooseFileButton,
  FileInput, CloseButton, CustomToolbar
} from "./ImageNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../../../api';
import { toast } from "react-toastify";
import { Ring } from "@uiball/loaders";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

export function ImageNode({ id, groupID, data }) {

  const [nodeValue, setNodeValue] = useState(data.value || "");
  const { setNodes } = useReactFlow();
  const [activeTab, setActiveTab] = useState("tab1");
  const [uploading, setUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.value = nodeValue
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [nodeValue]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('nodeImage', file);
      const response = await api.post('/flows/upload-image', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      if (response.status === 201) {
        setNodeValue(response.data.imageUrl);
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
          };
        }
        return node;
      }).filter(Boolean);
    });
  };

  return (
    <NodeContainer
      onClick={() => setIsVisible(!isVisible)}
      onBlur={() => setIsVisible(false)}
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

      <ImagePreview>
        <PhotoCameraOutlinedIcon />
        {nodeValue === "" ?
          <span>Click para editar...</span>
          :
          <Image src={nodeValue} alt="preview da imagem" />
        }
      </ImagePreview>

      <ImageNodeMenu isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }
          }>
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
        <SendImages>
          {activeTab === "tab1" && (
            <LinkInput
              type="text"
              placeholder="Cole aqui o link da imagem"
              value={nodeValue}
              onChange={(e) => setNodeValue(e.target.value)}
            />
          )}
          {activeTab === "tab2" && (
            <>
              <ChooseFileButton
                htmlFor={id}>{uploading ? <Ring size={25}
                  color="#fff" /> : "Escolher arquivo"}
              </ChooseFileButton>
              <FileInput
                onClick={(e) => e.stopPropagation()}
                type="file"
                id={id}
                onChange={uploadImage}
                accept=".jpg, .png, .gif"
              />
            </>
          )}
        </SendImages>
      </ImageNodeMenu>

    </NodeContainer>
  )
}