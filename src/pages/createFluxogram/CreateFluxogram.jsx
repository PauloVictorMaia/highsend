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
import { TextNode } from "../../components/nodes/TextNode/TextNode";
import { VideoNode } from "../../components/nodes/VideoNode/VideoNode";
import { ImageNode } from "../../components/nodes/ImageNode/ImageNode";
import { TextInputNode } from "../../components/nodes/TextInputNode/TextInputNode";
import EmbedNode from "../../components/nodes/EmbedNode/EmbedNode";
import AudioNode from "../../components/nodes/AudioNode/AudioNode";
import GroupNode from "../../components/nodes/GroupNode/GroupNode";
import { NumberInputNode } from "../../components/nodes/NumberInputNode/NumberInputNode";
import { EmailInputNode } from "../../components/nodes/EmailInputNode/EmailInputNode";
import { WebsiteInputNode } from "../../components/nodes/WebsiteInputNode/WebsiteInputNode";
import { PhoneInputNode } from "../../components/nodes/PhoneInputNode/PhoneInputNode";
import { DateInputNode } from "../../components/nodes/DateInputNode/DateInputNode";
import { sortNodes, getId, getNodePositionInsideParent } from '../../utils';
import { useStateContext } from "../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import api from '../../api';
import PanelButtons from "../../components/PanelButtons/PanelButtons";
import lodash from 'lodash';
import { toast } from "react-toastify";
import DelayLogicNode from "../../components/nodes/DelayLogicNode/DelayLogicNode";
import LinkButtonInputNode from "../../components/nodes/LInkButtonInputNode/LinkButtonInputNode";
import RedirectLogicNode from "../../components/nodes/RedirectLogicNode/RedirectLogicNode";
import WhatsappMessageLogicNode from "../../components/nodes/WhatsappMessageLogicNode/WhatsappMessageLogicNode";
import clipboardCopy from 'clipboard-copy';
import PixelFacebookLogicNode from "../../components/nodes/PixelFacebook/PixelFacebookLogicNode";
import WebhookLogicNode from "../../components/nodes/WebhookLogicNode/WebhookLogicNode";
import { ButtonInputOriginalNode } from "../../components/nodes/ButtonInputOriginalNode/ButtonInputOriginalNode";
import GroupNodeOriginal from "../../components/nodes/GroupNodeOriginal/GroupNodeOriginal";

const proOptions = {
  hideAttribution: true,
};

