import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css'
import { ButtonAdd, FlowContainer } from "./CreateFluxogram.style";
import { DefaultNode } from "../../components/nodes/DefaultNode";
import { useCallback } from "react";
import DefaultEdge from "../../components/edges/DefaultEdge";

const NODE_TYPES = {
  defaultNode: DefaultNode,
}

const EDGE_TYPES = {
  defaultEdge: DefaultEdge,
}

const INITIAL_NODE = [
  {
    id: 'start node',
    type: 'defaultNode',
    position: { x: 200, y: 200 },
    data: { label: 'Start' }
  },
  {
    id: 'start node1',
    type: 'defaultNode',
    position: { x: 700, y: 200 },
    data: { label: 'Start' }
  }
]


let id = 0;
// eslint-disable-next-line no-unused-vars
const getId = () => `dndnode_${id++}`;

const CreateFluxogram = () => {

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODE)

  const onConnect = useCallback((connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addDefaultNode() {
    const type = 'defaultNode'
    setNodes(nodes => [
      ...nodes,
      {
        id: getId(),
        type,
        position: { x: 400, y: 200 },
        data: { label: 'default' }
      }
    ])
  }

  return (
    <FlowContainer>
      <ButtonAdd onClick={addDefaultNode}>Novo default</ButtonAdd>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        defaultEdgeOptions={{ type: 'defaultEdge' }}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background
          gap={12}
          size={2}
          color="#ddd"
          style={{ backgroundColor: "#c1c1c1" }}
        />
        <Controls />
      </ReactFlow>
    </FlowContainer>
  );
};

export default CreateFluxogram;