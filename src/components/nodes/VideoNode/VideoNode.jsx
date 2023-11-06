/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { LinkInput, InputContainer, NodeContainer, VideoPreview, Inputs, Navigation, ListTabs, Tabs, Textarea, SwitchContainer, TargetTimeInput, CustomToolbar, CloseButton } from "./VideoNode.style";
import { useReactFlow } from "reactflow";
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Switch } from "@mui/material";
import ReactPlayer from "react-player";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

export function VideoNode({ data, id, groupID }) {
  const [videoLink, setVideoLink] = useState(data.type === 'link' && data.value ? data.value : "");
  const [script, setScript] = useState(data.type === 'script' && data.value ? data.value : "");
  const [type, setType] = useState(data.type || "link");
  const { setNodes } = useReactFlow();
  const [awaitTargetTime, setAwaitTargetTime] = useState(data.awaitTargetTime || false);
  const [targetTime, setTargetTime] = useState(data.targetTime || 10);
  const [autoplay, setAutoplay] = useState(data.autoplay || false);
  const [isVisible, setIsVisible] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px"
  }

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

  // useEffect(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === id) {
  //         const groupID = node.parentNode
  //         const parentNodes = nds.filter((node) => node.parentNode === groupID)
  //         node.data.value = type === "link" ? videoLink : script
  //         node.data.type = type
  //         node.data.autoplay = autoplay
  //         if (type === "script") {
  //           node.data.awaitTargetTime = awaitTargetTime
  //           if (awaitTargetTime) {
  //             node.data.targetTime = targetTime
  //           }
  //         }
  //         setNodes((nds) =>
  //           nds.map((node) => {
  //             if (node.id === groupID) {
  //               node.data.blocks = [...parentNodes]
  //             }
  //             return node;
  //           })
  //         )
  //       }

  //       return node;
  //     })
  //   );
  // }, [videoLink, script, type, awaitTargetTime, targetTime, autoplay]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.value = type === "link" ? videoLink : script
              nodeOnBlock.data.type = type
              nodeOnBlock.data.autoplay = autoplay
              if (type === "script") {
                nodeOnBlock.data.awaitTargetTime = awaitTargetTime
                if (awaitTargetTime) {
                  nodeOnBlock.data.targetTime = targetTime
                }
              }
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [videoLink, script, type, awaitTargetTime, targetTime, autoplay]);

  const deleteNode = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === groupID) {
          const deletedBlock = node.data.blocks.find(block => block.id === id);
          const deletedBlockHeight = deletedBlock.style.height;
          const updatedBlocks = node.data.blocks.filter((block) => block.id !== id);
          if (updatedBlocks.length === 0) {
            return null;
          }
          return {
            ...node,
            data: {
              ...node.data,
              blocks: updatedBlocks,
            },
            style: {
              width: 250,
              height: node.style.height - deletedBlockHeight - 10,
              padding: '0px',
              borderRadius: '8px',
              border: "none"
            }
          };
        }
        return node;
      }).filter(Boolean);
    });
  };

  return (
    <NodeContainer
      onClick={() => setIsVisible(!isVisible)}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >

      <CustomToolbar
        isvisible={isVisible}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={() => deleteNode()} />
      </CustomToolbar>

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

      <InputContainer isvisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }
          }>
          <ClearIcon />
        </CloseButton>
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
              <SwitchContainer>
                <span>Auto-play</span>
                <Switch
                  size="small"
                  defaultChecked={autoplay}
                  onChange={() => setAutoplay(!autoplay)}
                />
              </SwitchContainer>
              {
                autoplay &&
                <span style={{ fontSize: "10px" }}>
                  Lembrando que auto-play é uma funcionalidade extremamente incosistênte, varia de navegador para navegador e de dispositivo para disposivito, mas de qualquer forma, fazemos de tudo para entregar uma boa experiência de autoplay
                </span>
              }
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
                <span>Auto-play</span>
                <Switch
                  size="small"
                  defaultChecked={autoplay}
                  onChange={() => setAutoplay(!autoplay)}
                />
              </SwitchContainer>
              {
                autoplay &&
                <span style={{ fontSize: "10px" }}>
                  Lembrando que auto-play é uma funcionalidade extremamente incosistênte, varia de navegador para navegador e de dispositivo para disposivito, mas de qualquer forma, fazemos de tudo para entregar uma boa experiência de autoplay
                </span>
              }
              <SwitchContainer>
                <span>Tempo de espera</span>
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