/* eslint-disable react/prop-types */
import { BottomHandle, Image, ImageNodeMenu, ImagePreview, Label, NodeContainer, TopHandle, Navigation, ListTabs, Tabs, SendImages, LinkInput, ChooseFileButton, FileInput } from "./ImageNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';

export function ImageNode({ selected, data }) {
  const { setNodeLabel, setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("tab1");
  const [fileImage, setFileImage] = useState(null)

  const handleFileImage = (e) => {
    const selectedFile = e.target.files[0];
    generateImagePreviewUrl(selectedFile);
  }

  const generateImagePreviewUrl = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileImage(reader.result);
      setNodeValue(reader.result)
    };
    reader.readAsDataURL(file);
  };

  return (
    <NodeContainer selected={selected}>
      <TopHandle
        id="top"
        type="target"
        position={Position.Top}
      />

      <BottomHandle
        id="bottom"
        type="source"
        position={Position.Bottom}
      />


      <Label defaultValue={data.label} onChange={(e) => setNodeLabel(e.target.value)} />

      <ImagePreview onClick={() => setIsVisible(!isVisible)}>
        <ImageIcon />
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
              active={activeTab === "tab1"}
            >
              Tab 1
            </Tabs>
            <Tabs
              onClick={() => setActiveTab("tab2")}
              active={activeTab === "tab2"}
            >
              Tab 2
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