import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.input`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #000;
  outline: none;
  border-radius: 8px;
  color: #000;
  font-size: 12px;
  display: block;
  padding: 0;
  box-sizing: border-box;
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