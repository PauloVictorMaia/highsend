/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NodeContainer, NodePreview, InputContainer, Inputs, LinkInput, SwitchContainer, MethodInput, ConfigContainer, ConfigLabel, ConfigButtonContainer, EditConfigContainer, EditConfigInputs, CloseButton, CustomToolbar } from "./WebhookLogicNode.style";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WebhookIcon from '@mui/icons-material/Webhook';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClearIcon from '@mui/icons-material/Clear';

function WebhookLogicNode({ data, id, groupID }) {

  const { setNodes } = useReactFlow();
  const [url, setUrl] = useState(data.url || "");
  const [advancedConfiguration, setAdvancedConfiguration] = useState(data.advancedConfiguration || false);
  // const [executeOnClient, setExecuteOnClient] = useState(data.executeOnClient || false);
  const [method, setMethod] = useState(data.method || "POST");
  const [queryParams, setQueryParams] = useState(data.queryParams || []);
  const [isQueryParams, setIsQueryParams] = useState(false);
  const [headers, setHeaders] = useState(data.headers || []);
  const [isHeaders, setIsHeaders] = useState(false);
  const [isCustomBody, setIsCustomBody] = useState();
  const [hasCustomBody, setHasCustomBody] = useState(data.hasCustomBody || false);
  const [customBody, setCustomBody] = useState(data.customBody || "");
  const [isVisible, setIsVisible] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px"
  }



  // useEffect(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === id) {
  //         const groupID = node.parentNode
  //         const parentNodes = nds.filter((node) => node.parentNode === groupID)
  //         node.data.url = url
  //         node.data.advancedConfiguration = advancedConfiguration
  //         // node.data.executeOnClient = executeOnClient
  //         node.data.method = method
  //         node.data.queryParams = queryParams
  //         node.data.headers = headers
  //         node.data.hasCustomBody = hasCustomBody
  //         if (hasCustomBody) {
  //           node.data.customBody = customBody
  //         }
  //         setNodes((nds) =>
  //           nds.map((node) => {
  //             if (node.id === groupID) {
  //               node.data.blocks = [...parentNodes]
  //             }
  //             return node;
  //           })
  //         )
  //       }

  //       return node;
  //     })
  //   );
  // }, [url, advancedConfiguration, method, queryParams, headers, hasCustomBody, customBody]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === groupID) {
          node.data.blocks.map((nodeOnBlock) => {
            if (nodeOnBlock.id === id) {
              nodeOnBlock.data.url = url
              nodeOnBlock.data.advancedConfiguration = advancedConfiguration
              nodeOnBlock.data.method = method
              nodeOnBlock.data.queryParams = queryParams
              nodeOnBlock.data.headers = headers
              nodeOnBlock.data.hasCustomBody = hasCustomBody
              if (hasCustomBody) {
                nodeOnBlock.data.customBody = customBody
              }
            }
            return nodeOnBlock;
          })
        }
        return node;
      })
    );
  }, [url, advancedConfiguration, method, queryParams, headers, hasCustomBody, customBody]);



  const deleteNode = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === groupID) {
          const deletedBlock = node.data.blocks.find(block => block.id === id);
          const deletedBlockHeight = deletedBlock.style.height;
          const updatedBlocks = node.data.blocks.filter((block) => block.id !== id);
          if (updatedBlocks.length === 0) {
            return null;
          }
          return {
            ...node,
            data: {
              ...node.data,
              blocks: updatedBlocks,
            },
            style: {
              width: 250,
              height: node.style.height - deletedBlockHeight - 10,
              padding: '0px',
              borderRadius: '8px',
              border: "none"
            }
          };
        }
        return node;
      }).filter(Boolean);
    });
  };

  function handleQueryParams(id, inputType, value) {

    const updatedParams = queryParams.map((param) => {
      if (param.id === id) {

        if (inputType === "key") {
          return { ...param, key: value };
        }

        if (inputType === "value") {
          return { ...param, value: value };
        }
      }

      return param;
    });

    setQueryParams(updatedParams);
  }

  function handleHeaders(id, inputType, value) {
    const updatedHeaders = headers.map((param) => {
      if (param.id === id) {

        if (inputType === "key") {
          return { ...param, key: value };
        }

        if (inputType === "value") {
          return { ...param, value: value };
        }
      }

      return param;
    });

    setHeaders(updatedHeaders);
  }

  function addNewConfig(arrayType) {
    const newConfig = {
      id: uuidv4(),
      key: "",
      value: ""
    }

    if (arrayType === "query") {
      setQueryParams((params) => [...params, newConfig]);
    }

    if (arrayType === "headers") {
      setHeaders((headers) => [...headers, newConfig]);
    }

  }

  const handleJsonChange = (newData) => {
    setCustomBody(newData);
  };

  return (
    <NodeContainer
      onClick={() => setIsVisible(!isVisible)}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <CustomToolbar
        isvisible={isVisible}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', fontSize: 'large' }} onClick={() => deleteNode()} />
      </CustomToolbar>

      <NodePreview>
        <WebhookIcon />
        <span>Click para configurar...</span>
      </NodePreview>

      <InputContainer isvisible={isVisible} onClick={(e) => e.stopPropagation()}>

        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false)
          }
          }>
          <ClearIcon />
        </CloseButton>

        <Inputs>

          <LinkInput
            type="text"
            placeholder="Cole aqui a URL base"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <SwitchContainer>
            <span>Configuração avançada</span>
            <Switch
              size="small"
              defaultChecked={advancedConfiguration}
              onChange={() => setAdvancedConfiguration(!advancedConfiguration)}
            />
          </SwitchContainer>
          {
            advancedConfiguration &&
            <>
              {/* <SwitchContainer>
                <span>Executar no client</span>
                <Switch
                  size="small"
                  defaultChecked={executeOnClient}
                  onChange={() => setExecuteOnClient(!executeOnClient)}
                />
              </SwitchContainer> */}

              <MethodInput>
                <span>Method</span>
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="POST">POST</option>
                  <option value="GET">GET</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                  <option value="HEAD">HEAD</option>
                  <option value="CONNECT">CONNECT</option>
                  <option value="OPTIONS">OPTIONS</option>
                  <option value="TRACE">TRACE</option>
                </select>
              </MethodInput>

              <ConfigContainer>
                <ConfigLabel onClick={() => setIsQueryParams(!isQueryParams)}>
                  <span>Query params</span>
                  {isQueryParams ?
                    <KeyboardArrowUpIcon />
                    :
                    <KeyboardArrowDownIcon />
                  }
                </ConfigLabel>

                {
                  isQueryParams &&
                  <>
                    {
                      queryParams && queryParams.length > 0 &&
                      queryParams.map((param) => (
                        <EditConfigContainer key={param.id}>
                          <EditConfigInputs>
                            <span>Key</span>
                            <input
                              type="text"
                              value={param.key}
                              onChange={(e) => handleQueryParams(param.id, "key", e.target.value)}
                            />
                            <span>Value</span>
                            <input
                              type="text"
                              value={param.value}
                              onChange={(e) => handleQueryParams(param.id, "value", e.target.value)}
                            />
                          </EditConfigInputs>
                        </EditConfigContainer>
                      ))
                    }
                    <ConfigButtonContainer>
                      <button onClick={() => addNewConfig("query")}>Adicionar</button>
                    </ConfigButtonContainer>
                  </>
                }
              </ConfigContainer>

              <ConfigContainer>
                <ConfigLabel onClick={() => setIsHeaders(!isHeaders)}>
                  <span>Headers</span>
                  {isHeaders ?
                    <KeyboardArrowUpIcon />
                    :
                    <KeyboardArrowDownIcon />
                  }
                </ConfigLabel>

                {
                  isHeaders &&
                  <>
                    {
                      headers && headers.length > 0 &&
                      headers.map((headers) => (
                        <EditConfigContainer key={headers.id}>
                          <EditConfigInputs>
                            <span>Key</span>
                            <input
                              type="text"
                              value={headers.key}
                              onChange={(e) => handleHeaders(headers.id, "key", e.target.value)}
                            />
                            <span>Value</span>
                            <input
                              type="text"
                              value={headers.value}
                              onChange={(e) => handleHeaders(headers.id, "value", e.target.value)}
                            />
                          </EditConfigInputs>
                        </EditConfigContainer>
                      ))
                    }
                    <ConfigButtonContainer>
                      <button onClick={() => addNewConfig("headers")}>Adicionar</button>
                    </ConfigButtonContainer>
                  </>
                }
              </ConfigContainer>

              <ConfigContainer>
                <ConfigLabel onClick={() => setIsCustomBody(!isCustomBody)}>
                  <span>Body</span>
                  {isCustomBody ?
                    <KeyboardArrowUpIcon />
                    :
                    <KeyboardArrowDownIcon />
                  }
                </ConfigLabel>

                {
                  isCustomBody &&
                  <>
                    <SwitchContainer>
                      <span>Editar body</span>
                      <Switch
                        size="small"
                        defaultChecked={hasCustomBody}
                        onChange={() => setHasCustomBody(!hasCustomBody)}
                      />
                    </SwitchContainer>

                    {
                      hasCustomBody &&
                      <AceEditor
                        mode="json"
                        theme="monokai"
                        value={customBody}
                        onChange={handleJsonChange}
                        name="json-editor"
                        editorProps={{
                          $blockScrolling: true,
                        }}
                        fontSize={14}
                        width="100%"
                        height="250px"
                        tabSize={4}
                        style={{
                          border: "0.5px solid rgba(0,0,0,0.15)",
                          borderRadius: "5px",
                        }}
                      />
                    }
                  </>
                }
              </ConfigContainer>
            </>
          }

        </Inputs>
      </InputContainer>

    </NodeContainer>
  )
}

export default WebhookLogicNode;