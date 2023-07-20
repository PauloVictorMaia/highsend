import ReactFlow, { Background, Controls } from "reactflow";
import 'reactflow/dist/style.css'
import { FlowContainer } from "./CreateFluxogram.style";
import { DefaultNode } from "../../components/nodes/DefaultNode";

const NODE_TYPES = {
  default: DefaultNode,
}

const INITIAL_NODE = [
  {
    id: 'start node',
    type: 'default',
    position: { x: 200, y: 200 },
    data: { label: 'Start' }
  }
]


let id = 0;
// eslint-disable-next-line no-unused-vars
const getId = () => `dndnode_${id++}`;

const CreateFluxogram = () => {

  return (
    <FlowContainer>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={INITIAL_NODE}
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