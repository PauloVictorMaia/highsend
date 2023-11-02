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
import { FlowContainer } from "./CreateFluxogram.style";
import { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from '../../components/sidebar/Sidebar';
import DefaultEdge from "../../components/edges/DefaultEdge/DefaultEdge";
import { StartNode } from "../../components/nodes/StartNode/StartNode";
import GroupNode from "../../components/nodes/GroupNode/GroupNode";
import { sortNodes, getId } from '../../utils';
import { useStateContext } from "../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import api from '../../api';
import PanelButtons from "../../components/PanelButtons/PanelButtons";
import lodash from 'lodash';
import { toast } from "react-toastify";
import clipboardCopy from 'clipboard-copy';
import { ButtonInputOriginalNode } from "../../components/nodes/ButtonInputOriginalNode/ButtonInputOriginalNode";
import GroupNodeOriginal from "../../components/nodes/GroupNodeOriginal/GroupNodeOriginal";

const proOptions = {
  hideAttribution: true,
};

const NODE_TYPES = {
  startNode: StartNode,
  group: GroupNode,
  groupOriginal: GroupNodeOriginal,
  buttonInputNode: ButtonInputOriginalNode,
};

const EDGE_TYPES = {
  defaultEdge: DefaultEdge,
};

let label = 0;
const getLabel = () => `Node #${label++}`;

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setVariables, variables } = useStateContext();
  const wrapperRef = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const { user } = useStateContext();
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
  const [profileImage, setProfileImage] = useState("");
  const [template, setTemplate] = useState("");
  const [profileName, setProfileName] = useState("");
  const [originalProfileImage, setOriginalProfileImage] = useState("");
  const [originalTemplate, setOriginalTemplate] = useState("");
  const [originalProfileName, setOriginalProfileName] = useState("");
  const BASE_URL = `${import.meta.env.VITE_OPEN_FRONT_URL}/fluxo-de-bot/`;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getFlowData();
    }
  }, []);

  function handleHasChanged() {
    setTimeout(() => {
      setHasChanges(false);
    }, 200);
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
        setProfileImage(response.data.config.profileImage);
        setTemplate(response.data.config.template);
        setProfileName(response.data.config.profileName);
        setOriginalProfileImage(response.data.config.profileImage);
        setOriginalTemplate(response.data.config.template);
        setOriginalProfileName(response.data.config.profileName);
        handleHasChanged();
      }
    } catch {
      toast.error('Erro ao buscar dados do flow.');
    }
  }

  async function saveFlowData() {

    const newNodesArray = nodes.flatMap(node => node.data?.blocks || []);

    const dateNodes = newNodesArray.filter((node) => node.type === "dateInputNode");
    if (dateNodes.length > 0) {
      const hasEmptyValue = dateNodes.some((node) => node.data.value === "");
      if (hasEmptyValue) {
        toast.warning('Existem inputs do tipo "Data" sem uma agenda atribuída. Atribua uma agenda para cada um desses inputs.');
        return;
      }
    }

    const filteredNodes = newNodesArray.filter((node) => node.type !== "dateInputNode");
    const inputNodes = filteredNodes.filter((node) => /input/i.test(node.type));
    if (inputNodes.length > 0) {
      const hasEmptyVariables = inputNodes.some((node) => node.data.variable === "");
      if (hasEmptyVariables) {
        toast.warning("Existem inputs ou botões sem variáveis atribuídas. Atribua uma varíavel à todos os inputs e botões do seu flow.");
        return;
      }
    }

    if (template === "whatsapp" && !profileName) {
      toast.warning('Ao escolher a template "Whatsapp" você deve informar um nome para o perfil.');
      return;
    }

    const whatsappMessageLogicNodes = newNodesArray.filter((node) => node.type === "whatsappMessageLogicNode");
    if (whatsappMessageLogicNodes.length > 0) {
      const hasEmptyValue = whatsappMessageLogicNodes.some((node) => node.data.value === "");
      const hasEmptyMessage = whatsappMessageLogicNodes.some((node) => node.data.message === "");
      if (hasEmptyValue) {
        toast.warning('Existem nodes do tipo "Zap Msg" sem uma integração atribuída. Atribua uma integração Whatsapp a esses nodes.');
        return;
      } else if (hasEmptyMessage) {
        toast.warning('Existem nodes do tipo "Zap Msg" sem uma mensagem. Digite a mensagem que deve ser enviada.');
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await api.patch(`/flows/update-flow/${user.id}/${params.flowid}`,
        { nodes, edges, variables, profileImage, template, profileName },
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

    const profileImageChanged = !lodash.isEqual(profileImage, originalProfileImage);

    const templateChanged = !lodash.isEqual(template, originalTemplate);

    const profileNameChanged = !lodash.isEqual(profileName, originalProfileName);

    if (nodesChanged || edgesChanged || variablesChanged || profileImageChanged || templateChanged || profileNameChanged) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }

  }, [nodes, edges, variables, profileImage, template, profileName]);

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
      const nodeStyle = type === 'group' || type === 'groupOriginal' ? {
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
      }).filter((n) => n.type === 'groupOriginal');
      const groupNodeOriginal = intersectionsOfButtons[0];

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

      if (groupNodeOriginal) {

        if (subType !== "buttonInputNode") {
          toast.warning('Esse grupo só aceita nodes do tipo "Botão"');
          return;
        }
        if (subType === "buttonInputNode") {
          const parentNodes = nodes.filter((node) => node.parentNode === groupNodeOriginal.id);
          const lastParentNode = parentNodes[parentNodes.length - 1];
          const rowGap = 5
          const initialGroupHeight = nodeStyle.height
          let parentNodesHeight = parentNodes.reduce((totalHeight, node) => {
            return totalHeight + node.style.height;
          }, 0);
          const totalGroupHeight = ((initialGroupHeight + parentNodesHeight) + ((parentNodes.length + 1) * rowGap));

          newSubnode.position = { x: 20, y: lastParentNode.position.y + (lastParentNode.style.height + rowGap) };
          newSubnode.parentNode = groupNodeOriginal?.id;
          newSubnode.extent = groupNodeOriginal ? 'parent' : undefined;
          newSubnode.type = subType;

          let newNodesGroup = nodes.map((node) => {
            if (node.id === groupNodeOriginal.id) {
              node.style = {
                width: 250,
                height: totalGroupHeight,
                backgroundColor: '#fff',
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
        if (subType === "buttonInputNode") {
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
              backgroundColor: '#fff',
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
        if (subType === "buttonInputNode") {
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
                  backgroundColor: '#fff',
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
    <FlowContainer style={{ width: '100%', heigth: '100%' }} ref={wrapperRef}>
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
      >

        <Background
          gap={34}
          size={2}
          // color="#C6D0E1"
          color="transparent"
          style={{ backgroundColor: "#F8F8F8" }}
        />
        <Controls position="bottom-right" style={{ bottom: '100px' }} />
      </ReactFlow>
      <Panel position="top-left">
        <Sidebar />
      </Panel>
      <Panel position="top-right" style={{ top: 85 }}>
        <PanelButtons
          save={saveFlowData}
          hasChanges={hasChanges}
          dropDownMenuIsVisible={dropDownMenuIsVisible}
          setDropDownMenuIsVisible={setDropDownMenuIsVisible}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          template={template}
          setTemplate={setTemplate}
          profileName={profileName}
          setProfileName={setProfileName}
          copyURL={copyURL}
          isLoading={isLoading}
        />
      </Panel>
    </FlowContainer>
  );
};


export default function CreateFluxogram() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}