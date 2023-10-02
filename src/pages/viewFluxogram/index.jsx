import { useState, useEffect, useRef } from 'react';
import Text from './components/text/Text';
import Audio from './components/audio/Audio';
import Video from './components/video/Video';
import TextInput from './components/textInput/TextInput';
import jsonData from '../../data/flow.json';
import ButtonInput from './components/buttonInput/ButtonInput';
import { Container, Content, Avatar, AvatarContainer, Block } from './styles';
import AvatarImage from '../../assets/avatar.jpg';
import NumberInputNode from './components/numberInputNode/TextInput';
import EmailInputNode from './components/emailInputNode/TextInput';
import WebSiteInputNode from './components/webSiteInputNode/TextInput';
import PhoneInputNode from './components/phoneInputNode/TextInput';
import DateInputNode from './components/dateInputNode/TextInput';
import ImageNode from './components/imageNode/Video';
import EmbedNode from './components/embedNode/Video';
import { useParams } from 'react-router-dom';
import api from '../../api';
import DelayNode from './components/delay';
import Redirect from './components/redirect';
import LinkButton from './components/linkButton/ButtonInput';

function Chatbot() {
  const [nodes, setNodes] = useState();
  const [edges, setEdges] = useState();
  const [variables, setVariables] = useState();
  const [nodesExibition, setNodesExibition] = useState([]);
  const [indexNodesExibition, setIndexNodesExibition] = useState(-1);
  const [actualNodeDisplay, setActualNodeDisplay] = useState("start node");
  const [elementsHeight, setElementsHeight] = useState(0);
  const [avatarsStatic, setAvatarsStatic] = useState([]);
  const [leadID, setLeadID] = useState(null);
  const divRef = useRef(null);
  const notDisplayedAvatarNode = ['dateInputNode', 'buttonInputNode', 'textInputNode', 'numberInputNode', 'emailInputNode', 'websiteInputNode', 'phoneInputNode', 'delayLogicNode', 'redirectLogicNode', 'linkButtonInputNode'];
  const notPlusIndexNode = ['dateInputNode', 'textInputNode', 'numberInputNode', 'emailInputNode', 'websiteInputNode', 'phoneInputNode', 'delayLogicNode', 'videoNode'];
  const params = useParams();

  const smoothScrollToBottom = (element) => {
    const start = element.scrollTop;
    const end = element.scrollHeight - element.clientHeight;
    const change = end - start;
    const duration = 200;
    let startTime = null;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      element.scrollTop = start + change * easeInOutQuad(progress / duration);

      if (progress < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  async function getFlowData() {
    try {
      const response = await api.get(`/flows/get-flow/${params.userId}/${params.flowId}`);
      if (response.status === 200) {
        setNodes(response.data.nodes);
        setEdges(response.data.edges);
        setVariables(response.data.variables);
      }
    } catch {
      return;
    }
  }

  useEffect(() => {
    const currentDiv = divRef.current;
    smoothScrollToBottom(currentDiv);
  });

  useEffect(() => {
    getFlowData();
  }, []);

  useEffect(() => {
    exibitionNode();
  }, [actualNodeDisplay, nodes, edges, nodesExibition]);

  useEffect(() => {
    const alturaAtual = document.querySelectorAll('.contents');
    let totalHeight = 0;

    alturaAtual.forEach(element => {
      totalHeight += element.offsetHeight;
    });

    const actualNodeInScreen = nodesExibition[indexNodesExibition === -1 ? 0 : indexNodesExibition];

    if (checkDisplayedAvatar(actualNodeInScreen)) {
      setElementsHeight(totalHeight);
    } else {
      if (!avatarsStatic.includes(elementsHeight)) {
        setTimeout(() => {
          setAvatarsStatic([...avatarsStatic, elementsHeight]);
        }, 500);
      }
    }

    let intervalValue;
    intervalValue = notDisplayedAvatarNode.includes(nodesExibition[indexNodesExibition + 1]?.type) ? 1500 : 2000;
    if (indexNodesExibition === -1 || nodesExibition[indexNodesExibition + 1]?.type === "buttonInputNode") {
      intervalValue = 0;
    }

    const interval = setInterval(() => {
      if (
        indexNodesExibition < nodesExibition.length && !notPlusIndexNode.includes(actualNodeInScreen?.type)) {
        setIndexNodesExibition(indexNodesExibition + 1);
      }
    }, intervalValue);
    return () => clearTimeout(interval);

  }, [indexNodesExibition, nodesExibition]);

  const exibitionNode = () => {
    const timeOut = setTimeout(() => {
      const actualEdge = edges?.filter((edge) => edge.source === actualNodeDisplay);
      const nextNode = nodes?.filter((node) => node.id === actualEdge[0]?.target);
      if (nextNode?.length) {
        setActualNodeDisplay(nextNode[0].id);
        setNodesExibition([...nodesExibition, ...nextNode[0]?.data.blocks]);
      }
    }, 10);
    return () => clearTimeout(timeOut);
  }

  const checkDisplayedAvatar = (actualNodeInScreen) => {
    if (!notDisplayedAvatarNode.includes(actualNodeInScreen?.type) && ((!notDisplayedAvatarNode.includes(nodesExibition[indexNodesExibition - 1]?.type)) || (!notDisplayedAvatarNode.includes(nodesExibition[indexNodesExibition]?.type) && nodesExibition[indexNodesExibition]?.type !== undefined))) return true;
    return false;
  }

  const atualizationNodeDisplayed = (id, data) => {
    setActualNodeDisplay(id);
    let customVariable = [...variables];
    customVariable.map((variable) => {
      if (variable.id === data.variable) {
        variable.value = data.buttonLabel;
        variable.done = true;
      }
      return variable;
    })
    setVariables(customVariable);
    saveLeadVariables();
  }

  const atualizationInputDisplayed = (data, value) => {
    let customVariable = [...variables];
    customVariable.map((variable) => {
      if (variable.id === data.variable) {
        variable.value = value;
      }
      return variable;
    })
    setVariables(customVariable);
  }

  const sendVariableValue = (data) => {
    setIndexNodesExibition(indexNodesExibition + 1);
    if (data) {
      let customVariable = [...variables];
      customVariable.map((variable) => {
        if (variable.id === data.variable) {
          variable.done = true;
        }
        return variable;
      })
      setVariables(customVariable);
    }
    saveLeadVariables();
  }

  const saveLeadVariables = async () => {
    if (leadID) {
      try {
        await api.post(`/leads/edit-lead/${params.flowId}/${leadID}`, { variables });
      } catch {
        return;
      }
    } else {
      const response = await api.post(`/leads/save-lead/${params.flowId}`, { variables });
      if (response.status === 200) {
        setLeadID(response.data.id);
      }
    }
  }

  const renderNode = (node) => {
    switch (node.type) {
      case 'textNode':
        return <Text data={node.data} variables={variables} />;
      case 'audioNode':
        return <Audio data={node.data} />;
      case 'videoNode':
        return <Video data={node.data} onSend={() => sendVariableValue()} />;
      case 'imageNode':
        return <ImageNode data={node.data} />;
      case 'embedNode':
        return <EmbedNode data={node.data} />;
      case 'textInputNode':
        return <TextInput data={node.data} onChange={(e) => atualizationInputDisplayed(node.data, e.target.value)} onSend={() => sendVariableValue(node.data)} variables={variables} />;
      case 'numberInputNode':
        return <NumberInputNode data={node.data} onChange={(e) => atualizationInputDisplayed(node.data, e.target.value)} onSend={() => sendVariableValue(node.data)} variables={variables} />;
      case 'emailInputNode':
        return <EmailInputNode data={node.data} onChange={(e) => atualizationInputDisplayed(node.data, e.target.value)} onSend={() => sendVariableValue(node.data)} variables={variables} />;
      case 'websiteInputNode':
        return <WebSiteInputNode data={node.data} onChange={(e) => atualizationInputDisplayed(node.data, e.target.value)} onSend={() => sendVariableValue(node.data)} variables={variables} />;
      case 'phoneInputNode':
        return <PhoneInputNode data={node.data} onChange={(e) => atualizationInputDisplayed(node.data, e.target.value)} onSend={() => sendVariableValue(node.data)} variables={variables} />;
      case 'buttonInputNode':
        return <ButtonInput data={node.data} onSend={() => atualizationNodeDisplayed(node.id, node.data)} variables={variables} />;
      case 'dateInputNode':
        return <DateInputNode data={node.data} onSend={() => sendVariableValue()} />;
      case 'delayLogicNode':
        return <DelayNode data={node.data} onSend={() => sendVariableValue()} />;
      case 'redirectLogicNode':
        return <Redirect data={node.data} />;
      case 'linkButtonInputNode':
        return <LinkButton data={node.data} />;
      default:
        return null;
    }
  };

  return (
    <Block>
      <Container ref={divRef}>
        <AvatarContainer>
          {indexNodesExibition >= 0 &&
            <Avatar img={AvatarImage} height={elementsHeight}></Avatar>
          }
          {avatarsStatic.length > 0 &&
            avatarsStatic.map((height, index) => (
              <Avatar key={index} img={AvatarImage} height={height}></Avatar>
            ))
          }
        </AvatarContainer>
        <Content style={{ display: 'flex', flexDirection: 'column' }}>
          {nodesExibition.map((node, index) => (
            <div className='contents' key={index}>
              {index <= indexNodesExibition &&
                renderNode(node)
              }
            </div>
          ))}
        </Content>
      </Container>
      <span>Feito com Hiflow!</span>
    </Block>
  );
}

export default Chatbot;