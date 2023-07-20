import { styled } from "styled-components";
import { Handle } from "reactflow";
import { NodeResizer } from '@reactflow/node-resizer';

export const NodeContainer = styled.div`
  min-width: 150px;
  min-height: 75px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 8px;
  color: #000;
  font-size: 12px;
`;

export const RightHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  right: -9px;
`;

export const TopHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  top: -9px;
`;

export const StyledNodeResizer = styled(NodeResizer)`
  min-width: 150px;
  min-height: 75px;
  visibility: ${({isVisible}) => isVisible ? 'visible' : 'hidden'};
`;