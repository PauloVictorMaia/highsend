import { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

import './updatenode.css';

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 }, style: { backgroundColor: '#FFF' } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 }, style: { backgroundColor: '#FFF' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const selectedNode = nodes.find(node => node.selected);
  const nodeLabel = selectedNode ? selectedNode.data.label : ''
  const nodeBgColor = selectedNode ?
    selectedNode.style.backgroundColor ?
      selectedNode.style.backgroundColor : '#fff' : ''

  const [nodeName, setNodeName] = useState('');
  const [nodeBg, setNodeBg] = useState('');

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
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);



  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
    >
      <div className="updatenode__controls">
        <label>label:</label>
        <input value={nodeLabel} onChange={(evt) => setNodeName(evt.target.value)} />

        <label className="updatenode__bglabel">background:</label>
        <input value={nodeBgColor} onChange={(evt) => setNodeBg(evt.target.value)} />

      </div>
    </ReactFlow>
  );
};

export default UpdateNode;
