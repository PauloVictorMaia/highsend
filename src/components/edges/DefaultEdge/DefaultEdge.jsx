/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { getBezierPath } from "reactflow"
import { PathSVG } from "./DefaultEdge.style";
import { useReactFlow } from "reactflow";
import { useEffect } from "react";

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const { setEdges } = useReactFlow()

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === id) {
          edge = { ...edge, animated: true }
        }
        return edge;
      })
    );
  }, []);

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