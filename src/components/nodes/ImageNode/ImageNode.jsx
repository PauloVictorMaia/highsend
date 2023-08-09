/* eslint-disable react/prop-types */
import { Image, ImageNodeMenu, ImagePreview, NodeContainer, Navigation, ListTabs, Tabs, SendImages, LinkInput, ChooseFileButton, FileInput } from "./ImageNode.style";
import { useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import useDetachNodes from '../../../useDetachNodes'

export function ImageNode({ selected, data, id }) {
  const { setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("tab1");
  // eslint-disable-next-line no-unused-vars
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

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);

  return (
    <NodeContainer selected={selected}>

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>

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