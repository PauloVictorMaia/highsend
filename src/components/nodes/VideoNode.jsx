/* eslint-disable react/prop-types */
import { BottomHandle, Label, NodeContainer, TopHandle, VideoPreview } from "./VideoNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";
import TheatersIcon from '@mui/icons-material/Theaters';
import ReactPlayer from "react-player";

export function VideoNode({ selected, data }) {
  const { setNodeLabel, setNodeValue } = useStateContext();

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

      <VideoPreview>
        <TheatersIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <ReactPlayer
            url={data.value}
            controls={false}
            width="100%"
            height="100%"
          />
        }
      </VideoPreview>

      <input type="text" placeholder="link youtube / vimeo" onChange={(e) => setNodeValue(e.target.value)} />

    </NodeContainer>
  )
}