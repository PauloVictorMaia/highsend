import { styled } from "styled-components";
import { Handle } from "reactflow";

export const Label = styled.input`
  font-size: 16px;
  border: none;
  width: 80%;
`;

export const LeftHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  left: -9px;
`;

export const RightHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  right: -9px;
`;