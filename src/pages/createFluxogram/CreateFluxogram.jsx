/* eslint-disable react-hooks/exhaustive-deps */
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState, getConnectedEdges, getOutgoers, getIncomers } from "reactflow";
import 'reactflow/dist/style.css'
import { FlowContainer } from "./CreateFluxogram.style";
import { DefaultNode } from "../../components/nodes/DefaultNode";
import { useCallback, useRef, useState, useEffect } from "react";
import DefaultEdge from "../../components/edges/DefaultEdge";
import { StartNode } from "../../components/nodes/StartNode";
import Sidebar from '../../components/sidebar/Sidebar'
import { useStateContext } from "../../contexts/ContextProvider";
import { VideoNode } from "../../components/nodes/VideoNode";
import { ImageNode } from "../../components/nodes/ImageNode";

const NODE_TYPES = {
  startNode: StartNode,
  defaultNode: DefaultNode,
  videoNode: VideoNode,
  imageNode: ImageNode,
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
let group = 0
const getId = () => `node_${id++}`;
const getGroup = () => `Group #${group++}`

const CreateFluxogram = () => {

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODE)
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const { nodeLabel, setNodeLabel } = useStateContext();
  const { nodeValue, setNodeValue } = useStateContext();

  console.log(nodes)
  console.log(edges)

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
        data: { label: getGroup(), value: "", deleteNode },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  //Mudança de nome do grupo
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

  //Mudança do conteúdo do input
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

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  const deleteNode = useCallback((deletedNodeId) => {
    setEdges((currentEdges) => {
      // Filtrar e excluir as edges que estão conectadas ao nó que será excluído
      const updatedEdges = currentEdges.filter(
        (edge) => edge.source !== deletedNodeId && edge.target !== deletedNodeId
      );
      return updatedEdges;
    });

    setNodes((currentNodes) => {
      // Excluir o nó que possui o ID igual ao ID do nó que será excluído
      const updatedNodes = currentNodes.filter((node) => node.id !== deletedNodeId);
      return updatedNodes;
    });
  }, []);



  return (
    <FlowContainer ref={reactFlowWrapper}>

      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        defaultEdgeOptions={{ type: 'defaultEdge' }}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
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