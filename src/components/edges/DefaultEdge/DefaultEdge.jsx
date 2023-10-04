/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { getBezierPath } from "reactflow"
import { PathSVG } from "./DefaultEdge.style";
import { useReactFlow, EdgeLabelRenderer } from "reactflow";
import { useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected
}) {

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const { setEdges } = useReactFlow()
  const { deleteElements } = useReactFlow();

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

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    deleteElements({ edges: [{ id }] });
  };

  return (
    <>
      <PathSVG
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            top: "-15px",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
            display: selected ? "block" : "none"
          }}
          className="nodrag nopan"
        >
          <DeleteOutlineIcon className="edgebutton" style={{ fontSize: "1.5rem", color: "#555", cursor: "pointer" }} onClick={(event) => onEdgeClick(event, id)} />
        </div>
      </EdgeLabelRenderer>
    </>

  )
}