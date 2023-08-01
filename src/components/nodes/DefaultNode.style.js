import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.div`
  display: Flex;
  flex-direction: column;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: ${({selected}) => selected ? '2px solid #000' : '1px solid #000'};
  border-radius: 8px;
  color: #000;
  font-size: 12px;
`;

export const TopHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  top: -9px;
`;

export const BottomHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  bottom: -9px;
`;

export const Label = styled.input`
  font-size: 16px;
  border: none;
  width: 80%;
`;