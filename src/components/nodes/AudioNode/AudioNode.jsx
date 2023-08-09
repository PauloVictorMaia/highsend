/* eslint-disable react/prop-types */
import { NodeContainer, TopHandle, BottomHandle, Label, AudioPreview, AudioNodeMenu, SendAudio, Tabs, Navigation, ListTabs, ChooseFileButton, FileInput, LinkInput } from "./AudioNode.style"
import { Position, useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import useDetachNodes from '../../../useDetachNodes'

function AudioNode({ selected, data, id }) {

  const { setNodeLabel, setNodeValue } = useStateContext();
  const [activeTab, setActiveTab] = useState("tab1");
  const [isVisible, setIsVisible] = useState(false)

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);

  const handleFileAudio = (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setNodeValue(audioUrl)
    }
  }

  return (
    <NodeContainer selected={selected}>

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>

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

      <AudioPreview onClick={() => setIsVisible(!isVisible)}>
        <HeadphonesIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <audio controls>
            <source src={data.value} type="audio/mpeg" />
            <source src={data.value} type="audio/wav" />
          </audio>
        }
      </AudioPreview>

      <AudioNodeMenu isvisible={isVisible ? "true" : "false"}>
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
              value={data.value || ""}
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