/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  NodeContainer, AudioPreview,
  AudioNodeMenu, SendAudio,
  Tabs, Navigation,
  ListTabs, ChooseFileButton,
  FileInput, LinkInput
} from "./AudioNode.style"
import { useReactFlow, NodeToolbar } from "reactflow";
import { useState, useEffect } from "react";
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


function AudioNode({ data, id, selected }) {

  const [nodeValue, setNodeValue] = useState(data.value || "")
  const { setNodes } = useReactFlow();
  const [activeTab, setActiveTab] = useState("tab1");

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const handleFileAudio = (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setNodeValue(audioUrl)
    }
  }

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
          color: '#000',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '8px',

        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      <AudioPreview>
        <AudioFileOutlinedIcon />
        {nodeValue === "" ?
          <span>Click to edit...</span>
          :
          <audio controls>
            <source src={nodeValue} type="audio/mpeg" />
            <source src={nodeValue} type="audio/wav" />
          </audio>
        }
      </AudioPreview>

      <AudioNodeMenu isvisible={selected}>
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
            <LinkInput
              type="text"
              onChange={(e) => setNodeValue(e.target.value)}
              value={nodeValue}
            />
          )}
          {activeTab === "tab2" && (
            <>
              <ChooseFileButton htmlFor="fileInput">Choose File</ChooseFileButton>
              <FileInput
                type="file"
                id="fileInput"
                onChange={handleFileAudio}
                accept=".mp3, .wav"
              />
            </>
          )}
        </SendAudio>
      </AudioNodeMenu>

    </NodeContainer>
  )
}

export default AudioNode;