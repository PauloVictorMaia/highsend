/* eslint-disable react/prop-types */
import { LinkInput, NodeContainer, PreviewImage, VideoPreview } from "./VideoNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

      <VideoPreview onClick={() => setIsVisible(!isVisible)}>
        <MovieCreationOutlinedIcon />
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