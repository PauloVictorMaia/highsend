/* eslint-disable react/prop-types */
import { BottomHandle, Label, LinkInput, NodeContainer, PreviewImage, TopHandle, VideoPreview } from "./VideoNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";
import TheatersIcon from '@mui/icons-material/Theaters';
import { useState } from "react";

const getYoutubeThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export function VideoNode({ selected, data }) {
  const { setNodeLabel, setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

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

      <VideoPreview onClick={() => setIsVisible(!isVisible)}>
        <TheatersIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <PreviewImage
            src={getYoutubeThumbnail(data.value)}
            alt="Video thumbnail"
            style={{ width: "200px", height: "auto" }}
          />
        }
      </VideoPreview>

      <LinkInput
        isvisible={isVisible ? "true" : "false"}
        type="text"
        value={data.value}
        placeholder="link youtube / vimeo"
        onChange={(e) => setNodeValue(e.target.value)}
      />

    </NodeContainer>
  )
}