const NODE_TYPES = {
  startNode: StartNode,
  textNode: TextNode,
  videoNode: VideoNode,
  imageNode: ImageNode,
  embedNode: EmbedNode,
  audioNode: AudioNode,
  textInputNode: TextInputNode,
  group: GroupNode,
  groupOriginal: GroupNodeOriginal,
  numberInputNode: NumberInputNode,
  emailInputNode: EmailInputNode,
  websiteInputNode: WebsiteInputNode,
  phoneInputNode: PhoneInputNode,
  dateInputNode: DateInputNode,
  buttonInputNode: ButtonInputOriginalNode,
  linkButtonInputNode: LinkButtonInputNode,
  delayLogicNode: DelayLogicNode,
  redirectLogicNode: RedirectLogicNode,
  whatsappMessageLogicNode: WhatsappMessageLogicNode,
  pixelFacebookLogicNode: PixelFacebookLogicNode,
  webhookLogicNode: WebhookLogicNode
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
  const { openMenu, user } = useStateContext();
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

  console.log("nodes create", nodes);

  async function getFlowData() {
    try {
      const response = await api.get(`/flows/get-flow/${user.id}/${params.flowid}`,
        { headers: { authorization: token } });
      if (response.status === 200) {
        setNodes(response.data.nodes);
        setEdges(response.data.edges);
        setVariables(response.data.variables);
        setOriginalNodes(response.data.nodes);
        setOriginalEdges(response.data.edges);
        setOriginalVariables(response.data.variables);
        setProfileImage(response.data.config.profileImage);
        setTemplate(response.data.config.template);
        setProfileName(response.data.config.profileName);
        setOriginalProfileImage(response.data.config.profileImage);
        setOriginalTemplate(response.data.config.template);
        setOriginalProfileName(response.data.config.profileName);
      }
    } catch {
      toast.error('Erro ao buscar dados do flow.');
    }
  }

  async function saveFlowData() {

    const dateNodes = nodes.filter((node) => node.type === "dateInputNode");
    if (dateNodes.length > 0) {
      const hasEmptyValue = dateNodes.some((node) => node.data.value === "");
      if (hasEmptyValue) {
        toast.warning('Existem inputs do tipo "Data" sem uma agenda atribuída. Atribua uma agenda para cada um desses inputs.');
        return;
      }
    }

    const filteredNodes = nodes.filter((node) => node.type !== "dateInputNode");
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

    const whatsappMessageLogicNodes = nodes.filter((node) => node.type === "whatsappMessageLogicNode");
    if (whatsappMessageLogicNodes.length > 0) {
      const hasEmptyValue = whatsappMessageLogicNodes.some((node) => node.data.value === "");
      const hasEmptyMessage = whatsappMessageLogicNodes.some((node) => node.data.message === "");
      if (hasEmptyValue) {
        toast.warning('Existem nodes do tipo "Whatsapp msg" sem uma integração atribuída. Atribua uma integração Whatsapp a esses nodes.');
        return;
      } else if (hasEmptyMessage) {
        toast.warning('Existem nodes do tipo "Whatsapp msg" sem uma mensagem. Digite a mensagem que deve ser enviada.');
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
    if (Object.keys(user).length > 0) {
      getFlowData();
    }
  }, []);

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
          return;
        }
        // console.log("aqui")
        // const parentNodes = nodes.filter((node) => node.parentNode === groupNode.id);
        // const lastParentNode = parentNodes[parentNodes.length - 1];
        // const rowGap = 5
        // const initialGroupHeight = nodeStyle.height
        // let parentNodesHeight = parentNodes.reduce((totalHeight, node) => {
        //   return totalHeight + node.style.height;
        // }, 0);
        // const totalGroupHeight = ((initialGroupHeight + parentNodesHeight) + ((parentNodes.length + 1) * rowGap));

        // newSubnode.position = { x: 20, y: lastParentNode.position.y + (lastParentNode.style.height + rowGap) };
        newSubnode.parentNode = groupNode?.id;

        newSubnode.type = subType;

        let newNodesGroup = nodes.map((node) => {
          if (node.id === groupNode.id) {
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

  // const onNodeDragStop = useCallback(
  //   (_, node) => {
  //     if (node.type !== 'node' && !node.parentNode) {
  //       return;
  //     }

  //     const intersections = getIntersectingNodes(node).filter((n) => n.type === 'group');
  //     const groupNode = intersections[0];

  //     if (intersections.length && node.parentNode !== groupNode?.id) {
  //       const nextNodes = store
  //         .getState()
  //         .getNodes()
  //         .map((n) => {
  //           if (n.id === groupNode.id) {
  //             return {
  //               ...n,
  //               className: '',
  //             };
  //           } else if (n.id === node.id) {
  //             const position = getNodePositionInsideParent(n, groupNode) ?? { x: 0, y: 0 };

  //             return {
  //               ...n,
  //               position,
  //               parentNode: groupNode.id,
  //               dragging: false,
  //               extent: 'parent',
  //             };
  //           }

  //           return n;
  //         })
  //         .sort(sortNodes);

  //       setNodes(nextNodes);
  //     }
  //   },
  //   [getIntersectingNodes, setNodes, store]
  // );

  // const onNodeDrag = useCallback(
  //   (_, node) => {
  //     if (node.type !== 'node' && !node.parentNode) {
  //       return;
  //     }

  //     const intersections = getIntersectingNodes(node).filter((n) => n.type === 'group');
  //     const groupClassName = intersections.length && node.parentNode !== intersections[0]?.id ? 'active' : '';

  //     setNodes((nds) => {
  //       return nds.map((n) => {
  //         if (n.type === 'group') {
  //           return {
  //             ...n,
  //             className: groupClassName,
  //           };
  //         } else if (n.id === node.id) {
  //           return {
  //             ...n,
  //             position: node.position,
  //           };
  //         }

  //         return { ...n };
  //       });
  //     });
  //   },
  //   [getIntersectingNodes, setNodes]
  // );

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
        // onNodeDrag={onNodeDrag}
        // onNodeDragStop={onNodeDragStop}
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