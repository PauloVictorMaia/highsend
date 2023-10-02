import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: ${({selected}) => selected ? '2px solid rgba(153, 153, 255,0.5)' : '0.5px solid rgba(0,0,0,0.15)'};
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #333;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10px;
`;

export const Label = styled.input`
  font-size: 16px;
  border: none;
  width: 80%;
  outline: none;
  border-radius: 3px;
  padding: 5px;
  box-sizing: border-box;
  font-weight: 600;
  color: #444;

  &:focus {
    border: 1px solid rgba(153, 153, 255,1);
  }
`;

export const LeftHandle = styled(Handle)`
  width: 10px;
  height: 10px;
  background-color: rgba(153, 153, 255,1);
 
  left: -9px;
  top: 10px;
`;

export const RightHandle = styled(Handle)`
  width: 10px;
  height: 10px;
  background-color: rgba(153, 153, 255,1);
  right: -9px;
`;