/* eslint-disable react/prop-types */
import { BottomHandle, Label, LinkInput, NodeContainer, PreviewImage, TopHandle, VideoPreview } from "./VideoNode.style";
import { Position, useStore, useReactFlow, NodeToolbar } from "reactflow";
import { useStateContext } from "../../../contexts/ContextProvider";
import TheatersIcon from '@mui/icons-material/Theaters';
import { useState } from "react";
import useDetachNodes from '../../../useDetachNodes'

const getYoutubeThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export function VideoNode({ selected, data, id }) {
  const { setNodeLabel, setNodeValue } = useStateContext();
  const [isVisible, setIsVisible] = useState(false)

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