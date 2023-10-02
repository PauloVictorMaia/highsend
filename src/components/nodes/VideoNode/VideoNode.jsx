/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { LinkInput, InputContainer, NodeContainer, PreviewImage, VideoPreview, Inputs, Navigation, ListTabs, Tabs } from "./VideoNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function VideoNode({ data, id, selected }) {
  const [videoLink, setVideoLink] = useState(data.type === 'link' && data.value ? data.value : "");
  const [script, setScript] = useState(data.type === 'script' && data.value ? data.value : "");
  const [thumbnail, setThumbnail] = useState("")
  const [type, setType] = useState(data.type || "link");
  const { setNodes } = useReactFlow();

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const getThumbnail = (url) => {
    if (url.includes("youtube")) {
      const videoId = url.split("v=")[1];
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setVideoLink(url);
      setThumbnail(thumbnailUrl);
    } else if (url.includes("vimeo")) {
      const videoId = url.split("vimeo.com/")[1];
      const thumbnailUrl = `https://i.vimeocdn.com/video/${videoId}-640.jpg`;
      setVideoLink(url);
      setThumbnail(thumbnailUrl);
      setVideoLink(url);
    } else {
      setVideoLink(url);
      setThumbnail(url);
    }

    setScript("");
  };

  const handleScript = (script) => {
    const scriptToJSON = JSON.stringify(script);
    setScript(scriptToJSON);
    setThumbnail("");
    setVideoLink("");
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data.value = type === "link" ? videoLink : script
          node.data.type = type
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
  }, [videoLink, script, type]);

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

      {
        type === "link" &&
        <VideoPreview>
          <MovieCreationOutlinedIcon />
          {
            thumbnail === "" ?
              "Adicione o link do video"
              :
              <PreviewImage
                src={thumbnail}
                alt="Video thumbnail"
              />
          }
        </VideoPreview>
      }

      {
        type === "script" &&
        <VideoPreview>
          <MovieCreationOutlinedIcon />
          {
            script === "" ?
              "Adicione o script"
              :
              "Ver script"
          }
        </VideoPreview>
      }

      <InputContainer isvisible={selected}>
        <Navigation>
          <ListTabs>
            <Tabs
              onClick={() => setType("link")}
              activetab={type === "link" ? "true" : "false"}
            >
              Link
            </Tabs>
            <Tabs
              onClick={() => setType("script")}
              activetab={type === "script" ? "true" : "false"}
            >
              Script
            </Tabs>
          </ListTabs>
        </Navigation>
        <Inputs>
          {type === "link" && (
            <LinkInput
              type="text"
              placeholder="Cole aqui o link do video (youtube ou vimeo)"
              value={videoLink}
              onChange={(e) => getThumbnail(e.target.value)}
            />
          )}
          {type === "script" && (
            <LinkInput
              type="text"
              placeholder="Cole aqui o script HTML"
              value={script}
              onChange={(e) => handleScript(e.target.value)}
            />
          )}
        </Inputs>
      </InputContainer>

    </NodeContainer>
  )
}