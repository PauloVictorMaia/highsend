import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: ${({selected}) => selected ? '1px solid rgba(0,0,0,0.9)' : '0.5px solid rgba(0,0,0,0.15)'};
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #000;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10px;
`;

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
  top: 10px;
`;

export const RightHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  right: -9px;
`;