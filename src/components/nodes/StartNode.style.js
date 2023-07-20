import { styled } from "styled-components";
import { Handle } from "reactflow";
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';


export const NodeContainer = styled.div`
  min-width: 150px;
  min-height: 75px;
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 8px;
  color: #000;
`;

export const BottomHandle = styled(Handle)`
  width: 7px;
  height: 7px;
  background-color: transparent;
  border: .400px solid #000;
  bottom: -9px;
`;

export const Label = styled.span`
  font-size: 16px;
`;

export const StartDiv = styled.div`
  width: 100%;
  height: 30px;
  background-color: #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

export const FlagIcon = styled(FlagTwoToneIcon)`
  
`;