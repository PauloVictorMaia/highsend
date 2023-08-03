import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.div`
  min-width: 210px;
  max-width: 210px;
  min-height: 75px;
  width: 100%;
  height: 100%;
  display: Flex;
  flex-direction: column;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: ${({selected}) => selected ? '2px solid #000' : '1px solid #000'};
  border-radius: 8px;
  color: #000;
  font-size: 12px;
  
  > input {
    margin-bottom: 10px;
  }
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

export const AddLink = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 30px;
  background-color: #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-bottom: 10px; 
`;

export const LinkInput = styled.input`
  visibility: ${({isvisible}) => isvisible === "true" ? "visible" : "hidden"};
  position: absolute;
  width: 350px;
  left: -360px;
  top: 30px;
`;