/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Image, ImageNodeMenu,
  ImagePreview, NodeContainer,
  Navigation, ListTabs,
  Tabs, SendImages,
  LinkInput, ChooseFileButton,
  FileInput
} from "./ImageNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../../../api';
import { toast } from "react-toastify";

export function ImageNode({ id, data, selected }) {
  const [nodeValue, setNodeValue] = useState(data.value || "")
  const { setNodes } = useReactFlow();
  const [activeTab, setActiveTab] = useState("tab1");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append('nodeImage', file);
      const response = await api.post('/flows/upload-image', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      if (response.status === 201) {
        setNodeValue(response.data.imageUrl)
        toast.success('Upload realizado com sucesso.')
      }
    } catch {
      toast.error('Erro ao realizar upload da imagem.')
    }
  };

  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data.value = nodeValue
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === groupID) {
                node.data.blocks = [...parentNodes]
              }
              return node;
            })
          )
        }

        return node;
      })
    );
  }, [nodeValue]);

  return (
    <NodeContainer>

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#595959',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '3px',
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <ImagePreview>
        <PhotoCameraOutlinedIcon />
        {nodeValue === "" ?
          <span>Click para editar...</span>
          :
          <Image src={nodeValue} alt="preview da imagem" />
        }
      </ImagePreview>

      <ImageNodeMenu isvisible={selected}>
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
              <ChooseFileButton htmlFor={id}>Escolher arquivo</ChooseFileButton>
              <FileInput
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