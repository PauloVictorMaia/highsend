/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { LinkInput, NodeContainer, PreviewImage, VideoPreview } from "./VideoNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export function VideoNode({ data, id, selected }) {
  const [nodeValue, setNodeValue] = useState(data.value || "")
  const [videoLink, setVideoLink] = useState("")
  const { setNodes } = useReactFlow();

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const getYoutubeThumbnail = (url) => {
    if (url === "") {
      return
    }
    setNodeValue(url)
    const videoId = url.split("v=")[1];
    setVideoLink(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
  };

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
    getYoutubeThumbnail(nodeValue)
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

      <VideoPreview>
        <MovieCreationOutlinedIcon />
        {videoLink === "" ?
          <span>Click to edit...</span>
          :
          <PreviewImage
            src={videoLink}
            alt="Video thumbnail"
          />
        }
      </VideoPreview>

      <LinkInput
        isvisible={selected}
        type="text"
        value={nodeValue}
        placeholder="link youtube / vimeo"
        onChange={(e) => getYoutubeThumbnail(e.target.value)}
      />

    </NodeContainer>
  )
}