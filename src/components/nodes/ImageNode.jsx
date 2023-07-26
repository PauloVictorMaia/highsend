/* eslint-disable react/prop-types */
import { BottomHandle, Image, ImagePreview, Label, NodeContainer, TopHandle } from "./ImageNode.style";
import { Position } from "reactflow";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';

export function ImageNode({ selected, data }) {
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

      <ImagePreview onClick={() => setIsVisible(!isVisible)}>
        <ImageIcon />
        {data.value === "" ?
          <span>Click to edit...</span>
          :
          <Image src={data.value} alt="preview da imagem" />
        }
      </ImagePreview>



    </NodeContainer>
  )
}