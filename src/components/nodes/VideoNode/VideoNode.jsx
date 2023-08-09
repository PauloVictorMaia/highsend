/* eslint-disable react/prop-types */
import { LinkInput, NodeContainer, PreviewImage, VideoPreview } from "./VideoNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import TheatersIcon from '@mui/icons-material/Theaters';
import { useState } from "react";

const getYoutubeThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export function VideoNode({ data, id }) {
  const { setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <NodeContainer>

      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>

      <VideoPreview onClick={() => setIsVisible(!isVisible)}>
        <TheatersIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <PreviewImage
            src={getYoutubeThumbnail(data.value)}
            alt="Video thumbnail"
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