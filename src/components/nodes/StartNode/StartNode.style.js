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
  border: ${({selected}) => selected ? '2px solid rgba(153, 153, 255,0.5)' : '0.5px solid rgba(0,0,0,0.15)'};
  box-shadow: 0 5px 7px rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #000;
`;

export const RightHandle = styled(Handle)`
  width: 10px;
  height: 10px;
  background-color: rgba(153, 153, 255,1);
  right: -8px;
`;

export const Label = styled.span`
  font-size: 16px;
`;

export const StartDiv = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

export const FlagIcon = styled(FlagTwoToneIcon)`
  
`;