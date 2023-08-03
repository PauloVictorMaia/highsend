/* eslint-disable react/prop-types */
import { getSmoothStepPath } from "reactflow"
import { PathSVG } from "./DefaultEdge.style";

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  // eslint-disable-next-line no-unused-vars
  data,
  markerEnd,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (

    <PathSVG
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />

  )
}