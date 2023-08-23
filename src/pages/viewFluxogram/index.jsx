import { useState, useEffect } from 'react';
import Text from './components/text/Text';
import Audio from './components/audio/Audio';
import Video from './components/video/Video';
import TextInput from './components/textInput/TextInput';
import jsonData from '../../data/flow.json';
import ButtonInput from './components/buttonInput/ButtonInput';

function Chatbot() {
  const [nodes, setNodes] = useState();
  const [edges, setEdges] = useState();
  const [variables, setVariables] = useState();
  const [nodesExibition, setNodesExibition] = useState([]);
  const [indexNodesExibition, setIndexNodesExibition] = useState(-1);
  const [actualNodeDisplay, setActualNodeDisplay] = useState("start node");

  useEffect(() => {
    setNodes(jsonData.nodes);
    setEdges(jsonData.edges);
    setVariables(jsonData.variables);
  }, []);

  useEffect(() => {
    exibitionNode();
  }, [actualNodeDisplay, nodes, edges, nodesExibition]);

  useEffect(() => {
      const actualNodeInScreen = nodesExibition[indexNodesExibition === -1? 0 : indexNodesExibition];

      const interval = setInterval(() => {
        if(indexNodesExibition < nodesExibition.length && actualNodeInScreen.type !== 'textInputNode'){
          setIndexNodesExibition(indexNodesExibition + 1)
        }
      }, 2000);
    return () => clearTimeout(interval);

  }, [indexNodesExibition, nodesExibition]);

  const exibitionNode = () => {
    const timeOut = setTimeout(() => {
      const actualEdge = edges.filter((edge) => edge.source === actualNodeDisplay);
      const nextNode = nodes.filter((node) => node.id === actualEdge[0].target);
      setActualNodeDisplay(nextNode[0].id);
      setNodesExibition([...nodesExibition, ...nextNode[0].data.blocks]);
    }, 10);
    return () => clearTimeout(timeOut);
  }

  const atualizationNodeDisplayed = (id) => {
    setTimeout(() => {
      setActualNodeDisplay(id);
    }, 2000);
  }

  const atualizationInputDisplayed = (data, value) => {
    console.log(value)
    let customVariable = [...variables];
    customVariable.map((variable) => {
      if (variable.id === data.variable){
        variable.value = value;
      }
      return variable;
    })
  }

  const sendVariableValue = () => {
    setTimeout(() => {
      setIndexNodesExibition(indexNodesExibition + 1)
    }, 2000);
  }

  const renderNode = (node) => {
    switch (node.type) {
      case 'textNode':
        return <Text data={node.data} />;
      case 'audioNode':
        return <Audio data={node.data} />;
      case 'videoNode':
        return <Video data={node.data} />;
      case 'textInputNode':
        return <TextInput data={node.data} onChange={(e) => atualizationInputDisplayed(node.data, e.target.value)} onSend={() => sendVariableValue()} variables={variables} />;
      case 'buttonInputNode':
        return <ButtonInput data={node.data} onSend={() => atualizationNodeDisplayed(node.id)} variables={variables} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {nodesExibition.map((node, index) => (
        <div key={index}>
          {index <= indexNodesExibition &&
            renderNode(node)
          }
        </div>
      ))}
    </div>
  );
}

export default Chatbot;