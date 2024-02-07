/* eslint-disable react-hooks/exhaustive-deps */
import ReactFlow, {
  Background, Controls,
  useEdgesState,
  useNodesState, getConnectedEdges,
  getOutgoers, getIncomers,
  updateEdge, useReactFlow,
  useStoreApi, ReactFlowProvider, Panel, addEdge
} from "reactflow";
import 'reactflow/dist/style.css';
import { Container } from "./CreateAutomations.style";
import { useCallback, useEffect, useRef, useState } from "react";
import AutomationsSideBar from '../../components/CreateAutomationsSidebar/automationsSidebar';
import DefaultEdge from "../../components/edges/DefaultEdge/DefaultEdge";
import { sortNodes, getId } from '../../utils';
import { useStateContext } from "../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import api from '../../api';
import AutomationsPanelButtons from "../../components/AutomationsPanelButtons/AutomationPanelButtons";
import lodash from 'lodash';
import { toast } from "react-toastify";
import clipboardCopy from 'clipboard-copy';
import { StartNode } from "../../components/AutomationsNodes/StartNode/Start";
import Group from "../../components/AutomationsNodes/Group/Group";

const proOptions = {
  hideAttribution: true,
};

const NODE_TYPES = {
  startNode: StartNode,
  group: Group,
};

const EDGE_TYPES = {
  defaultEdge: DefaultEdge,
};

let label = 0;
const getLabel = () => `Node #${label++}`;

