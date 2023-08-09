import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.input`
  width: 100%;
  height: ${({selected}) => selected ? '80px' : '40px'};
  background-color: #fff;
  border: ${({selected}) => selected ? '2px solid #000' : '1px solid #000'};
  border-radius: 8px;
  color: #000;
  font-size: 12px;
  display: block;
`;

export const TopHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  left: -9px;
`;

export const BottomHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  right: -14px;
`;