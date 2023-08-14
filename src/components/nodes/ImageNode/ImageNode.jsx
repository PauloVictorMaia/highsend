/* eslint-disable react/prop-types */
import { Image, ImageNodeMenu, ImagePreview, NodeContainer, Navigation, ListTabs, Tabs, SendImages, LinkInput, ChooseFileButton, FileInput } from "./ImageNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function ImageNode({ data, id }) {
  const { setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("tab1");

  const handleFileImage = (e) => {
    const selectedFile = e.target.files[0];
    const objectURL = URL.createObjectURL(selectedFile);
    setNodeValue(objectURL);
  };

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <NodeContainer>

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#000',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '8px',

        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <ImagePreview onClick={() => setIsVisible(!isVisible)}>
        <PhotoCameraOutlinedIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <Image src={data.value} alt="preview da imagem" />
        }
      </ImagePreview>

      <ImageNodeMenu isvisible={isVisible ? "true" : "false"}>
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
              onChange={(e) => setNodeValue(e.target.value)}
            />
          )}
          {activeTab === "tab2" && (
            <>
              <ChooseFileButton htmlFor="fileInput">Choose File</ChooseFileButton>
              <FileInput
                type="file"
                id="fileInput"
                onChange={handleFileImage}
                accept=".jpg, .png, .gif"
              />
            </>
          )}
        </SendImages>
      </ImageNodeMenu>

    </NodeContainer>
  )
}