const Automation = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [active, setActive] = useEdgesState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalNodes, setOriginalNodes] = useState([]);
  const [originalEdges, setOriginalEdges] = useState([]);
  const wrapperRef = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const { user, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const token = localStorage.getItem('token');
  const { project, getIntersectingNodes } = useReactFlow();
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getAutomationData();
    }
  }, []);

  function handleHasChanged() {
    setTimeout(() => {
      setHasChanges(false);
    }, 400);
  }

  async function getAutomationData() {
    try {
      const response = await api.get(`/automations/get-automation-data/${params.flowId}`,
        { headers: { authorization: token } });
      if (response.status === 200) {
        setNodes(response.data.automation.nodes);
        setEdges(response.data.automation.edges);
        setActive(response.data.automation.active);
        setOriginalNodes(JSON.parse(JSON.stringify(response.data.automation.nodes)));
        setOriginalEdges(JSON.parse(JSON.stringify(response.data.automation.edges)));
        handleHasChanged();
      }
    } catch {
      toast.error('Erro aqui.');
    }
  }

  async function saveAutomationData() {

    const newNodesArray = nodes.flatMap(node => node.data?.blocks || []);
    const whatsappNodes = newNodesArray.filter(node => node.type === 'whatsapp');

    if (whatsappNodes.length > 0) {
      let hasError = false;

      for (let i = 0; i < whatsappNodes.length; i++) {
        const { data } = whatsappNodes[i];

        if (!data || !data.integration) {
          toast.warning("Existem nodes do tipo Zap Msg com dados faltantes. Escolha uma integração Whatsapp.");
          hasError = true;
          break;
        }

        if (!data || !data.message) {
          toast.warning("Existem nodes do tipo Zap Msg com dados faltantes. Digite a mensagem que deve ser enviada.");
          hasError = true;
          break;
        }

        if (data.specificMoment) {
          if (!data.specificDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(data.specificDate)) {
            toast.warning("Existem nodes do tipo Zap Msg com dados faltantes. Preencha a data específica no formato 99/99/9999.");
            hasError = true;
            break;
          }

          if (!data.specificTime || !/^\d{2}:\d{2}$/.test(data.specificTime)) {
            toast.warning("Existem nodes do tipo Zap Msg com dados faltantes. Preencha o horário específico no formato 00:00.");
            hasError = true;
            break;
          }
        } else {
          if (!data.time) {
            toast.warning("Existem nodes do tipo Zap Msg com dados faltantes. O campo 'tempo' deve ser preenchido.");
            hasError = true;
            break;
          }

          if (!/^\d{2}:\d{2}$/.test(data.start) || !/^\d{2}:\d{2}$/.test(data.end)) {
            toast.warning("Existem nodes do tipo Zap Msg com dados faltantes. Os formatos de 'start' e 'end' devem ser 00:00.");
            hasError = true;
            break;
          }
        }
      }

      if (hasError) {
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await api.patch(`/automations/update-automation/${params.flowId}`,
        { nodes, edges },
        { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Dados salvos!');
        setHasChanges(false);
        getAutomationData();
        setIsLoading(false);

      }
    } catch (error) {
      toast.error('Erro ao salvar.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const nodesChanged = !lodash.isEqual(
      nodes.map(node => lodash.omit(node, 'selected')),
      originalNodes.map(node => lodash.omit(node, 'selected'))
    );

    const edgesChanged = !lodash.isEqual(
      edges.map(edge => lodash.omit(edge, 'selected')),
      originalEdges.map(edge => lodash.omit(edge, 'selected'))
    );

    if (nodesChanged || edgesChanged) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }

  }, [nodes, edges]);

  const onConnect = useCallback((connection) => {

    const isSourceNodeConnected = edges.some((edge) => edge.source === connection.source);


    if (isSourceNodeConnected) {
      return;
    }


    setEdges((eds) => addEdge(connection, eds))
  }, [edges]);


  const onDragOver = useCallback((event) => {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const onDrop = (event) => {
    event.preventDefault();

    if (wrapperRef.current) {

      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const subType = event.dataTransfer.getData('application/reactflow/subtype');
      const heightString = event.dataTransfer.getData('application/reactflow/height');
      const height = parseFloat(heightString);
      let position = project({ x: event.clientX - wrapperBounds.x - 20, y: event.clientY - wrapperBounds.top - 20 });
      const nodeStyle = type === 'group' ? {
        width: 250,
        height: height + 60,
        border: "none",
        padding: '0',
        borderRadius: '8px'
      } : undefined;

      const intersections = getIntersectingNodes({
        x: position.x,
        y: position.y,
        width: 40,
        height: 40,
      }).filter((n) => n.type === 'group');
      const groupNode = intersections[0];

      let newNode = {
        id: getId(),
        type,
        position,
        dragHandle: '.custom-drag-handle',
        data: {
          label: getLabel(),
          blocks: [],
        },
        style: nodeStyle,
      };

      let newSubnode = {
        id: getId(),
        type: subType,
        position: { x: 20, y: 50 },
        data: {},
        parentNode: newNode.id,
        extent: 'parent',
        draggable: false,
        style: { width: 210, height: height }
      };

      newNode.data.blocks = [newSubnode];

      if (groupNode) {

        const initialGroupHeight = nodeStyle.height;
        const rowGap = 10;
        const parentNodes = groupNode.data.blocks;
        let parentNodesHeight = parentNodes.reduce((totalHeight, node) => {
          return totalHeight + node.style.height;
        }, 0);
        const totalGroupHeight = ((initialGroupHeight + parentNodesHeight) + ((parentNodes.length + 1) * rowGap));
        newSubnode.parentNode = groupNode?.id;

        newSubnode.type = subType;

        let newNodesGroup = nodes.map((node) => {
          if (node.id === groupNode.id) {
            node.style = {
              width: 250,
              height: totalGroupHeight,
              border: "none",
              padding: '0',
              borderRadius: '8px'
            };
            node.data.blocks = [...node.data.blocks, newSubnode]
            node.selected = !node.selected //isso faz a renderização funcionar
            return node;
          }
          return node;
        });

        const sortedNodes = [...newNodesGroup];
        setNodes(sortedNodes);
      }

      if (!groupNode) {
        const sortedNodes = store.getState().getNodes().concat(newNode).sort(sortNodes);
        setNodes(sortedNodes);
      }
    }

  };

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

      const groupID = deleted[0].parentNode;
      const parentNodes = nodes.filter((node) => node.parentNode === groupID && deleted[0].id !== node.id);
      if (groupID) {
        let parentNodesHeight = parentNodes.reduce((totalHeight, node) => {
          return totalHeight + node.style.height;
        }, 0);
        const rowGap = 5;
        const groupNodeHeight = parentNodesHeight + ((parentNodes.length + 1) * rowGap) + 60;
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === groupID) {
              node = {
                ...node,
                style: {
                  width: 250,
                  height: groupNodeHeight,
                  padding: '0px',
                  borderRadius: '8px',
                  border: "none"
                }
              }
              node.data.blocks = [...parentNodes];
            }

            if (parentNodes.indexOf(node) > -1 && !(node.id === groupID) && node.id === parentNodes[0].id) {
              node.position = { x: node.position.x, y: (parentNodes.indexOf(node) + 1) * 50 }
            }

            if (groupID && parentNodes.indexOf(node) > -1 && !(node.id === groupID) && node.id !== parentNodes[0].id) {
              const previousNodeIndex = parentNodes.indexOf(node) - 1;
              const previousNode = parentNodes[previousNodeIndex];
              const newPositionY = previousNode.position.y + previousNode.style.height + rowGap;
              node.position = { x: node.position.x, y: newPositionY };
            }

            if (parentNodes.length < 1) {
              deleteElements({ nodes: [{ id: groupID }] });
            }

            return node;
          })
        );

      }


    },
    [nodes, edges]
  );

  const copyURL = () => {
    try {
      const URL = "http://api.hiflow.com.br/automations/webhook";
      clipboardCopy(URL);
      toast.success('Endpoint copiado.');
    } catch {
      toast.error('Erro ao copiar endpoint.');
    }
  }

  return (
    <Container style={{ width: '100%', heigth: '100%' }} ref={wrapperRef}>
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
        onDrop={onDrop}
        proOptions={proOptions}
        onDragOver={onDragOver}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        zoomOnDoubleClick={false}
        onPaneClick={() => setNodeMenuIsOpen(!nodeMenuIsOpen)}
      >

        <Background
          gap={34}
          size={2}
          color="transparent"
          style={{ backgroundColor: "#F8F8F8" }}
        />
        <Controls position="bottom-right" style={{ bottom: '100px' }} />
      </ReactFlow>
      <Panel position="top-left">
        <AutomationsSideBar />
      </Panel>
      <Panel position="top-right" style={{ top: 85 }}>
        <AutomationsPanelButtons
          save={saveAutomationData}
          hasChanges={hasChanges}
          copyURL={copyURL}
          isLoading={isLoading}
          active={active}
          setActive={setActive}
        />
      </Panel>
    </Container>
  );
};


export default function CreateAutomations() {
  return (
    <ReactFlowProvider>
      <Automation />
    </ReactFlowProvider>
  );
}