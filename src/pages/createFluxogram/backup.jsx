

//   const onDrop = (event) => {
//     event.preventDefault();

//     if (wrapperRef.current) {
//       const wrapperBounds = wrapperRef.current.getBoundingClientRect();
//       const type = event.dataTransfer.getData('application/reactflow/type');
//       const subType = event.dataTransfer.getData('application/reactflow/subtype');
//       const heightString = event.dataTransfer.getData('application/reactflow/height');
//       const height = parseFloat(heightString);
//       let position = project({ x: event.clientX - wrapperBounds.x - 20, y: event.clientY - wrapperBounds.top - 20 });
//       const nodeStyle = type === 'group' ? {
//         width: 250,
//         height: height + 60,
//         border: "none",
//         padding: '0',
//         borderRadius: '8px'
//       } : undefined;

//       const intersections = getIntersectingNodes({
//         x: position.x,
//         y: position.y,
//         width: 40,
//         height: 40,
//       }).filter((n) => n.type === 'group');
//       const groupNode = intersections[0];

//       let newNode = {
//         id: getId(),
//         type,
//         position,
//         data: {
//           label: getLabel(),
//           blocks: [],
//         },
//         style: nodeStyle,
//       };

//       let newSubnode = {
//         id: getId(),
//         type: subType,
//         position: { x: 20, y: 50 },
//         data: {},
//         parentNode: newNode.id,
//         extent: 'parent',
//         draggable: false,
//         style: { width: 210, height: height }
//       };

//       newNode.data.blocks = [newSubnode];


//       if (groupNode) {
//         const parentNodes = nodes.filter((node) => node.parentNode === groupNode.id);
//         const lastParentNode = parentNodes[parentNodes.length - 1];
//         const rowGap = 5
//         const initialGroupHeight = nodeStyle.height
//         let parentNodesHeight = parentNodes.reduce((totalHeight, node) => {
//           return totalHeight + node.style.height;
//         }, 0);
//         const totalGroupHeight = ((initialGroupHeight + parentNodesHeight) + ((parentNodes.length + 1) * rowGap));

//         newSubnode.position = { x: 20, y: lastParentNode.position.y + (lastParentNode.style.height + rowGap) };
//         newSubnode.parentNode = groupNode?.id;
//         newSubnode.extent = groupNode ? 'parent' : undefined;
//         newSubnode.type = subType;

//         let newNodesGroup = nodes.map((node) => {
//           if (node.id === groupNode.id) {
//             node.style = {
//               width: 250,
//               height: totalGroupHeight,
//               backgroundColor: '#fff',
//               border: "none",
//               padding: '0',
//               borderRadius: '8px'
//             };
//             node.data.blocks = [...node.data.blocks, newSubnode]
//             return node;
//           }
//           return node;
//         });

//         const sortedNodes = [...newNodesGroup, newSubnode];
//         setNodes(sortedNodes);
//       }

//       if (!groupNode) {
//         const sortedNodes = store.getState().getNodes().concat(newNode, newSubnode).sort(sortNodes);
//         setNodes(sortedNodes);
//       }


//     }

//   };
