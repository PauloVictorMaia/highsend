/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './updatenode.css';
import './index.css';
import Sidebar from './Sidebar';

import CustomResizerNode from './CustomResizerNode';

const nodeTypes = {
  CustomResizerNode
}

const startNode = [
  {
    id: 'start node',
    type: 'input',
    data: { label: 'start' },
    position: { x: 250, y: 5 },
    style: { height: 75, width: 150 }
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const CreateFluxogram = () => {
  const dragRef = useRef(null);

  const onNodeDragStart = (evt, node) => {
    dragRef.current = node;
  };

  const [target, setTarget] = useState(null);



  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(startNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  console.log(nodes)

  const onNodeDrag = (evt, node) => {

    // calculate the center point of the node from position and dimensions
    const centerX = node.position.x + node.width / 2;
    const centerY = node.position.y + node.height / 2;

    // find a node where the center point is inside
    const targetNode = nodes.find(
      (n) =>
        centerX > n.position.x &&
        centerX < n.position.x + n.width &&
        centerY > n.position.y &&
        centerY < n.position.y + n.height &&
        n.id !== node.id // this is needed, otherwise we would always find the dragged node
    );

    setTarget(targetNode);
  };

  const onNodeDragStop = (evt, node) => {
    // on drag stop, we swap the colors of the nodes
    const targetID = target?.id;

    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === target?.id) {
          n = { ...n }
        }
        if (n.id === node.id && target) {
          n = { ...n, parentNode: targetID, extent: 'parent', style: { height: target.style.height / 2, width: target.style.width / 2 } }
        }
        return n;
      })
    );

    setTarget(null);
    dragRef.current = null;
  };


  const selectedNode = nodes.find(node => node.selected);
  const nodeLabel = selectedNode ? selectedNode.data.label : ''
  let nodeBgColor = '';

  if (selectedNode) {

    if (selectedNode.style && selectedNode.style.backgroundColor) {
      nodeBgColor = selectedNode.style.backgroundColor;
    } else {
      nodeBgColor = '';
    }
  }

  let nodeColor = '';

  if (selectedNode) {

    if (selectedNode.style && selectedNode.style.color) {
      nodeColor = selectedNode.style.color;
    } else {
      nodeColor = '';
    }
  }


  const [nodeName, setNodeName] = useState('');
  const [nodeBg, setNodeBg] = useState('');
  const [nodeFontColor, setNodeFontColor] = useState('')

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, color: nodeFontColor };
        }

        return node;
      })
    );
  }, [nodeFontColor, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('label');

      // check if the dropped element is valid
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
        data: { label: `${label} node` },
        style: { width: 150, height: 75 }
      };
      setNodes((nds) => nds.concat(newNode));

    },
    [reactFlowInstance]
  );


  return (
    <div className="dndflow">
      <Sidebar />
      <div className="updatenode__controls">
        <label>Name:</label>
        <input value={nodeLabel} onChange={(evt) => setNodeName(evt.target.value)} />

        <label className="updatenode__bglabel">Background-color:</label>
        <input value={nodeBgColor} placeholder={selectedNode ? '#fff' : ''} onChange={(evt) => setNodeBg(evt.target.value)} />

        <label className='updatenode__bglabel'>Font-color:</label>
        <input value={nodeColor} placeholder={selectedNode ? '#000' : ''} onChange={(evt) => setNodeFontColor(evt.target.value)} />

      </div>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStart={onNodeDragStart}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            fitView
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default CreateFluxogram;