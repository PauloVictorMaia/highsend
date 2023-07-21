/* eslint-disable react-hooks/exhaustive-deps */
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css'
import { FlowContainer } from "./CreateFluxogram.style";
import { DefaultNode } from "../../components/nodes/DefaultNode";
import { useCallback, useRef, useState, useEffect } from "react";
import DefaultEdge from "../../components/edges/DefaultEdge";
import { StartNode } from "../../components/nodes/StartNode";
import Sidebar from '../../components/sidebar/Sidebar'
import { useStateContext } from "../../contexts/ContextProvider";

const NODE_TYPES = {
  startNode: StartNode,
  defaultNode: DefaultNode,
}

const EDGE_TYPES = {
  defaultEdge: DefaultEdge,
}

const INITIAL_NODE = [
  {
    id: 'start node',
    type: 'startNode',
    position: { x: 250, y: 50 },
    data: {},
  }
]


let id = 0;
let group = 1
const getId = () => `node_${id++}`;
const getGroup = () => `Group #${group++}`

const CreateFluxogram = () => {

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODE)
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const { nodeLabel, setNodeLabel } = useStateContext();
  const { nodeValue, setNodeValue } = useStateContext();

  const onConnect = useCallback((connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: getGroup(), value: ""},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          node.data = {
            ...node.data,
            label: nodeLabel,
          };
        }

        return node;
      })
    );
  }, [nodeLabel, setNodeLabel]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          node.data = {
            ...node.data,
            value: nodeValue,
          };
        }

        return node;
      })
    );
  }, [nodeValue, setNodeValue]);


  return (
    <FlowContainer ref={reactFlowWrapper}>

      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        defaultEdgeOptions={{ type: 'defaultEdge' }}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background
          gap={12}
          size={2}
          color="#ddd"
          style={{ backgroundColor: "#c1c1c1" }}
        />
        <Controls />
      </ReactFlow>
      <Sidebar />
    </FlowContainer>
  );
};

export default CreateFluxogram;