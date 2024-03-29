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
import { Container } from "./CreateForm.style";
import { useCallback, useEffect, useRef, useState } from "react";
import FormSideBar from '../../components/CreateFormSidebar/FormSidebar';
import DefaultEdge from "../../components/edges/DefaultEdge/DefaultEdge";
import { sortNodes, getId } from '../../utils';
import { useStateContext } from "../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import api from '../../api';
import FormPanelButtons from "../../components/FormPanelButtons/FormPanelButtons";
import lodash from 'lodash';
import { toast } from "react-toastify";
import clipboardCopy from 'clipboard-copy';
import { StartNode } from "../../components/FormNodes/StartNode/Start";
import Group from "../../components/FormNodes/Group/Group";
import ButtonsGroup from "../../components/FormNodes/ButtonsGroup/ButtonsGroup";
import { Button } from "../../components/FormNodes/Button/Button";


const proOptions = {
  hideAttribution: true,
};

const NODE_TYPES = {
  startNode: StartNode,
  group: Group,
  buttonsGroup: ButtonsGroup,
  button: Button,
};

const EDGE_TYPES = {
  defaultEdge: DefaultEdge,
};

let label = 0;
const getLabel = () => `Node #${label++}`;

const Form = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setVariables, variables, integrations } = useStateContext();
  const activeCampaignIntegrations = integrations.filter(integrations => integrations.type === "activeCampaign");
  const webhookIntegrations = integrations.filter(integrations => integrations.type === "webhook");
  const wrapperRef = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const { user, nodeMenuIsOpen, setNodeMenuIsOpen } = useStateContext();
  const token = localStorage.getItem('token');
  const { project, getIntersectingNodes } = useReactFlow();
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const params = useParams();
  const [hasChanges, setHasChanges] = useState(false);
  const [originalNodes, setOriginalNodes] = useState([]);
  const [originalEdges, setOriginalEdges] = useState([]);
  const [originalVariables, setOriginalVariables] = useState([]);
  const [dropDownMenuIsVisible, setDropDownMenuIsVisible] = useState(false);
  const [config, setConfig] = useState({});
  const [originalConfig, setOriginalConfig] = useState({});
  const [flowName, setFlowName] = useState("");
  const BASE_URL = `${import.meta.env.VITE_OPEN_FRONT_URL}/fluxo-de-formulario/`;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getFlowData();
    }
  }, []);

  const exportToJson = () => {
    try {
      const data = {
        nodes,
        edges,
        variables,
        config,
        name: flowName,
        id: "hiflow_form_hhdgsujndyyyajkjnjscgushkandh"
      }
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hiflow_formulario_${data.name}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Erro ao exportar para JSON.");
    }
  };

  function handleHasChanged() {
    setTimeout(() => {
      setHasChanges(false);
    }, 400);
  }

  async function getFlowData() {
    try {
      const response = await api.get(`/flows/get-flow/${user.id}/${params.flowid}`,
        { headers: { authorization: token } });
      if (response.status === 200) {
        setNodes(response.data.nodes);
        setEdges(response.data.edges);
        setVariables(response.data.variables);
        setOriginalNodes(JSON.parse(JSON.stringify(response.data.nodes)));
        setOriginalEdges(JSON.parse(JSON.stringify(response.data.edges)));
        setOriginalVariables(response.data.variables);
        setConfig(response.data.config);
        setOriginalConfig(JSON.parse(JSON.stringify(response.data.config)));
        setFlowName(response.data.name);
        handleHasChanged();
      }
    } catch {
      toast.error('Erro ao buscar dados do flow.');
    }
  }

  async function saveFlowData() {

    const newNodesArray = nodes.flatMap(node => node.data?.blocks || []);

    const hasEmptyVariables = newNodesArray.some((node) => node.data.variable === "");
    if (hasEmptyVariables) {
      toast.warning("Existem inputs ou botões sem variáveis atribuídas. Atribua uma varíavel à todos os inputs e botões do seu formulario.");
      return;
    }


    const multChoiceNodes = newNodesArray.filter(node => node.type === "multChoice");
    const hasEmptyOptions = multChoiceNodes.some((node) => node.data.options.length < 1);
    if (hasEmptyOptions) {
      toast.warning('Existe inputs do tipo "Multipla escolha" sem opções adicionadas. Adicione no mínimo uma opção para cada um desses inputs.');
      return;
    }

    const scheduleNodes = newNodesArray.filter((node) => node.type === "schedule");
    if (scheduleNodes.length > 0) {
      const hasEmptyValue = scheduleNodes.some((node) => node.data.value === "");
      if (hasEmptyValue) {
        toast.warning('Existem inputs do tipo "Agenda" sem uma agenda atribuída. Atribua uma agenda para cada um desses inputs.');
        return;
      }
    }

    if (config.activeCampaign && !config.activeCampaignIntegration) {
      toast.warning("Selecione uma integração Active Campaign");
      return;
    }

    if (config.webhook && !config.webhookIntegration) {
      toast.warning("Selecione uma integração por webhook");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.patch(`/flows/update-flow/${user.id}/${params.flowid}`,
        { nodes, edges, variables, config },
        { headers: { authorization: token } });
      if (response.status === 200) {
        toast.success('Dados salvos!');
        setHasChanges(false);
        getFlowData();
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

    const variablesChanged = !lodash.isEqual(variables, originalVariables);

    const configChanged = !lodash.isEqual(config, originalConfig);

    if (nodesChanged || edgesChanged || variablesChanged || configChanged) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }

  }, [nodes, edges, variables, config]);

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
      const nodeStyle = type === 'group' || type === 'buttonsGroup' ? {
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

      const intersectionsOfButtons = getIntersectingNodes({
        x: position.x,
        y: position.y,
        width: 40,
        height: 40,
      }).filter((n) => n.type === 'buttonsGroup');
      const buttonsGroup = intersectionsOfButtons[0];

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

      if (buttonsGroup) {

        if (subType !== "button") {
          toast.warning('Esse grupo só aceita nodes do tipo "Botão"');
          return;
        }
        if (subType === "button") {
          const parentNodes = nodes.filter((node) => node.parentNode === buttonsGroup.id);
          const lastParentNode = parentNodes[parentNodes.length - 1];
          const rowGap = 5
          const initialGroupHeight = nodeStyle.height
          let parentNodesHeight = parentNodes.reduce((totalHeight, node) => {
            return totalHeight + node.style.height;
          }, 0);
          const totalGroupHeight = ((initialGroupHeight + parentNodesHeight) + ((parentNodes.length + 1) * rowGap));

          newSubnode.position = { x: 20, y: lastParentNode.position.y + (lastParentNode.style.height + rowGap) };
          newSubnode.parentNode = buttonsGroup?.id;
          newSubnode.extent = buttonsGroup ? 'parent' : undefined;
          newSubnode.type = subType;

          let newNodesGroup = nodes.map((node) => {
            if (node.id === buttonsGroup.id) {
              node.style = {
                width: 250,
                height: totalGroupHeight,
                border: "none",
                padding: '0',
                borderRadius: '8px'
              };
              node.data.blocks = [...node.data.blocks, newSubnode]
              return node;
            }
            return node;
          });

          const sortedNodes = [...newNodesGroup, newSubnode];
          setNodes(sortedNodes);
          return;
        }
      }

      if (groupNode) {
        if (subType === "button") {
          toast.warning('Nodes do tipo "Botão" devem ser criados em um grupo separado');
          return;
        }

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
        if (subType === "button") {
          const sortedNodes = store.getState().getNodes().concat(newNode, newSubnode).sort(sortNodes);
          setNodes(sortedNodes);
          return;
        }
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
      const URL = `${BASE_URL}${user.id}/${params.flowid}`;
      clipboardCopy(URL);
      toast.success('Link copiado.');
    } catch {
      toast.error('Erro ao copiar link.');
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
        <FormSideBar />
      </Panel>
      <Panel position="top-right" style={{ top: 85 }}>
        <FormPanelButtons
          save={saveFlowData}
          hasChanges={hasChanges}
          dropDownMenuIsVisible={dropDownMenuIsVisible}
          setDropDownMenuIsVisible={setDropDownMenuIsVisible}
          config={config}
          setConfig={setConfig}
          activeCampaignIntegrations={activeCampaignIntegrations}
          webhookIntegrations={webhookIntegrations}
          copyURL={copyURL}
          isLoading={isLoading}
          exportToJson={exportToJson}
        />
      </Panel>
    </Container>
  );
};


export default function CreateForm() {
  return (
    <ReactFlowProvider>
      <Form />
    </ReactFlowProvider>
  );
}