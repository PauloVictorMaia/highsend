/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { LinkInput, InputContainer, NodeContainer, VideoPreview, Inputs, Navigation, ListTabs, Tabs, Textarea, SwitchContainer, TargetTimeInput } from "./VideoNode.style";
import { useReactFlow, NodeToolbar } from "reactflow";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Switch } from "@mui/material";
import ReactPlayer from "react-player";

export function VideoNode({ data, id, selected }) {
  const [videoLink, setVideoLink] = useState(data.type === 'link' && data.value ? data.value : "");
  const [script, setScript] = useState(data.type === 'script' && data.value ? data.value : "");
  const [type, setType] = useState(data.type || "link");
  const { setNodes } = useReactFlow();
  const [awaitTargetTime, setAwaitTargetTime] = useState(data.awaitTargetTime || false);
  const [targetTime, setTargetTime] = useState(data.targetTime || 10);

  const { deleteElements } = useReactFlow();

  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const handleScript = (script) => {
    setScript(script);
    setVideoLink("");
  }

  const handleTargetTime = (targetTime) => {
    const targetTimeToNumber = parseInt(targetTime);
    if (isNaN(targetTimeToNumber)) {
      setTargetTime(0);
    } else {
      setTargetTime(targetTimeToNumber);
    }
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          const groupID = node.parentNode
          const parentNodes = nds.filter((node) => node.parentNode === groupID)
          node.data.value = type === "link" ? videoLink : script
          node.data.type = type
          if (type === "script") {
            node.data.awaitTargetTime = awaitTargetTime
            if (awaitTargetTime) {
              node.data.targetTime = targetTime
            }
          }
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
  }, [videoLink, script, type, awaitTargetTime, targetTime]);

  return (
    <NodeContainer>

      <NodeToolbar
        offset={5}
        align='end'
        style={{
          backgroundColor: '#fff',
          color: '#595959',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '3px',
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={onDelete} />
      </NodeToolbar>

      {
        type === "link" &&
        <VideoPreview>
          <MovieCreationOutlinedIcon />
          {
            videoLink === "" ?
              "Adicione o link do video"
              :
              <ReactPlayer
                url={videoLink}
                alt="Video thumbnail"
                width="100%"
                height="140px"
                controls={false}
                playing={false}
                style={{ maxWidth: "165px" }}
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
            <>
              <LinkInput
                type="text"
                placeholder="Cole aqui o link do video"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              <span>Trabalhamos com links do Youtube e Vimeo</span>
            </>
          )}
          {type === "script" && (
            <>
              <Textarea
                type="text"
                placeholder="Cole aqui o script HTML"
                value={script}
                onChange={(e) => handleScript(e.target.value)}
              />
              <SwitchContainer>
                <span>Tempo de espera?</span>
                <Switch
                  size="small"
                  defaultChecked={awaitTargetTime}
                  onChange={() => setAwaitTargetTime(!awaitTargetTime)}
                />
              </SwitchContainer>
              {
                awaitTargetTime &&
                <>
                  <span>Esperar quantos segundos antes de continuar o fluxo?</span>
                  <TargetTimeInput
                    type="text"
                    placeholder="Segundos de espera"
                    value={targetTime}
                    onChange={(e) => handleTargetTime(e.target.value)}
                  />
                </>
              }
            </>
          )}
        </Inputs>
      </InputContainer>

    </NodeContainer>
  )
}